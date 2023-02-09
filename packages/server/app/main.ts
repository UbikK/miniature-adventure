import { Application } from "oak";
import globalRouter from "./routes/router.ts";

const app = new Application();

app.addEventListener("listen", ({ hostname, port, secure }) => {
    console.log(
      `Listening on: ${secure ? "https://" : "http://"}${
        hostname ??
          "localhost"
      }:${port}`,
    );
  });
  
app.use(globalRouter.routes());
await app.listen({port: 3333});
