import { axios } from "@/providers";
import { GetStandsResponse } from "@/types";

export async function getStands(eventId: string) {
  return axios
    .get<GetStandsResponse>(`/events/${eventId}/stands`)
    .then((r) => r.data);
}
