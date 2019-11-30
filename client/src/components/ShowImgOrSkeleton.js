import React, { Fragment } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import { CLIENT_URL } from "../config/clientUrl";
import PropTypes from 'prop-types';

ShowImgOrSkeleton.propTypes = {
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    setStatus: PropTypes.func.isRequired,
    status: PropTypes.bool,
    skeletonOpt: PropTypes.shape({
        variant: PropTypes.oneOf(['text', 'rect', 'circle']),
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        style: PropTypes.object
    }).isRequired
}

export default function ShowImgOrSkeleton({ id, url, setStatus, status, skeletonOpt }) {
    const imageUrl = `${CLIENT_URL}/api/${url}/photo/${id}`;
    const { variant, width, height, style } = skeletonOpt;

    return(
        <Fragment>
            <div style={{ display: status ? 'block' : 'none'}}>
                <Skeleton variant={variant} width={width} height={height} style={style } />
            </div>
            <div style={{ display: status ? 'none' : 'block'}}>
                <img
                    className="card-img-top"
                    src={imageUrl}
                    alt="product"
                    onLoad={() => setStatus(false)}
                />
            </div>
        </Fragment>
    );
}
