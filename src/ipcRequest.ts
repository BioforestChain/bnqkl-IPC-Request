import { constants, debug } from "./constants.ts";
import {
  RegisterResFactory,
  ReqAsyncFactory,
  ReqFactory,
} from "./RequestFactory.ts";

export const REQ_CB_REGISTER_WM = new WeakMap();

export const ipcReq = ReqFactory();
export const ipcReqAsync = ReqAsyncFactory(ipcReq);
export const registerIpcRes = RegisterResFactory();
