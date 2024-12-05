import { useQuery } from "react-query";
import axios from 'axios';

const getCustomerDetails = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users');
}

export const useCustomerDetails = ({onSuccess, onError, enableFetch}) => {
    return useQuery(
        "customer-details", 
        getCustomerDetails,
        {
            // cacheTime: 5000, //default is 5 minutes ==> this will clear the cache data after the specified period
            // staleTime: 5000, //default is 0 minutes ==> this will change the state from fresh to stale after that period
            // refetchOnMount: false, // this will initiate a service call while mountung the component (true, false, 'always')
            // refetchOnWindowFocus: true,  // this will refetch the data whenever every window change ot window focus (true, false, 'always')
            // refetchInterval: 2000, // thtis will refetch the data at a certain interval period. but, we have moved out the window, it will not be called
            // refetchIntervalInBackground: true, // this is used to fetch the data at a certain interval period, even we have moved to other screen
            // enabled: false, // this will disable the fetch call while mounting the component
            enabled: enableFetch,
            onSuccess,
            onError,
            // select: (data) => {
            //     const custDtls = data?.data.map((cust) => cust.name.toUpperCase());
            //     return custDtls;
            // }
        }
    )
};