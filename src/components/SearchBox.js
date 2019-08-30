import React from 'react';
import LogoSlogon from './LogoSlogon';

const SearchBox = ({searchChange}) => {
    return (
        <div style= {{display: 'inline-block'}}>
            <div>
                <input
                    style = {{marginRight: 'auto', marginLeft: '0px', width: '70%', position: 'fixed', zIndex:40}}
                    className="br2 ma2 pa3 ba b--light-red bg-near-white"
                    type="search"
                    placeholder="O que você procura?"
                    onChange={searchChange}
                />
            </div>
            <LogoSlogon />
        </div>
    )
}

export default SearchBox;