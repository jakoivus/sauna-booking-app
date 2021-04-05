import React, { useState } from 'react';
import Calendar from 'react-calendar';



function Results() {
    // set states of calendar date
    const [calDate, setCalDate] = useState(new Date())

    function onChange (calDate) {
        setCalDate(calDate)
        let userResults =[]
    
        const filteredResults = userResults.filter(result => {
            const newResultFormat = new Date(result.created_at).toLocaleString().split(",")[0]
            const newCalDateFormat = calDate.toLocaleString().split(",")[0]
            return newResultFormat === newCalDateFormat
        })
    }   

    // function onChange (calDate) {
        
    //     setCalDate(calDate)
    // }

    return (
        <div className="result-calendar">
            <Calendar onChange={onChange} value={calDate} />
        </div>
    )
}

export default Results