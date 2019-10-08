import React from 'react';
import styled from 'styled-components';
import getPeriodOfDayWithPic from '../../components/utils/getPeriodOfDayWithPic';
import { useStoreState } from 'easy-peasy';

export default function GetPeriodOfDay() {
    const userLoggedIn = useStoreState(state => state.authReducer.cases.user.name);
    console.log(userLoggedIn);

    const getData = getPeriodOfDayWithPic(userLoggedIn);
    const { img, alt, color } = getData.illustration;

    return (
        <DivWrapper className="container">
            <img className="shadow-elevation" src={img} alt={alt} />
            <p style={{color}} className="text-main-container top-centered text-nowrap border-white"><strong>{getData.greeting}</strong></p>
        </DivWrapper>
    );
}

const DivWrapper = styled.div`
    position: relative;
    text-align: center;
    width: 100%;
    margin: auto;

    & img {
        width: 100%;
    }

    .top-centered {
        font-size: 1.3em;
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .border-white {
        //border in the font
        text-shadow: -2px 0 #fff, 0 2px #fff, 2px 0 #fff, 0 -2px #fff;
    }

    /*MOBILE FIRST RESPONSIVE MEDIA QUERIES*/
    @media only screen and (min-width: 500px) {
        width: 80%;
    }

`;