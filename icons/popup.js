document.getElementById('calculateButton').addEventListener('click', () => {
    const input = document.getElementById('timeInput').value;
    const resultElement = document.getElementById('result');
    const [time1, operation, time2, unitPreference] = parseInput(input);

    if (operation === '-') {
        const minutesDiff = calculateDifference(time1, time2);
        let formattedResult;

        switch (unitPreference) {
            case 'M':
                // Output in minutes
                formattedResult = `${minutesDiff} minutes`;
                break;
            case 'H':
                // Output in hours, keeping up to two decimal places
                formattedResult = `${(minutesDiff / 60).toFixed(2)} hours`;
                break;
            default:
                // Output in the most appropriate format
                if (minutesDiff >= 60) {
                    const hours = Math.floor(minutesDiff / 60);
                    const minutes = minutesDiff % 60;
                    formattedResult = `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''}`;
                } else {
                    formattedResult = `${minutesDiff} minutes`;
                }
        }

        resultElement.textContent = `Result: ${formattedResult}`;
    } else {
        // Handle other operations or show an error/message
        resultElement.textContent = 'Only subtraction is implemented in this example.';
    }
});


function parseInput(input) {
    // Extract unit preference and remove it from the input
    const unitPreferenceMatch = input.match(/\?([MH])$/);
    const unitPreference = unitPreferenceMatch ? unitPreferenceMatch[1] : '';
    input = input.replace(/\?M|\?H$/, ''); // Remove unit preference from the actual input

    // Normalizing the input to ensure consistency
    const normalizedInput = input.toLowerCase().replace(" to ", "-").replace(/\s+/g, "");
    const regex = /(\d{1,2}:?\d{0,2}[ap]?m?)\s*([-+])\s*(\d{1,2}:?\d{0,2}[ap]?m?)/;
    const match = normalizedInput.match(regex);
    if (match) {
        return [...match.slice(1, 4), unitPreference]; // Add unitPreference as the fourth return value
    }
    return ['', '', '', unitPreference];
}



function timeToMinutes(time) {
    let [_, timePart, meridian] = time.match(/(\d{1,2}:?\d{0,2})([ap]?m?)/i);
    let [hours, minutes] = timePart.split(":").map(Number);
    if (isNaN(minutes)) minutes = 0; // Default minutes to 0 if not provided
    hours %= 12; // Convert "12" to "0" for both AM and PM calculations

    // Determine AM or PM based on current time if not specified
    if (!meridian) {
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const isPM = currentHours >= 12;
        meridian = isPM ? 'pm' : 'am';
    }

    hours += meridian.startsWith('p') ? 12 : 0;
    return hours * 60 + minutes;
}

function calculateDifference(time1, time2) {
    const minutes1 = timeToMinutes(time1);
    const minutes2 = timeToMinutes(time2);
    return Math.abs(minutes1 - minutes2);
}



// Adding event listener for the Help button
document.getElementById('helpButton').addEventListener('click', function() {
    var helpInfo = document.getElementById('helpInfo');
    if (helpInfo.style.display === "none") {
        helpInfo.style.display = "block";
    } else {
        helpInfo.style.display = "none";
    }
});