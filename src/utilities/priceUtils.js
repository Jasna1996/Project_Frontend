


export const calculatePrice = (pricePerHour = {}, sport, startTime, endTime) => {
    const rate = pricePerHour[sport];
    if (!rate) {
        console.warn("pricePerHour is undefined for sport:", sport);
        return 0;
    }

    const to24Hour = (timeStr) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        return { hours, minutes };
    };
    const from = to24Hour(startTime);
    const to = to24Hour(endTime);

    const start = new Date(2000, 0, 1, from.hours, from.minutes);
    const end = new Date(2000, 0, 1, to.hours, to.minutes);

    const hours = Math.max((end - start) / (1000 * 60 * 60), 0); // duration in hours
    const total = hours * rate;

    console.log(`Sport: ${sport}, Rate/hr: ₹${rate}, Hours: ${hours}, Total: ₹${total}`);
    return total;
};
