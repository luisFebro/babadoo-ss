import React from 'react';
import GetPeriodOfDay from '../../components/utils/GetPeriodOfDay';
import CheckWorkingHour from '../../components/utils/CheckWorkingHour';

export default function GreetingsAndWorkingHourMsg() {
    return (
        <h2 className="text-main-container mt-5 text-center">
            <section>
                <GetPeriodOfDay />
            </section>
            <section>
                <CheckWorkingHour />
            </section>
        </h2>
    );
}