import { performance } from "perf_hooks";
import { IPC_Client, IPC_Server, IPCJSONDry } from "@bfchain/ipc";
import { registerIpcRes, ipcReqAsync } from "@bfchain/ipc-request";

(async () => {
  const server = new IPC_Server("QAQ");
  const ipc_address = await server.listen();
  const client = new IPC_Client(ipc_address);
  {
    class AAA {
      constructor(public name: string, public data: string) {}
    }
    IPCJSONDry.registerClass(AAA, {
      unDry(ins) {
        return new AAA(ins.name, ins.data);
      },
    });
    registerIpcRes(server, "zzzzzz", async (query, body) => {
      //   console.log("msg: receive message");
      return body;
    });
    const data = "qqq".repeat(10000);
    const aaa = new AAA("block", data);

    const b = performance.now();
    for (let i = 0; i < 100; i++) {
      await ipcReqAsync(client, "zzzzzz", aaa);
    }
    const e = performance.now();

    console.log(`finish, spend time ${e - b}`);
  }
  {
    registerIpcRes(server, "zzzzzz", async (query, body) => {
      //   console.log("msg: receive message");
      return body;
    });
    const data = "qqq".repeat(10000);

    const b = performance.now();
    for (let i = 0; i < 100; i++) {
      await ipcReqAsync(client, "zzzzzz", data);
    }
    const e = performance.now();

    console.log(`finish, spend time ${e - b}`);
  }
})().catch((err) => {
  console.error("QQQQQ", err);
});
