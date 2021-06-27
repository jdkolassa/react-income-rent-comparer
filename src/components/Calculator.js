import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [rate, setRate] = useState(9.50);
    const [hours, setHours] = useState(0);
    const [workMonth, setWorkMonth] = useState(0);
    const [monthlyPay, setMonthlyPay] = useState(0);
    const [bgColor, setBgColor] = useState(' ');

    let monthHours = (hours * 52) / 12;
    let calcHours = (workMonth * rate);

    const onButtonClick = (rate, hours) => {
        setWorkMonth(monthHours);
        if (workMonth > 0) {
            setMonthlyPay(calcHours);
        }

    }
    
     

    useEffect(() => {
        console.log("Current Hourly Rate :" + rate);
        console.log("Current Weekly Hours: " + hours);
        console.log("Work Month set to: " + workMonth);
    }, [rate, hours, workMonth])
    
    // TODO Set the background color based on how much money I can expect per month
    // ? Should this be set to trigger on monthlyPay being updated? 
    useEffect(() => {
        if (monthlyPay < 700) {
            setBgColor("critical");
        }
        else if ( monthlyPay > 700 && monthlyPay < 1050) {
            setBgColor("danger");
        }
        else if (monthlyPay > 1050 && monthlyPay < 1400) {
            setBgColor('stanch');
        }
        else if (monthlyPay > 1400 && monthlyPay < 1750) {
            setBgColor('treading');
        }
        else if (monthlyPay < 1750 && monthlyPay < 2000) {
            setBgColor('survive');
        }
        else if (monthlyPay > 2000) {
            setBgColor('thrive');
        }
        else if (isNaN(monthlyPay) || monthlyPay === undefined) {
            setBgColor('error');
        }
        else {
            setBgColor(' ');
        }
    }, [monthlyPay]);

    return (
       <div className="ui internally celled grid calc">
            <div className="centered row">
                <div className="four wide column">
                    <label>Enter Hourly Rate</label><br/>
                    <input type="text" className="input"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)} />
                </div>
                <div className="four wide column">
                    <label>Enter Weekly Hours</label><br/>
                    <input type="text" className="input"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)} />
                </div>
                <div className="four wide column">
                    <button className="ui button" onClick={onButtonClick}>Calculate</button>
                </div>
            </div>
            <div className="centered row">
                <div className="six wide column">
                   <h2>Total Monthly Pay</h2>
                   <p>Remember, this is pre-tax only</p>
                   <div className={`resultblock ${bgColor}`}>
                       <p style={{fontSize: "48px"}}>{monthlyPay.toFixed(2)}</p>
                   </div>
                </div>
            </div>
        </div>
    ) 
};

export default Calculator;