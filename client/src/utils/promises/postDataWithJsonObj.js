import axios from 'axios';

// Post data to database.
// route is a string with the route's path. objToSend is self-explanatory
//  Returns a promise
export const postDataWithJsonObj = async (route, objToSend) => {
    let config = {}, body = null;
    // Headers
    config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    body = JSON.stringify(objToSend);
    // json ready to Go Internet - exemple:
    // {"name":"Luis Febro","email":"mr.febro@gmail.com","password":"12345678910"}

    try {
        const res = await axios.post(route, body, config);
        return res;
    } catch(e) {
        console.log("postDataWithJsonObj", e);
        // throw new Error(`fetchData: something went wrong! error: ${e.message}`);
    }
};