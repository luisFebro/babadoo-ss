import axios from 'axios';

//Fetch data with Promises and useEffect hook.
// Returns an obj
export const postDataWithJsonObj = async (route, objToSend) => {
    const config = {}, body = null;
    // Headers
    config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    body = JSON.stringify(objToSend);

    try {
        const post = await axios.post('/api/users', body, config);
    } catch(e) {
        console.log("postDataWithJsonObj", e);
        // throw new Error(`fetchData: something went wrong! error: ${e.message}`);
    }
};