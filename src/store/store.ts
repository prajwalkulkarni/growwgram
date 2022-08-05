import create from "zustand";
import { PostItemType } from "../types/types";


type PostState = {
    posts: PostItemType[];
    username: string;
    pageCount: number;
    resetPageCount: () => void;
    incrementPageCount: () => void;
    addPosts: (posts: PostItemType[]) => void;
    setUsername: (username: string) => void;
    resetUsername: () => void;
    resetPosts: () => void;
}
export const useStore = create<PostState>((set, get) => ({
    pageCount: 1,
    username:'elijahp',
    posts: [],
    resetPageCount: () => set({ pageCount: 1 }),
    incrementPageCount: () => set((state)=>({pageCount:state.pageCount+1})),
    addPosts: (postsCollection:PostItemType[]) => set((state)=>({posts : [...state.posts,...postsCollection]})),
    resetPosts: () => set({posts:[]}),
    setUsername: (username:string) => set({username}),
    resetUsername: () => set({username:''})
}));
