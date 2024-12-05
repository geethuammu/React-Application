import { useParams } from 'react-router-dom'
import { useCustomerInfo } from '../hooks/useCustomerInfo';

export const CustomerInfoPage = () => {
    const {custId} = useParams();
    const { isLoading, data, isError, error } = useCustomerInfo(custId);

    if(isLoading) {
        return <h1>Loading...</h1>
    }

    if(isError) {
        return <h1>{error.message}</h1>
    }

    return(
        <>
            <h1>Super Hero Info Page</h1>
            <p><span className='heading'>Name: </span>{data?.data.name}</p>
            <p><span className='heading'>Email ID: </span>{data?.data.email}</p>
            <p><span className='heading'>Phone Number: </span>{data?.data.phone}</p>
        </> 
    )
}