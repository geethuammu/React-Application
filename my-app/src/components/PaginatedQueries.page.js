import axios from "axios"
import { useState } from "react";
import { useQuery } from "react-query";


const getAlbumDetails = (pageNumber) => {
    return axios.get(`https://jsonplaceholder.typicode.com/albums?_limit=2&_page=${pageNumber}`);
}

export const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const {isLoading, data, isError, error, isFetching} = useQuery(
        ['album',pageNumber], 
        () => getAlbumDetails(pageNumber),
        {
            keepPreviousData: true,
        });

    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(isError){
        return <h1>{error.message}</h1>
    }
    
    return(
        <>
            <h1>Paginated Query Page</h1>
            <h1>Album Details</h1>
            <div>
                {data?.data.map((album) => {
                    return (<div key={album.id}>
                        <h2>{album.id}. {album.title}</h2>
                    </div>)
                })}
            </div>
            <div>
                <button onClick={() => setPageNumber(page => page - 1)} disabled={pageNumber === 1}>
                    Previous Pge
                </button>
                <button onClick={() => setPageNumber(page => page + 1)} disabled={pageNumber === 51}>
                    Next Pge
                </button>
            </div>
            {isFetching && 'Loading'}
        </>
    )
}