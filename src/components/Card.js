import React from 'react';
import './Card.css'

const Card = ({img, category, name, price, refer}) => {
    return(
        <div style={{zIndex: 30}} className="tc shadow-hover bg-white black dib br3 pa2 ma2 bw2 shadow-3">
            <div className="ma1">
                <img src={img} alt=""/>
            </div>
            <div>
                <h2>{name}</h2>
                <p>{price}</p>
                <div>
                    <button>comprar</button>
                </div>
            </div>
        </div>
    )
}

export default Card;