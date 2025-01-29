import { useEffect, useState } from 'react'
import { z } from 'zod'
import { validateResponse } from './validateResponse'

export const postShema = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
    userId: z.string(),
    createdAt: z.number()
})


export type Post = z.infer<typeof postShema>

export const PostList = z.array(postShema)

export type PostList = z.infer<typeof PostList>

export const fethPostListShema = z.object({
    list: PostList
})
type fethPostListResponse = z.infer<typeof fethPostListShema>

export function fethPostList(): Promise<fethPostListResponse> {
    return fetch('/api/notes/')
        .then((response) => response.json())
        .then((data) => fethPostListShema.parse(data))
}
interface IdleRequestState {
    status: 'idle';
}
interface LoadingRequestState {
    status: 'pending';
}
interface SuccessRequestState {
    status: 'success';
    data: PostList;
}
interface ErrorRequestState {
    status: 'error';
    data: unknown;
}

type RequestState =
    | IdleRequestState
    | LoadingRequestState
    | SuccessRequestState
    | ErrorRequestState

export function usePostList() {
    const [state, setState] = useState<RequestState>({ status: 'idle' })

    useEffect(() => {
        if (state.status === 'pending') {
            fethPostList()
                .then((data) => setState({
                    status: 'success', data: data.list
                }))
                .catch((error) => setState({
                    status: 'error', data: error
                }))
        }

    }, [state])

    useEffect(() => {
        setState({ status: 'pending' })
    }, [])

    const reFetch = () => {
        setState({ status: 'pending' })
    }

    return {
        state,
        reFetch
    }
}

export function createNote(title: string, text: string): Promise<void> {
    return fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ title, text })
    })
        .then(validateResponse)
        .then((() => undefined))
}