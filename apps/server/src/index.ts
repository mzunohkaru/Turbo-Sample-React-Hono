import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { serve } from '@hono/node-server';

import prisma from '@repo/database';
import { UserResponse, PostResponse } from '@repo/schema';

const app = new Hono().basePath('/api');

app.use(cors());
app.use(logger());
app.use(prettyJSON());
app.notFound((c) => c.text('404 Not found'));

app.get('/', (c) => c.text('Hello, Hono!'));

app.get('/users', async (c) => {
  const users: UserResponse[] = await prisma.user.findMany();
  return c.json(users);
});

app.post('/users', async (c) => {
  const body = await c.req.json();
  const user: UserResponse = await prisma.user.create({
    data: body,
  });
  return c.json(user);
});

app.get('/posts', async (c) => {
  const posts: PostResponse = {
    id: '1',
    title: 'Hello, Hono!',
    content: 'This is a test post.',
  };
  return c.json(posts);
});

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
