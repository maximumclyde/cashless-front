import { axios } from "@/providers";
import { PostItemsRequest, PostItemsResponse } from "@/types";

export async function postItems(eventId: string, items: PostItemsRequest) {
  return axios
    .post<PostItemsResponse>(`/events/${eventId}/items`, items)
    .then((r) => r.data);
}
