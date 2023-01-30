import { Application } from "oak";
import userRouter from "./routes/users/router.ts";

const app = new Application();

app.addEventListener("listen", ({ hostname, port, secure }) => {
    console.log(
      `Listening on: ${secure ? "https://" : "http://"}${
        hostname ??
          "localhost"
      }:${port}`,
    );
  });
  
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
await app.listen({port: 3333});
