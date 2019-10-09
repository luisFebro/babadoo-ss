import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegisteredUser from './RegisteredUser';

const getDataFromRes = (res) => {
    let name = [], email = [];
    for(let userId in res) {
        name.push(res[userId].name);
        email.push(res[userId].email);
    }
    return [name, email];
}

export default function RegisteredUsersList() {
    const [data, setData] = useState({ name: [], email: [] });
    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");
    // empty array as a second argument acts like componentDidMount.
    useEffect(() => {
        axios.get('api/users/list')
          .then(response => {
                let data = getDataFromRes(response.data);
                setData({ name: data[0], email: data[1] });
                setLoad(true);
          })
          .catch(err => {
                setError(err.message);
                setLoad(true);
           })
    }, [])

    if (load) {
        return (<div style={{maxHeight: '300px',
    overflow: 'scroll'}}>
            <h2 className="text-title text-center">Lista de Todos os Usuários Cadastrados</h2>
            <h2 className="text-title text-left pl-5">Total de Usuários: <strong>{data.name.length}</strong></h2>
            {error ? <p>{error.message}</p> :
            <p className="text-default">
            {data.name.map((nam, ind) => <RegisteredUser key={ind} name={nam} email={data.email[ind]} />)}
            </p>

        }
        </div>);
        } else {
            return (
                <div>
                    <h2 className="text-default">Carregando...</h2>
                </div>
            );
        }
    };
