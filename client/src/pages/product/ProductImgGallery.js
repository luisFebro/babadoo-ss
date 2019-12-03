import React from 'react';
import PropTypes from 'prop-types';
import ShowImgOrSkeleton from '../../components/ShowImgOrSkeleton';

ProductImgGallery.propTypes = {
    _id: PropTypes.string.isRequired,
}

export default function ProductImgGallery({ _id }) {
    return (
        <div className="d-flex justify-content-center align-items-center col-12 mx-auto col-md-6 my-3 text-title">
            IMAGES GO HERE
        </div>
    );
}

/*
<img src={image} className="img-fluid shadow-elevation" alt="product" />
 */