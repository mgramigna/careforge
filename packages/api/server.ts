import { createHTTPServer } from "@trpc/server/adapters/standalone";

import { appRouter } from "./src/root";

createHTTPServer({
  router: appRouter,
  createContext() {
    // TODO: create session
    return { session: null };
  },
}).listen(3000, () => {
  console.log("Server listening on port 3000");
});
