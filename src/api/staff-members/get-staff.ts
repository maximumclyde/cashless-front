import { axios } from "@/providers";
import { GetStaffResponse } from "@/types";

export async function getStaff(eventId: string, memberId?: string) {
  return axios.get<GetStaffResponse>(
    memberId ? `/staffMembers/${memberId}` : "/staffMembers",
    {
      params: {
        eventId,
      },
    }
  );
}
