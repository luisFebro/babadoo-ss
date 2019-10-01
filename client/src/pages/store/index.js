import React, { Fragment } from 'react';
import GreetingsAndWorkingHourMsg from './GreetingsAndWorkingHourMsg';
import WorkingHourTable from './WorkingHourTable';
import StoreMap from './StoreMap';

export default function Store() {
    return (
        <Fragment>
            <GreetingsAndWorkingHourMsg />
            <StoreMap />
            <WorkingHourTable />
        </Fragment>
    );
}