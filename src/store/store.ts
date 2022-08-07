import create from "zustand";
import { PostItemType, PostState } from "../types/types";



export const useStore = create<PostState>((set, get) => ({
    theme:"dark",
    pageCount: 1,
    username:'elijahp',
    isLoading: false,
    newsFeedPosts: [],
    posts: [],
    hasMore: true,
    resetPageCount: () => set({ pageCount: 1 }),
    incrementPageCount: () => set((state)=>({pageCount:state.pageCount+1})),
    addPosts: (postsCollection:PostItemType[]) => set((state)=>({posts : [...state.posts,...postsCollection]})),
    setNewsFeedPosts: (newPost:PostItemType) => set((state)=>({newsFeedPosts : [...state.newsFeedPosts,newPost]})),
    setNewsFeedPostsOnReload: (loadedposts:PostItemType[]) => set((state)=>({newsFeedPosts : [...loadedposts]})),
    resetPosts: () => set({posts:[]}),
    setUsername: (username:string) => set({username}),
    setIsLoading: (isLoading:boolean) => set({isLoading}),
    setHasMore: (hasMore:boolean) => set({hasMore}),
    setTheme: (theme:string) => set({theme}),
    resetUsername: () => set({username:''})
}));
