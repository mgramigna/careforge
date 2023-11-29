import path from "path";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import dotenv from "dotenv";

import { appRouter } from "./src/root";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

createHTTPServer({
  router: appRouter,
  createContext() {
    // TODO: create session
    return { session: null };
  },
}).listen(3000, () => {
  console.log("Server listening on port 3000");
});
