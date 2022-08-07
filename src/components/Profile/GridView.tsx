import { PostItemType, ProfileType } from "../../types/types"
import React, { useEffect, useState, Ref } from "react"
import './GridView.css'
import infiniteScroll from "../HOC/InfiniteScroll";
import { useStore } from "../../store/store";
import Spinner from "../UI/Spinner/Spinner";
import Toast from "../UI/Toast/Toast";
import Overlay from "../UI/Portal/Overlay";
import PostItem from "../PostItem/PostItem";
import ReactDOM from 'react-dom'
type Photos = {
    id: string;
    created_at: string;
    blur_hash: string;
    urls: { regular: string; small: string; thumb: string; };
}

function GridView(props: { loading: boolean, data: any, targetElement: Ref<HTMLDivElement>, error: null | string }) {

    // const [postss, setPosts] = React.useState<PostItemType[]>([]);

    const posts = useStore(state => state.posts)
    const theme = useStore(state => state.theme)
    const setHasMore = useStore(state => state.setHasMore)
    const hasMore = useStore(state => state.hasMore)

    const [enlarged, setEnlarged] = useState<{ showEnlarged: boolean, post: PostItemType | null }>({
        showEnlarged: false,
        post: null
    });


    const addPosts = useStore(state => state.addPosts)

    useEffect(() => {
        if(props.data?.length===0) setHasMore(false)
        if (props.data) {

            // setPosts(prev => [...prev, ...props.data]);



            const copy = posts.map(item => item.id)
            const filteredData: PostItemType[] = []

            props.data.forEach((item: any) => {
                if (!copy.includes(item.id)) {
                    filteredData.push(item)
                }
            })

            addPosts(filteredData)
        }

    }, [props.data])


    return (

        <div className={`profile-posts ${theme}`}>

            {enlarged.showEnlarged &&
                ReactDOM.createPortal(
                    <Overlay onClick={() => setEnlarged({ showEnlarged: false, post: null })}>
                        <PostItem key={enlarged.post?.id}
                            created_at={enlarged.post?.created_at ?? ''}
                            description={enlarged.post?.description ?? ''}
                            urls={{ small: enlarged.post?.urls.small ?? '' }}
                            likes={enlarged.post?.likes ?? -1}
                            id={enlarged.post?.id ?? Math.random()}
                            user={{
                                name: enlarged.post?.user.name ?? '', profile_image: { medium: enlarged.post?.user.profile_image?.medium },
                                username: enlarged.post?.user.username ?? ''
                            }} />
                    </Overlay>,
                    document.getElementById('portal') as HTMLElement
                )
            }
            {posts?.map((post, index) => {
                if (posts.length === index + 1) {
                    return (

                        <div className="profile-post-item" key={post.id} ref={props.targetElement}>

                            <img src={post.urls.regular} loading="lazy" />


                            <div className={`profile-post-item__content ${theme}`}
                             onClick={() => setEnlarged({ showEnlarged: true, post })}>
                                <p>{post.description ?? 'No description available'}</p>
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div className="profile-post-item" key={post.id}>
                            <img src={post.urls.small} loading="lazy" />

                            <div className={`profile-post-item__content ${theme}`}
                            onClick={() => setEnlarged({ showEnlarged: true, post })}>
                                <p>{post.description ?? 'No description available'}</p>
                            </div>
                        </div>
                    )
                }

            })}

            {props.loading && <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Spinner /></div>}

            {props.error && <Toast />}
            {props.error && <h1 className={`message ${theme}`}> Could not load data :( </h1>}
            {!hasMore && <h1 className={`message ${theme}`}> All Posts fetched </h1>}
        </div>
    )
}

const GridViewWithInfiniteScroll = infiniteScroll(GridView, `/users/username`)

export default GridViewWithInfiniteScroll