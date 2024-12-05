import { useState } from 'react';
import { usePostDetails, useAddPostDetails } from '../hooks/usePostDetails';

export const AddPostDetailPage = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const userId = 11;
    const {isLoading, data, isError, error, refetch} = usePostDetails();
    const { mutate: addPostData } = useAddPostDetails();

    if(isLoading) {
        return <h1>Loading...</h1>
    }

    if(isError) {
        return <h1>{error.message}</h1>
    }
    const onPostAddition = () => {
        const postDtls = {userId, title, body};
        addPostData(postDtls);
    }

    return (
        <>
            <h2>React Query Customer Page</h2>
            <h1>Post Details</h1>
            <button onClick={refetch}>Fetch</button>
            <div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <input type="text" value={body} onChange={(e) => setBody(e.target.value)}></input>
                <input type="text" value={userId} disabled></input>
                <button onClick={onPostAddition}>Add Post</button>
            </div>
            {data?.data.map((post) => {
                return <div key={post.id}>
                    {post.title}
                </div>
            })}
        </>
    )
};