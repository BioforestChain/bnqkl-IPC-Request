import { EventEmitter } from "node:events";
import { registerIpcRes } from "./ipcRequest.ts";
import { HTTP_LIKE_CONSTANTS } from "./constants.ts";

export class HttpLikeServer extends EventEmitter {
  constructor(public server: BFChainIPCRequest.Any_Server) {
    super();
  }

  get(path: string, handle: (req: BFChainIPCRequest.HttpLikeRequest) => void) {
    // TODO: parse params
    registerIpcRes(
      this.server,
      msg => {
        return msg[HTTP_LIKE_CONSTANTS.path] === path;
      },
      msg => handle({ params: {}, query: msg.query })
    );
  }
}
