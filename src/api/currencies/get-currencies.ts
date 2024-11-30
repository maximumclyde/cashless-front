import { axios } from "@/providers";
import { GetCurrenciesResponse } from "@/types";

interface GetCurrenciesParam {
  eventId: string;
}

export async function getCurrencies(params: GetCurrenciesParam) {
  return axios
    .get<GetCurrenciesResponse>(`/events/${params.eventId}/currencies`)
    .then((res) => res.data);
}
