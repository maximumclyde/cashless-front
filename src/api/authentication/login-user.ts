import { axios } from "@/providers";
import { LoginMemberResponse, MemberLoginRequest, StaffMember } from "@/types";
import useStore from "@/store";

type AdminType = StaffMember & { userClass: 0 };
type AdminLoginResponse = LoginMemberResponse & { member: AdminType };

export async function loginUser(loginData: MemberLoginRequest) {
  return axios
    .post<AdminLoginResponse>("/staffMembers/login", loginData)
    .then((res) => {
      const { member, token } = res.data;

      useStore.setState({
        admin: member,
        token,
      });
    });
}
