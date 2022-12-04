import { Router } from "https://deno.land/x/oak/mod.ts";
import store from "../db.ts";
import authMiddleware from "../middlewares/auth.ts";

const router = new Router()
    .get('/', ctx => {
        ctx.response.body = store.value.users;
    })
    .get('/:userId', ctx => {
        const user = store.value.users.find(u => u.id === ctx.params.userId);
        ctx.response.body = user;
    })
    .get('/me', ctx => {
        const user = store.value.users.find(u => u.id === ctx.state.userId);
        ctx.response.body = user;
    }, authMiddleware);

export default router;