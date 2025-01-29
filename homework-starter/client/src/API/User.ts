import { z } from 'zod'
import { validateResponse } from './validateResponse'

export const userShema = z.object({
    id: z.number(),
    username: z.string()
})

export type User = z.infer<typeof userShema>

export function fetchUser(id: string): Promise<User> {
    return fetch(`/api/users/${id}`)
        .then((response) => response.json())
        .then((data) => userShema.parse(data))
}

export function registerUser(
    username: string,
    email: string,
    password: string): Promise<void> {
    return fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    }).then(() => undefined)
}



export function login(email: string, password: string): Promise<void> {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(validateResponse)
        .then(() => undefined)
}

export function note(title: string, text: string): Promise<void> {
    return fetch('/api/note', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, text })
    })
        .then(validateResponse)
        .then(() => undefined)
}

export function fetchMe(): Promise<User> {
    return fetch('/API/users/me')
        .then(validateResponse)
        .then((response) => response.json())
        .then((data) => userShema.parse(data))
}