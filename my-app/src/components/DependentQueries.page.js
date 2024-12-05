import axios from "axios"
import { useQuery } from "react-query"

const getPostDetails = (postId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const getCommentsDetails = (postCommentId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postCommentId}/comments`)
}

export const DependentQueryPage = ({postId}) => {
    const {data: postQuery} = useQuery('post-detail', () => getPostDetails(postId));
    const postCommentId = postQuery?.data.id;
    const {data: commentData} = useQuery('comments',
        () => getCommentsDetails(postCommentId),
        {
            enabled: !!postCommentId,
        }
    )
    console.log(commentData);
    return(
        <>
            <h1>Dependent Query</h1>
            {commentData?.data.map((comment) => {
                return(
                    <>
                        <p><span className="heading">Name:</span> {comment.name}</p>
                        <p><span className="heading">Body:</span> {comment.body}</p>
                        <p><span className="heading">Email ID:</span> {comment.email}</p>
                        <p className="borderline"></p>
                    </>
                )
            })}
        </>
    )
}