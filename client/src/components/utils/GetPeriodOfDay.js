import React from 'react';
import { greetings } from '../../data/dataIllustrations';
import styled from 'styled-components';
import parse from 'html-react-parser';

export default function GetPeriodOfDay() {
    const getGreeting = () => {
        let name = "visitante da Babadoo";
        let hourNow = new Date().getHours();
        let res = {
            greeting: "",
            illustration: {
                img: "",
                color: "var(--mainDark)",
                alt: "",
            }
        };
        if (hourNow >= 0 && hourNow <= 5) {
            res.greeting = parse(`Boa Madrugada,<br />${name}!`);
            res.illustration.img = greetings.earlyHours.img;
            res.illustration.color = "var(--mainWhite)";
            res.illustration.alt = greetings.earlyHours.alt;
        } else if (hourNow > 5 && hourNow <= 12) {
            res.greeting = parse(`Bom Dia,<br /> ${name}!`);
            res.illustration.img = greetings.morning.img;
            res.illustration.alt = greetings.morning.alt;
        } else if (hourNow > 12 && hourNow <= 17) {
            res.greeting = `Boa Tarde, ${name}!`;
            res.illustration.img = greetings.afternoon.img;
            res.illustration.alt = greetings.afternoon.alt;
        } else {
            res.greeting = parse(`Boa Noite,<br /> ${name}!`);
            res.illustration.img = greetings.night.img;
            res.illustration.color = "var(--mainWhite)";
            res.illustration.alt = greetings.night.alt;
        }
        return res;
    }

    let greeting = getGreeting().greeting;
    let { img, alt, color } = getGreeting().illustration;

    return (
        <DivWrapper className="container">
            <img className="shadow-elevation" src={img} alt={alt} style={{color}} />
            <h2 className="text-main-container top-centered text-nowrap shadow-white"><strong>{greeting}</strong></h2>
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
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .shadow-white {
        text-shadow: 7px 2px 4px var(--mainWhite), -7px 2px 4px var(--mainWhite), -7px -5px 4px var(--mainWhite), -7px 5px 4px var(--mainWhite), -7px 5px 4px var(--mainWhite);
    }

    /*MOBILE FIRST RESPONSIVE MEDIA QUERIES*/
    @media only screen and (min-width: 500px) {
        width: 80%;
    }

`;