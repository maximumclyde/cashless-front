import { axios } from "@/providers";
import { GetItemsResponse } from "@/types";

export async function getItems(eventId: string) {
  return axios
    .get<GetItemsResponse>(`/events/${eventId}/items`)
    .then((r) => r.data);
}
