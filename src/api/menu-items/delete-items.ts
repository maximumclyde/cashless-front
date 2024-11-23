import { axios } from "@/providers";
import { DeleteItemResponse } from "@/types";

/**
 * Add the item name for a single item delete
 */
export async function deleteItems(eventId: string, itemName?: string) {
  return axios
    .delete<DeleteItemResponse>(`/events/${eventId}/items`, {
      params: {
        itemName,
      },
    })
    .then((r) => r.data);
}
