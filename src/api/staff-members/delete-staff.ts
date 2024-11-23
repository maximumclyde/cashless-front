import { axios } from "@/providers";
import { DeleteMemberResponse } from "@/types";

export async function deleteStaff(memberId: string) {
  return axios
    .delete<DeleteMemberResponse>(`/staffMembers/${memberId}`)
    .then((r) => r.data);
}
