import { axios } from "@providers";
import useStore from "@store";
import { router } from "@providers";
import { LoginMemberResponse, MemberLoginRequest, StaffMember } from "@types";

type AdminType = StaffMember & { userClass: 0 };
type AdminLoginResponse = LoginMemberResponse & { member: AdminType };

export async function loginUser(loginData: MemberLoginRequest) {
  return axios
    .post<AdminLoginResponse>("/staffMembers/login", loginData)
    .then((res) => {
      const { member, token } = res.data;

      useStore.getState().setAdmin(member);
      useStore.getState().setToken(token);

      router.navigate("/events");
    });
}
