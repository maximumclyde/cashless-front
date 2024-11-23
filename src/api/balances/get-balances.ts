import { axios } from "@/providers";
import { GetBalancesResponse, GetBalancesQuery } from "@/types";

export async function getBalances(params: GetBalancesQuery) {
  return axios
    .get<GetBalancesResponse>("/balances", {
      params,
    })
    .then((r) => r.data);
}
