import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { showSnackbarBlack } from '../../redux/actions/snackbarActions';
import { sendBuyRequestEmail } from '../../redux/actions/emailActions';
import { setErrorOff } from '../../redux/actions/globalActions';
import { useStoreState, useStoreDispatch } from 'easy-peasy';

export default function FormCheckoutLocal() {
    const [values, setValues] = useState({
        name: '',
        phone: '',
        address: '',
        additional: '',
        itemDescription: '',
        totalPay: ''
    });
    const [redirect, setRedirect] = useState(false);
    const { name, phone, address, additional, itemDescription, totalPay } = values;

    // REDUX
    const { bizInfo, errorMsg } = useStoreState(state => ({
        bizInfo: state.adminReducer.cases.allData.businessInfo,
        errorMsg: state.globalReducer.cases.errorMsg
    }));
    const dispatch = useStoreDispatch();

    // This component is running before fetching bizInfo, that's why this condition until further info
    let bizName = "", bizWebsite = "", bizEmail = "";
    if (bizInfo) {
        bizName = bizInfo.bizName;
        bizWebsite = bizInfo.bizName;
        bizEmail = bizInfo.bizEmail;
    }
    // END REDUX

    useEffect(() => {
        setInfoProducts();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const bodyData = {
            name,
            phone,
            address,
            additional,
            itemDescription,
            totalPay,
            bizName,
            bizWebsite,
            bizEmail
        };

        sendBuyRequestEmail(dispatch, bodyData).then(res => {
            if (!res) {
                if (errorMsg) {
                    showSnackbarBlack(dispatch, errorMsg);
                    return;
                }
            } else {
                resetForm();
                showSnackbarBlack(dispatch, res.data.msg, 4000);
                setErrorOff(dispatch);
                setTimeout(() => setRedirect(true), 5000);
            }
        });
    };

    const setInfoProducts = () => {
        const items = document.getElementById('items').innerHTML;
        const totalPay = document.getElementById('total').innerHTML;
        setValues({ itemDescription: items, totalPay: totalPay });
    };

    const resetForm = () => {
        const tempValues = values;
        for (let key in tempValues) {
            tempValues[key] = '';
        }
        setValues(tempValues);
    };

    const needRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/" />;
        }
    };

    const showForm = () => (
        <section className="wrapper">
            <div className="company-info text-capitalize">
                <h3>precisamos identificar você para o envio</h3>
            </div>
            <form id="contactForm">
                <p className="full">
                    <label>Seu Nome</label>
                    <input type="text" name="name" onChange={handleChange} value={name} /> {/*n1*/}
                </p>
                <p className="full">
                    <label>Telefone/Whatsapp</label>
                    <input type="tel" name="phone" onChange={handleChange} value={phone} />
                </p>
                <p className="full">
                    <label>
                        Endereço para Entrega
                        <br /> (Rua/Avenida, Número, Bairro, Referência){' '}
                    </label>
                    <textarea name="address" rows="8" onChange={handleChange} value={address}></textarea>
                </p>
                <p className="full">
                    <label>Alguma Informação Adicional? (Opcional)</label>
                    <textarea name="additional" rows="8" onChange={handleChange} value={additional}></textarea>
                </p>
                <p className="full">
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        style={{
                            color: 'var(--mainWhite)',
                            background: 'var(--mainYellow)'
                        }}
                    >
                        Concluir Compra
                    </button>
                </p>
            </form>
        </section>
    );

    return (
        <DivContainer className="container">
            <div className="contact animated rotateInDownLeft slower delay-3s">
                {needRedirect(redirect)}
                {showForm()}
            </div>
        </DivContainer>
    );
}

const DivContainer = styled.div`
    * {
        box-sizing: border-box;
    }

    body {
        background: #92bde7;
        color: #485e74;
        line-height: 1.6em;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 1em;
    }

    .container {
        max-width: 1170px;
        margin-left: auto;
        margin-right: auto;
        padding: 1em;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    .brand {
        text-align: center;
    }

    .brand span {
        color: var(--mainWhite);
    }

     {
        box-shadow: 0 0 20px 0 rgba(72, 94, 116, 0.7);
    }

    .wrapper > * {
        padding: 2em;
    }

    .company-info {
        color: var(--mainWhite);
        background: var(--mainRed);
    }

    .company-info h3,
    .company-info ul {
        text-align: center;
        margin: 0 0 1rem 0;
    }

    .contact {
        background: #f9feff;
    }

    /* FORM STYLES */
    .contact form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        padding: 1em;
    }

    .contact form label {
        display: block;
    }

    .contact form p {
        margin: 0;
    }

    .contact form .full {
        grid-column: 1 / 3;
    }

    .contact form button,
    .contact form input,
    .contact form textarea,
    .contact form buyer-name {
        width: 100%;
        border: 1px solid #c9e6ff;
        height: 3em;
    }

    .contact form button {
        background: #c9e6ff;
        border: 0;
        text-transform: uppercase;
    }

    .contact form button:hover,
    .contact form button:focus {
        background: #92bde7;
        color: #fff;
        outline: 0;
        transition: background-color 2s ease-out;
    }

    /* LARGE SCREENS */
    @media (min-width: 700px) {
        .wrapper {
            display: grid;
            grid-template-columns: 1fr 2fr;
        }

        .wrapper > * {
            padding: 4em;
        }
        //.company-info h3, .company-info ul, .brand{
        text-align: left;
    }
`;

/* COMMENTS
n1: onChange and value works together, especially when resets the form fields and avoid this error: defaultValue used because this error:  Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
*/
