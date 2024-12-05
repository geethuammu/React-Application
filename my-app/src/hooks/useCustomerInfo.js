import { useQuery, useQueryClient } from "react-query";
import axios from 'axios';

const getCustomerDetails = ({queryKey}) => {
// const getCustomerDetails = (custId) => {
    const custId = queryKey[1];
    return axios.get(`https://jsonplaceholder.typicode.com/users/${custId}`);
}

export const useCustomerInfo = (custId) => {
    const queryClient = useQueryClient();
    return useQuery(["customer-info", custId], getCustomerDetails,
        {
            initialData: () => {
                const hero = queryClient.getQueryData('customer-infos')?.data?.find((hero) => hero.id === parseInt(custId))
                if(hero){
                    return { data: hero }
                } else{
                    return undefined;
                }
            },
        })
    // return useQuery(["customer-info", custId], () => getCustomerDetails(custId))
};