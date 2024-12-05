import axios from "axios";
import { useQuery } from "react-query";


const getCustomerDetails = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users1');
}

const getPostDetails = () => {
    return axios.get('https://jsonplaceholder.typicode.com/posts');
}

export const ParallelQueryPage = () => {
    const { isLoading: isCustDtlsLoading, data: custData, isError: isCustDtlError, error: custError} = 
                            useQuery('customer', getCustomerDetails);
    const { isLoading: isPostsLoading, data: postData, isError: isPostsError, error: postError} = 
                            useQuery('posts', getPostDetails);

    if(isCustDtlsLoading || isPostsLoading){
        return <h1>Loading...</h1>
    }

    if(isPostsError){
        return <h1>{postError.message}</h1>
    }

    if(isCustDtlError){
        return <h1>{custError.message}</h1>
    }
    
    return(
        <>
            <h1>Parallel Query Page</h1>
            <h1>Customer Details</h1>
            {custData?.data.map((customer) => {
                return <div key={customer.id}>
                    {customer.name}
                </div>
            })}
            <h1>Post Details</h1>
            {postData?.data.map((post) => {
                return <div key={post.id}>
                    {post.title}
                </div>
            })}
        </>
    )
}