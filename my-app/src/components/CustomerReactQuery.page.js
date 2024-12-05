import { useCustomerDetails } from "../hooks/useCustomerDetails";
import { Link } from 'react-router-dom';

const onSuccess = (data) => {
    console.log("On Success Callback", data);
};

const onError = (error) => {
    console.log("On Error Callback", error);
};

export const CustomerReactQueryPage = () => {
    const enableFetch = true;
    const useQueryProps = {
        onSuccess,
        onError,
        enableFetch,
    }
    const {isLoading, data, isError, error, isFetching, refetch} = useCustomerDetails(useQueryProps);

    console.log({isFetching, isLoading})

    if(isLoading || isFetching) {
        return <h1>Loading...</h1>
    }

    if(isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <h2>React Query Customer Page</h2>
            <button onClick={refetch}>Fetch Details</button>
            {/* {data?.map((customer) => {
                return <div key={customer}>{customer}</div>
            })} */}
            {data?.data.map((customer) => {
                return <div key={customer.id}>
                    <Link to={`/customer-rq-page/${customer.id}`}>{customer.name}</Link>
                </div>
            })}
        </>
    )
};