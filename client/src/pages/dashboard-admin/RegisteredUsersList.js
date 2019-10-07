import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegisteredUser from './RegisteredUser';
let datus = [];
export default function RegisteredUsersList() {
    const [data, setData] = useState([]);
    const [name, setName] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");
    // empty array as a second argument acts like componentDidMount.
    useEffect(() => {
        axios.get('api/users/list')
          .then(response => {
                setData(response.data);
                setLoad(true);
                for(let userId in response.data) {
                    datus.push(response.data[userId].name);
                    console.log(response.data[userId].name);
                    setName(response.data[userId].name);
                }

                // usersEmails.push(response.data[registeredUser].email);
          })
          .catch(err => {
                setError(err.message);
                setLoad(true);
           })
    }, [])
    console.log("whatisname", name);
    console.log("datus", datus);

    if (load) {
        return (<div>
            <h2 className="text-title text-center">Lista de Todos os Usuários Cadastrados</h2>
            {error ? <p>{error.message}</p> :
            <p className="text-default text-center">{datus}</p>
            // data.map((data, index) => <p key={index}>{data}</p>)
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
