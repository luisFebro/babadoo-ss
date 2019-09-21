import React from 'react';

export default function IconButton({ app }) {
    const { img, href, alt, color, title, name } = app;

    return (
        <a href={href}
           className="btn login-btn"
           style={{ backgroundColor: color, margin: 5, display: "block" }}
           title={title}
        >
            <img src={img} alt={alt} className="btn-icon" />
            <span className="btn-txt">Entrar com {name.toUpperCase()}</span>
        </a>
    );
}