import axios from 'axios';

const getDataObjDiffKeys = res => {
    let name = [], email = [];
    for(let userId in res) {
        name.push(res[userId].name);
        email.push(res[userId].email);
    }
    return [name, email];
}

export default function getEmailAllRegisteredUsers() {
    let res = {};
    axios.get('api/users/list')
      .then(response => {
            let data = getDataObjDiffKeys(response.data);
            res.name = data[0];
            res.email = data[1];
      })
      .catch(err => console.log(err));

    return res

}