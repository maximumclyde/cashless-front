import { axios } from "@/providers";
import { CreateEventRequest, CreateEventResponse } from "@/types";

export async function createEvent(eventData: CreateEventRequest) {
  return axios
    .post<CreateEventResponse>("events", { ...eventData })
    .then((res) => {
      const { eventId } = res.data;

      return {
        ...eventData,
        eventId,
      };
    });
}
