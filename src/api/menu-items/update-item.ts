import { axios } from "@/providers";
import { PatchItemRequest, PatchItemsResponse } from "@/types";

export async function patchItem(
  eventId: string,
  itemName: string,
  updateBody: PatchItemRequest
) {
  return axios
    .patch<PatchItemsResponse>(`/events/${eventId}/items`, updateBody, {
      params: {
        itemName,
      },
    })
    .then((r) => r.data);
}
