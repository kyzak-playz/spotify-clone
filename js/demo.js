const secondsToMinutes = (seconds)=> {
    if (isNaN(seconds) || seconds < 0 ){
        return "Invalid input";
    } 

    const mintues = Math.floor(seconds/60);
    const remainingSeconds = Math.floor(seconds%60);

    const formttedMinutes = String(mintues).padStart(2,"0");
    const formattedSeconds = String(remainingSeconds).padStart(2,"0");
    
    return `${formttedMinutes}:${formattedSeconds}`

}

// Example usage:
const totalSeconds = 193.854694; // Replace with your desired number of seconds
const formattedTime = secondsToMinutes(totalSeconds);
console.log(`Formatted time: ${formattedTime}`); // Output: "03:13"