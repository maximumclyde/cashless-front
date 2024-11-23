import { axios } from "@/providers";
import { GetAllEventsResponse } from "@/types";

export async function getEvents() {
  return axios.get<GetAllEventsResponse>("events").then((r) => {
    return r.data;
  });
}
