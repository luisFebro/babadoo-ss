import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../components/Title';
import parse from 'html-react-parser';

export default function ChangePassword() {

    const showForm = () => (
        <Fragment>

        </Fragment>
    );
    return (
        <div>
            <Title title="Trocar sua senha" subTitle="fsdfdsfds"/>
            <div>
                <img src="img/illustrations/empty-cart.png" width='100' height='100' alt="change-password"/>
            </div>
            {showForm()}
        </div>
    );
}
