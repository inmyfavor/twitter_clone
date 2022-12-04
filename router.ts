import { Router } from "https://deno.land/x/oak/mod.ts";

import posts from './controllers/posts.ts';
import users from './controllers/users.ts';
import auth from './controllers/auth.ts';

const router = new Router()
    .use('/posts', posts.routes(), posts.allowedMethods())
    .use('/users', users.routes(), users.allowedMethods())
    .use('/auth', auth.routes(), auth.allowedMethods());

export default router;