import axios from 'axios';
import { useEffect, useState } from 'react';

export const CustomerPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading]= useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
        // axios.get('../../db.json').then((res) => {
            setData(res.data);
            setLoading(false);
        }).catch((error) => {
            setErrorMsg(error.message);
            setLoading(false);
        })
    }, []);

    if(isLoading) {
        return <h1>Loading...</h1>
    }

    if(errorMsg) {
        return <h1>{errorMsg}</h1>
    }

    return (
        <>
            <h2>Customer Page</h2>
            {data.map((customer) => {
                return <div key={customer.id}>{customer.name}</div>
            })}
        </>
    )
};