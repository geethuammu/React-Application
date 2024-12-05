import axios from "axios"
import { useQueries } from "react-query";

const getCustomerDetails = (custId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${custId}`);
}

export const DynaminParallelQueriesPage = ({custIds}) => {
    const queryResults = useQueries(
        custIds.map ( id => {
            return {
                queryKey: ['customer-dynamic-query', id],
                queryFn: () => getCustomerDetails(id)
            }
        })
    )
    console.log(queryResults);
    
    return(
        <>
            <h1>Dynamic Parallel Query Page</h1>
        </>
    )
}