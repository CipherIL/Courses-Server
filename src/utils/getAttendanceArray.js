const getAttendanceArray = (startDate,endDate,windows) => {
    let offset = 0;
    const msStartDate = startDate.getTime();
    const msEndDate = endDate.getTime();
    const days = windows.map(window=>window.day);
    const dates = [];
    while(msStartDate + offset < msEndDate){
        const date = new Date(msStartDate+offset);
        if(days.includes(date.getDay())){ //there is a window on this day
            const dateObj = {date:date,windows:[]};
            windows.forEach(window=>{
                if(window.day===date.getDay()) { //for every window on this day
                    dateObj.windows.push({
                        time:window.time,
                        attended: [],
                        notAttended: [],
                    })
                }
            })
            dates.push(dateObj);
        } 
        offset += 1000*60*60*24;
    }
    return dates;
}

module.exports = getAttendanceArray;