import { AdminSlice } from "./adminSlice";
import { TokenSlice } from "./tokenSlice";

export type Store = AdminSlice & TokenSlice;

export { adminSlice } from "./adminSlice";
export { tokenSlice } from "./tokenSlice";
