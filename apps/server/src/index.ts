import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { serve } from "@hono/node-server";

import user from "@/router/user";
import post from "@/router/post";

const app = new Hono().basePath("/api");

app.use(cors());
app.use(logger());
app.use(prettyJSON());
app.notFound((c) => c.text("404 Not found"));

app.get("/", (c) => c.text("Hello, Hono!"));

app.route("/users", user).route("/posts", post);

app.onError((err, c) => {
  console.error(err);
  return c.json({ message: err.message }, 500);
});

const PORT = process.env.PORT || 8080;

serve({
  fetch: app.fetch,
  port: Number(PORT),
});

console.log(`Server is running at http://localhost:${PORT}/api`);

export default app;
export type AppType = typeof app;
