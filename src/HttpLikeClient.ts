import { EventEmitter } from "node:events";
import { ipcReqAsync } from "./ipcRequest.ts";
import { HTTP_LIKE_CONSTANTS } from "./constants.ts";

export class HttpLikeClient extends EventEmitter {
  constructor(public socket: BFChainIPCRequest.Any_Client) {
    super();
  }

  get(path: string, query: any) {
    return ipcReqAsync(this.socket, {
      [HTTP_LIKE_CONSTANTS.path]: path,
      query
    });
  }
}
