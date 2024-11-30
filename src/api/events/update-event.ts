import { axios } from "@/providers";
import { PatchEventRequest, PatchEventResponse } from "@/types";

interface EventData extends PatchEventRequest {
  eventId: string;
}

export async function patchEvent(eventData: EventData) {
  return axios
    .patch<PatchEventResponse>(`/events/${eventData.eventId}`, { ...eventData })
    .then((res) => {
      return res.data;
    });
}
