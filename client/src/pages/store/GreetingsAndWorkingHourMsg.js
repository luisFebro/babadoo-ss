import React from 'react';
import GetPeriodOfDay from '../../components/utils/GetPeriodOfDay';
import WorkingHourMsg from './WorkingHourMsg';

export default function GreetingsAndWorkingHourMsg() {
    return (
        <h2 className="text-main-container mt-5 text-center">
            <section>
                <GetPeriodOfDay />
            </section>
            <section>
                <WorkingHourMsg />
            </section>
        </h2>
    );
}