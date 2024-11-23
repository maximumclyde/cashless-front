import { axios } from "@/providers";
import { CreateStandRequest, CreateStandResponse } from "@/types";

export async function postStand(eventId: string, body: CreateStandRequest) {
  return axios
    .post<CreateStandResponse>(`/events/${eventId}/stands`, body)
    .then((r) => r.data);
}
