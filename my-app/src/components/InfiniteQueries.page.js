import axios from "axios";
import { useInfiniteQuery } from 'react-query';

const getAlbumDetails = ({pageParam = 1}) => {
    return axios.get(`https://jsonplaceholder.typicode.com/albums?_limit=2&_page=${pageParam}`);
}

export const InfiniteQueriesPage = () => {
    const {isLoading, data, isError, error, fetchNextPage, isFetchingNextPage, isFetching, hasNextPage} = useInfiniteQuery(
        ['album-details'], 
        getAlbumDetails,
        {
            getNextPageParam: (_lastPage, pages) => {
                if(pages.length < 51){
                    return pages.length + 1
                } else {
                    return undefined
                }
            },
        }
    );

    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(isError){
        return <h1>{error.message}</h1>
    }
    
    return(
        <>
            <h1>Infiinite Query Page</h1>
            <h1>Album Details</h1>
            {
                data?.pages.map((albums, index) => {
                    return(
                        <div key={index}>
                            {
                                albums.data.map((album) => (
                                    <h2 key={album.id}>
                                        {album.id}. {album.title}
                                    </h2>
                                ))
                            }
                        </div>
                    )
                    // return (
                    //     <div key={album.id}>{album.title}</div>
                    // )
                })
            }
            <div>
                <button onClick={fetchNextPage} disabled={!hasNextPage}>Load More</button>
            </div>
            <div>{isFetching && isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
    )
}