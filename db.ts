interface Post {
    id: string
    userId: string
    createdAt: Date
    text: string
}

interface User {
    id: string
    login: string
    password: string
}

interface Session {
    id: string
    userId: string
}

interface StoreValue {
    posts: Post[]
    users: User[]
    sessions: Session[]
}

interface Store {
    value: StoreValue
    flush: () => Promise<void>
}

const store: Store = {
    value: {
        posts: [],
        users: [],
        sessions: []
    },
    async flush() {
        await Deno.writeTextFile('data.json', JSON.stringify(this.value));
    }
}

try {
    const text = await Deno.readTextFile('data.json');
    store.value = JSON.parse(text)
} catch {
    store.flush();
}

export default store