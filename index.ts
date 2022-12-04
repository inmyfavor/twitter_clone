import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import router from './router.ts';

await new Application<{ userId?: string }>()
    .use(router.routes())
    .listen({ port: 8000 });