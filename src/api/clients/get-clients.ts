import { axios } from "@/providers";
import { GetClientQuery, GetClientResponse } from "@/types";

export async function getClients(params = {} as GetClientQuery) {
  return axios
    .get<GetClientResponse>("/clients", {
      params,
    })
    .then((r) => r.data);
}
