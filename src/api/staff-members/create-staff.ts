import { axios } from "@/providers";
import { CreateStaffRequest, CreateMemberResponse } from "@/types";

export async function createStaff(body: CreateStaffRequest) {
  return axios
    .post<CreateMemberResponse>("/staffMembers", body)
    .then((r) => r.data);
}
