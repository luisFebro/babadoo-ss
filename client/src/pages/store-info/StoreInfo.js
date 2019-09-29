import React, { Fragment } from 'react';
import WorkingHour from './WorkingHour';
import StoreMap from './StoreMap';

export default function StoreInfo() {
    return (
        <Fragment>
            <WorkingHour />
            <StoreMap />
        </Fragment>
    );
}