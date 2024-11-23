import { axios } from "@/providers";
import { DeleteStandResponse } from "@/types";

export async function deleteStand(eventId: string, standName: string) {
  return axios
    .delete<DeleteStandResponse>(`/events/${eventId}/stands`, {
      params: {
        standName,
      },
    })
    .then((r) => r.data);
}
