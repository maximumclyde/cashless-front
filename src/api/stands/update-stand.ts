import { axios } from "@/providers";
import { PatchStandRequest, PatchStandResponse } from "@/types";

export async function patchStand(
  eventId: string,
  standName: string,
  updateBody: PatchStandRequest
) {
  return axios
    .patch<PatchStandResponse>(`/events/${eventId}/stands`, updateBody, {
      params: { standName },
    })
    .then((r) => r.data);
}
