/**
 * Transform obj to JSON format. This is the data's body of a request to the server
 * @param  {Object} objToSend [obj to send to the server]
 * @return {JSON}
 */
export const getBodyRequest = objToSend => {
    return JSON.stringify(objToSend);
    // json ready to Go Internet - exemple:
    // {"name":"Luis Febro","email":"mr.febro@gmail.com","password":"12345678910"}
};
