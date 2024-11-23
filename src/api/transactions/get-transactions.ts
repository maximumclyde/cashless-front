import { axios } from "@/providers";
import { GetTransactionsQuery, GetTransactionsResponse } from "@/types";

export async function getTransactions(params: GetTransactionsQuery) {
  return axios
    .get<GetTransactionsResponse>("/transactions", { params })
    .then((r) => r.data);
}
