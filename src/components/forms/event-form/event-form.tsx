import { useState, useRef, useMemo } from "react";
import { EventType, CurrencyType } from "@/types";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { EventModalGeneralInfo } from "@/components/forms/event-form/event-modal-info";
import { EventCurrenciesInfo } from "@/components/forms/event-form/event-currencies-info";
import { TabNavigationComponent } from "@/components/forms/event-form/event-form-tabs";
import { useMutationQuery } from "@/hooks";
import { v4 as uuid } from "uuid";
import { patchEvent, postCurrencies, postEvent } from "@/api";

const emptyEvent: Partial<EventType> = {
  cardPrice: undefined,
  company: undefined,
  eventDescription: undefined,
  eventId: undefined,
  eventName: undefined,
  eventStatus: "inactive",
  startDate: undefined,
  tagPrice: undefined,
  ticketPrice: undefined,
};

const formSteps = {
  info: EventModalGeneralInfo,
  currencies: EventCurrenciesInfo,
};

const emptyCurrency: CurrencyType = {
  rate: 0,
  eventId: "",
  currency: "",
  marketRate: 0,
  company: "",
  currencyId: "",
  quickPrices: [0, 0, 0, 0],
  isDefault: false,
};

interface EventFormProps {
  open: boolean;
  onCancel: () => void;
  event?: EventType;
  currencies?: CurrencyType[];
}

type InfoRefHandle = {
  trigger: () => void;
  isValid: () => boolean;
  getEvent: () => Partial<EventType>;
  getCurrencies: () => CurrencyType[];
};

export function EventForm(props: EventFormProps) {
  const [step, setStep] = useState<keyof typeof formSteps>("info");
  const [event, setEvent] = useState(props.event || emptyEvent);
  const [currencies, setCurrencies] = useState(
    props.currencies || [emptyCurrency]
  );

  const stepRef = useRef<InfoRefHandle>(null);

  const eventId = useMemo(() => {
    return props.event?.eventId || uuid();
  }, [props.event?.eventId]);

  const { mutate: createMutation } = useMutationQuery({
    queryKeys: ["events", eventId],
    mutationFn: postEvent,
    onSuccess() {
      props.onCancel();
    },
    errorToastOptions: {
      title: "Error creating event",
      description:
        "Something went wrong while trying to create the event, please try again later",
    },
  });
  const { mutate: editMutation } = useMutationQuery({
    queryKeys: ["events", eventId],
    mutationFn: patchEvent,
    onSuccess() {
      props.onCancel();
    },
    errorToastOptions: {
      title: "Error editing event",
      description:
        "Something went wrong while editing the event, please try again later",
    },
  });
  const { mutate: currenciesMutation } = useMutationQuery({
    queryKeys: ["currencies", eventId],
    mutationFn: postCurrencies,
    errorToastOptions: {
      title: "Error saving event currencies",
      description: "Something went wrong while trying to save currencies",
    },
  });

  const FormStep = formSteps[step];

  function changeEventData() {
    if (stepRef.current && typeof stepRef.current.getEvent === "function") {
      const newEventValues = stepRef.current.getEvent();
      setEvent((prev) => ({
        ...prev,
        ...newEventValues,
      }));
    }
  }

  function changeCurrenciesData() {
    if (
      stepRef.current &&
      typeof stepRef.current.getCurrencies === "function"
    ) {
      const newCurrencies = stepRef.current.getCurrencies();
      setCurrencies(newCurrencies);
    }
  }

  function validateStep(): boolean {
    if (!stepRef.current) {
      return false;
    }

    const stepValid = stepRef.current.isValid();
    stepRef.current.trigger();

    return stepValid;
  }

  function onSubmit() {
    if (!validateStep()) {
      return;
    }

    if (step === "info") {
      changeEventData();
      setStep("currencies");
    } else {
      changeCurrenciesData();
      const normalizedEvent = { ...event };

      normalizedEvent.eventId = eventId;
      normalizedEvent.eventName = event.eventName!;
      normalizedEvent.cardPrice = Number(event.cardPrice);
      normalizedEvent.ticketPrice = Number(event.ticketPrice);
      normalizedEvent.tagPrice = Number(event.tagPrice);

      const normalizedCurrencies: CurrencyType[] = [];
      for (let index = 0; index < currencies.length; index++) {
        const currency = currencies[index];
        normalizedCurrencies.push({
          company: event.company || "",
          currency: currency.currency,
          currencyId: "",
          eventId,
          isDefault: !index,
          marketRate: Number(currency.marketRate),
          quickPrices: currency.quickPrices
            .map((e) => Number(e))
            .filter(Boolean),
          rate: Number(currency.rate),
        });
      }

      if (props.event?.eventId) {
        createMutation(normalizedEvent as EventType);
      } else {
        editMutation(normalizedEvent as EventType);
      }

      currenciesMutation({
        currencies: normalizedCurrencies,
        eventId,
      });
    }
  }

  function closeDialog() {
    setStep("info");
    props.onCancel();
  }

  return (
    <Dialog open={props.open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.event ? "Edit" : "Crete"} event form</DialogTitle>
        </DialogHeader>
        <TabNavigationComponent
          value={step}
          tabList={[
            {
              value: "info",
              children: "Event Information",
              onClick() {
                if (step === "info") return;

                if (validateStep()) {
                  changeCurrenciesData();
                  setStep("info");
                }
              },
            },
            {
              value: "currencies",
              children: "Event Currencies",
              onClick() {
                if (step === "currencies") return;

                if (validateStep()) {
                  changeEventData();
                  setStep("currencies");
                }
              },
            },
          ]}
        />
        <FormStep
          event={event}
          currencies={currencies}
          onSubmit={onSubmit}
          ref={stepRef}
        />
      </DialogContent>
    </Dialog>
  );
}
