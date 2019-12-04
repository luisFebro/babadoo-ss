import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShowImgOrSkeleton from '../../components/ShowImgOrSkeleton';

ProductImgGallery.propTypes = {
    _id: PropTypes.string,
    title: PropTypes.string
}

export default function ProductImgGallery({ _id, title }) {
    const [showSkeleton, setShowSkeleton] = useState(true);

    return (
        <div className="d-flex justify-content-center align-items-center col-12 mx-auto col-md-6 my-3 text-title">
            <ShowImgOrSkeleton
                id={_id}
                url="product"
                setStatus={setShowSkeleton}
                status={showSkeleton}
                skeletonOpt={{
                    variant: 'rect',
                    width: 400,
                    height: 400,
                }}
                imgOpt={{
                    className: "img-fluid shadow-elevation",
                    alt: title
                }}
            />
        </div>
    );
}

/*
<img src={image} className="img-fluid shadow-elevation" alt="product" />
 */