import { IWC_Client, IWC_Server, IWCJSONDry } from "@bfchain/ipc";
import { registerIpcRes, ipcReqAsync } from "@bfchain/ipc-request";

(async () => {
  const server = new IWC_Server("QAQ");
  await server.listen();

  const client = new IWC_Client(server.path);
  {
    registerIpcRes(
      server,
      (msg) => msg.path === "qaq",
      async (msg) => {
        return "zzz";
      }
    );
    const data = await ipcReqAsync(client, { path: "qaq" });
    console.log("zzz" === data, "req data");
  }
  {
    class AAA {
      constructor(public name: string) {}
    }
    IWCJSONDry.registerClass(AAA, {
      unDry(ins) {
        return new AAA(ins.name);
      },
    });
    registerIpcRes(server, "zzzzzz", async (query, body) => {
      console.log("msg", query, body);
      return body;
    });
    const data = await ipcReqAsync(client, "zzzzzz", new AAA("qaq"));
    console.log(data instanceof AAA, data, "json dry");
  }
  console.log("√ all passed.");
})().catch((err) => {
  console.error("QQQQQ", err);
});
