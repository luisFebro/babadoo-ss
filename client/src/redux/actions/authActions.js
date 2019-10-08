import axios from 'axios';
import { returnActions } from './errorActions';

export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: 'LOGIN_FAIL'
      });
    });
};


// Rconstegister User
export register = ({ name, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ name, email, password });
    // json ready to Go Internet - exemple:
    // {"name":"Luis Febro","email":"mr.febro@gmail.com","password":"12345678910"}

    axios
        .post('/api/users', body, config)
        .then(res =>
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            })
        )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        );
        dispatch({
          type: 'REGISTER_FAIL'
        });
      });
};