import React from 'react';
import { dataWorkingHour } from '../../components/utils/GetWorkingHour';

export default function CheckWorkingHour() {
     return (
        <div className="pt-5">
            <span>{dataWorkingHour[0]}</span>
        </div>
    );
}