import { axios } from "@/providers";
import { DeleteEventResponse } from "@/types";

export async function deleteEvent(eventId: string) {
  return axios
    .delete<DeleteEventResponse>(`/events/${eventId}`)
    .then((res) => res.data);
}
