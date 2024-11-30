import { axios } from "@/providers";
import { CreateCurrencyRequest, CreateCurrenciesResponse } from "@/types";

type PostCurrenciesParam = {
  eventId: string;
  currencies: CreateCurrencyRequest;
};

export async function postCurrencies(param: PostCurrenciesParam) {
  return axios
    .post<CreateCurrenciesResponse>(
      `/events/${param.eventId}/currencies`,
      param.currencies
    )
    .then((res) => res.data);
}
