import axios from 'axios';

//Fetch data with Promises and useEffect hook.
// Returns an obj
export const fetchDataAsyncWithHooks = async (urlOrRoute, setData) => {
    try {
        const response = await axios.get(urlOrRoute);
        setData(response.data);
    } catch (e) {
        console.log('fetchDataAsyncWithHooks', e);
        // throw new Error(`fetchData: something went wrong! error: ${e.message}`);
    }
};

// Prior code used in Google Auth.
// fetchDataAsyncWithHooks('api/users/list', setData);
// const fetchData = async () => {
//     try {
//         const response = await axios.get('api/users/list');
//         setData(response.data);
//         // statements
//     } catch(e) {
//         // console.log(e);
//         throw new Error(`fetchData: something went wrong! error: ${e.message}`);
//     }
// };
