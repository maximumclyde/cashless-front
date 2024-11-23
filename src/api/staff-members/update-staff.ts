import { axios } from "@/providers";
import { PatchStaffRequest, PatchMemberResponse } from "@/types";

export async function patchStaff(memberId: string, body: PatchStaffRequest) {
  return axios
    .patch<PatchMemberResponse>(`/staffMembers/${memberId}}`, body)
    .then((r) => r.data);
}
