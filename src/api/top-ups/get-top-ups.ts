import { axios } from "@/providers";
import { GetTopUpsQuery, GetTopUpsResponse } from "@/types";

export async function getTopUps(params: GetTopUpsQuery) {
  return axios
    .get<GetTopUpsResponse>("/topUps", {
      params,
    })
    .then((r) => r.data);
}
