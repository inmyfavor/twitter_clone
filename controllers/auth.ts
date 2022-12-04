import { Router } from "https://deno.land/x/oak/mod.ts";
import store from '../db.ts';

const router = new Router()
    .post('login', async (ctx) => {
        const data = await ctx.request.body({ type: 'json' }).value;
        const user = store.value.users.find(u => u.login === data.login)
        if (!user || user.password !== data.password) {
            ctx.response.body = {error: 'USER_OR_PASSWORD_MISMATCH', status: 'error'};
            return;
        }
        const session = {
            id: crypto.randomUUID(),
            userId: user.id
        };
        store.value.sessions.push(session);
        ctx.response.body = {status: 'ok', result: session}
    })
    .post('register', async (ctx) => {
        const data = await ctx.request.body({ type: 'json' }).value;
        if (store.value.users.find(u => u.login === data.login)) {
            ctx.response.body = {error: 'USER_ALREADY_EXISTS', status: 'error'};
        }
        store.value.users.push({
            id: crypto.randomUUID(),
            login: data.login,
            password: data.password
        });
        store.flush();
        ctx.response.body = {status: 'ok'};
    });

export default router;