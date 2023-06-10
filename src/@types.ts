export {};
declare global {
  export namespace BFChainIPCRequest {
    export type HttpLikeRequest = {
      query: any;
      params: any;
    };

    export interface Any_Client {
      send(msg: any): any;
      on(event: "message", listener: (msg: any) => any): any;
    }

    export interface Any_Server {
      on(
        event: "message",
        listener: (socket: Any_Client, msg: any) => any
      ): any;
    }
  }
}
