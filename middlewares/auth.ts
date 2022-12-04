import { RouterMiddleware } from "https://deno.land/x/oak/mod.ts";
import store from '../db.ts';

const authMiddleware: RouterMiddleware<string> = async (ctx, next) => {
    let authHeader: string | null = ctx.request.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
        authHeader = authHeader.slice(7);
    }
    const session = store.value.sessions.find(s => s.id === authHeader);
    if (!session) {
        ctx.throw(401, 'not authorized');
        return;
    }
    ctx.state.userId = session.userId;
    await next();
}

export default authMiddleware;