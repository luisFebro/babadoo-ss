import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { showSnackbarBlack } from '../../redux/actions/snackbarActions';
import { sendBuyRequestEmail } from '../../redux/actions/emailActions';
import { useStoreState, useStoreDispatch } from 'easy-peasy';

export default function FormCheckoutLocal() {
    const [values, setValues] = useState({
        name: '',
        phone: '',
        address: '',
        additional: '',
        itemDescription: '',
        totalPay: '',
        isFinishedFields: false
    });

    // REDUX
    const { bizInfo } = useStoreState(state => ({
        bizInfo: state.businessInfoReducer.cases.businessInfo
    }))
    const dispatch = useStoreDispatch();
    // END REDUX
    const { bizName, bizWebsite } = bizInfo;
    const { name, phone, address, additional, itemDescription, totalPay } = values;
    useEffect(() => {
        setInfoProducts();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        showSnackbarBlack(dispatch, "Enviando em um instante...", 2500);

        setTimeout(() => {
            alert('PEDIDO ENVIADO!\nENTRAREMOS EM CONTATO O MAIS BREVE POSSÍVEL\nAGRADECEMOS SUA PREFERÊNCIA!');
            document.getElementById('wait').innerHTML = '';
            resetForm();
        }, 4000);
        const bodyData = {
            name,
            phone,
            address,
            additional,
            itemDescription,
            totalPay,
            bizName,
            bizWebsite
        }
        console.log(bodyData);
        sendBuyRequestEmail(dispatch, bodyData);
    }

    const setInfoProducts = () => {
        const items = document.getElementById('items').innerHTML;
        const totalPay = document.getElementById('total').innerHTML;
        setValues({ itemDescription: items, totalPay: totalPay });
    }

    const resetForm = () => {
        // e.preventDefault(); //only allow one click
        document.getElementById('contactForm').reset();
    }
    const success = "This is a successful message";
    const showError = () => {}
    const showSuccess = () => {
        if(success) {
            showSnackbarBlack(dispatch, success, 10000);
        }
    }

    const showForm = () => (
        <section className="wrapper">
            <div className="company-info text-capitalize">
                <h3>precisamos identificar você para o envio</h3>
            </div>
            <form
                id="contactForm"
                onChange={handleChange}
                onSubmit={handleSubmit}
                method="POST"
                action="send"
            >
                <p className="full">
                    <label>Seu Nome</label>
                    <input type="text" name="name" required />
                </p>
                <p className="full">
                    <label>Telefone/Whatsapp</label>
                    <input type="tel" name="phone" required />
                </p>
                <p className="full">
                    <label>
                        Endereço para Entrega
                        <br /> (Rua/Avenida, Número, Bairro, Referência){' '}
                    </label>
                    <textarea name="address" rows="8" required></textarea>
                </p>
                <p className="full">
                    <label>Alguma Informação Adicional? (Opcional)</label>
                    <textarea name="additional" rows="8"></textarea>
                </p>
                <p className="full">
                    <button
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
                {showError()}
                {""}
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
