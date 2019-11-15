import React from 'react';
import PropTypes from 'prop-types';

DashSectionTitle.propTypes = {
    title: PropTypes.string.isRequired
};

export default function DashSectionTitle({ title }) {
    return (
        <div style={{ width: '100%' }}>
            <h2
                className="text-title text-center mb-5 mt-1 py-2 py-md-5"
                style={{ color: 'var(--mainWhite)', background: 'linear-gradient(to right, #333333, #dd1818)' }}
            >
                {title}
            </h2>
        </div>
    );
}
