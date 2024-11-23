import { axios } from "@/providers";
import { PatchEventRequest, PatchEventResponse } from "@/types";

export async function updateEvent(
  eventId: string,
  eventData: PatchEventRequest
) {
  return axios
    .patch<PatchEventResponse>(`events/${eventId}`, { ...eventData })
    .then((res) => {
      return res.data;
    });
}
