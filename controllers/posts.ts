import { Router } from "https://deno.land/x/oak/mod.ts";
import store from '../db.ts';
import authMiddleware from "../middlewares/auth.ts";

const router = new Router()
    .get('/', ctx => {
        const userId = ctx.request.url.searchParams.get('userId');
        let results = store.value.posts;
        if (userId) {
            results = store.value.posts.filter(p => p.userId === userId);
        }
        ctx.response.body = results;
    })
    .get('/:postId', ctx => {
        const post = store.value.posts.find(p => p.id === ctx.params.postId);
        ctx.response.body = post;
    })
    .post('/', async (ctx) => {
        const data = await ctx.request.body({ type: 'json' }).value;
        const userId = '';
        const post = {
            id: crypto.randomUUID(),
            userId: userId,
            createdAt: new Date(),
            text: data.text
        };
        store.value.posts.push(post);
        store.flush();
        ctx.response.body = post;
    }, authMiddleware)
    .delete('/:postId', ctx => {
        const index = store.value.posts.findIndex(p => p.id === ctx.params.postId);
        const post = store.value.posts[index];
        if (post.userId !== ctx.state.userId) {
            ctx.throw(401, 'deleting other user`s post')
            return;
        }
        if (index !== -1) {
            store.value.posts.splice(index, 1);
            store.flush();
        }
        ctx.response.body = 'ok'
    }, authMiddleware);

export default router;