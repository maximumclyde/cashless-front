import { axios } from "@/providers";
import { DeleteClientResponse } from "@/types";

export async function deleteClient(clientId: string) {
  return axios
    .delete<DeleteClientResponse>(`/clients/${clientId}`)
    .then((r) => r.data);
}
