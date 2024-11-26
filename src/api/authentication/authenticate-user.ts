import { axios } from "@providers";
import { GetMemberResponse } from "@types";
import useStore from "@store";

type AdminType = GetMemberResponse & { userClass: 0 };

export async function authenticateUser() {
  return axios.post<AdminType>("/staffMembers/profile").then((res) => {
    const admin = res.data;
    useStore.getState().setAdmin(admin);
  });
}
