"use client"
import { useState, useEffect } from "react";


function CountDown(props) 
{
    const[endTime, setEndTime] = useState(0);
    const[counter, setCounter] = useState([0,0,0,0]);

    function convertSeconds(seconds) 
    {
        if (seconds < 0) 
        {
            return [0,0,0,0];
        }
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return [days, hours, minutes, remainingSeconds];
    }



    setTimeout(()=> {
        var seconds =  convertSeconds(endTime-(Date.now()/1000));
        setCounter(seconds);
    }, 1000)


    useEffect(()=> 
    {
        setEndTime(1748785022); 
    }, []);
    
    return (
        <div className="">
            
        <div className="flex" style={{justifyContent:"space-around"}}>
            <div className="border border-1 rounded-lg border-gray-200 mx-2  px-3 w-28 py-2">
                <div className="text-center font-bold text-2xl">{counter[0]}</div>
                <div className="text-center">Days</div>
            </div>

            <div className="border border-1 rounded-lg border-gray-200 mx-2  px-3 w-28 py-2">
                <div className="text-center font-bold text-2xl">{counter[1]}</div>
                <div className="text-center">Hours</div>
            </div>

            <div className="border border-1 rounded-lg border-gray-200 mx-2  px-3 w-28 py-2">
                <div className="text-center font-bold text-2xl">{counter[2]}</div>
                <div className="text-center">Minutes</div>
            </div>

            <div className="border border-1 rounded-lg border-gray-200 mx-2  px-3 w-28 py-2">
                <div className="text-center font-bold text-2xl">{counter[3]}</div>
                <div className="text-center">Seconds</div>
            </div>
                                 
        </div>
      </div>
    );
}

export default CountDown;