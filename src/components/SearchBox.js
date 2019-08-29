import React from 'react';

const SearchBox = ({searchChange}) => {
    return (
        <div>
            <div className="fixed">
                <input
                    style = {{width: '150%'}}
                    className="br2 ma2 pa3 ba b--light-red bg-near-white"
                    type="search"
                    placeholder="Qual acessório você procura?"
                    onChange={searchChange}
                />
            </div>
            <div>
                <img className="logoTweaks animated pulse" style={{animationDelay: '10s', animationIterationCount: '10', width: '170px', height: '170px'}} src="https://imgur.com/9GjtAiW.png"/>
            </div>
            <h1>Lingeries e Acessórios Eróticos</h1>
        </div>
    )
}

export default SearchBox;