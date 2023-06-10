export const enum constants {
  REQ = "IPC_REQS_REQ",
  RES = "IPC_REQS_RES",
}
export const HTTP_LIKE_CONSTANTS = {
  path: ":path",
};

export const ErrorConstructorList = Object.getOwnPropertyNames(global)
  .filter((name) => {
    if (name.endsWith("Error")) {
      const Con = (global as any)[name];
      return (
        Con === Error ||
        (typeof Con === "function" && Con.prototype instanceof Error)
      );
    }
  })
  .map((errname) => (global as any)[errname]);

export const debug = require("debug")("ipc-reqres");
