export type PostItemType = {
    id: number;
    ref?: (node: HTMLDivElement)=>void;
    created_at: string;
    description: string|null;
    likes: number;
    urls: {
        full?: string;
        regular?: string;
        small: string;
        thumb?: string;
    };
    user: {
        id?: string;
        name: string;
        username: string;
        location?: string|null;
        profile_image?:{
            small?: string;
            medium?: string;
            large?: string;
        };
    };
}


export type ProfileType = {
    name: string | undefined;
    username: string | undefined;
    bio: string|null| undefined;
    location: string|null| undefined;
    profile_image: {
        small?: string;
        medium?: string;
        large?: string;
    };
    likes: number;
    photos?:[{
        id: string,
        created_at: string,
        blur_hash: string,
        urls: {
            regular: string,
            small: string,
            thumb: string,
                
        }
        },    
    ];
    social: {
        instagram_username: string|null,
        
        twitter_username: string|null,
    },
}

export type PostState = {
    theme: string;
    posts: PostItemType[];
    newsFeedPosts: PostItemType[];
    username: string;
    pageCount: number;
    isLoading: boolean;
    hasMore: boolean;
    resetPageCount: () => void;
    incrementPageCount: () => void;
    addPosts: (posts: PostItemType[]) => void;
    setNewsFeedPosts: (newPost: PostItemType) => void;
    setNewsFeedPostsOnReload: (newPost: PostItemType[]) => void;
    setUsername: (username: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    setHasMore: (hasMore: boolean) => void;
    setTheme: (theme:string) => void;
    resetUsername: () => void;
    resetPosts: () => void;
}