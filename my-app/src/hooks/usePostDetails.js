import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from 'axios';

const getPostDetails = () => {
    return axios.get('https://jsonplaceholder.typicode.com/posts');
}

const addPostDetails = (postData) => {
    return axios.post('https://jsonplaceholder.typicode.com/posts', postData);
}

export const usePostDetails = () => {
    return useQuery(
        "post-details", 
        getPostDetails
    )
};

export const useAddPostDetails = () => {
    const queryClient = useQueryClient();
    return useMutation( addPostDetails,{
        // onSuccess: (data) => {
        //     // queryClient.invalidateQueries('post-details') // this will automatically initiate a get call and update the list
        //     queryClient.setQueryData('post-details', (oldData) => { // this will automatically update the list without addition get call
        //         return {
        //             ...oldData,
        //             data: [...oldData.data, data.data]
        //         }
        //     })
        // }
        onMutate: async (newPost) => {
            await queryClient.cancelQueries('post-details');
            const previousPostData = queryClient.getQueryData('post-details');
            queryClient.setQueryData('post-details', (oldData) => {
                return {
                    ...oldData,
                    data: [...oldData.data, 
                        {id: oldData?.data.length + 1, ...newPost},
                    ],
                }
            })
            return {
                previousPostData,
            }
        },
        onError: (_error, _posts, context) => {
            queryClient.setQueryData('post-details', context.previousPostData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('post-details')
        }
    })
}