import { axios } from "@/providers";
import { PatchClientRequest, PatchClientResponse } from "@/types";

export async function patchClient(
  clientId: string,
  updateBody: PatchClientRequest
) {
  return axios
    .patch<PatchClientResponse>(`/clients/${clientId}`, updateBody)
    .then((r) => r.data);
}
