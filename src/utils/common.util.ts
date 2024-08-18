import SHA256 from 'crypto-js/sha256';
import { enc } from 'crypto-js';

export const hashPassword = (password: string): string => {
    return SHA256(password).toString(enc.Hex);
}

export const calculateCamSizeBasedOnImageWidth = (imageWidth: number): number => {
    return imageWidth / 26;
};

// Convert from percentage string to 0.1 to 1.0 scale
export const percentageToScale = (value: string): number => {
    // Convert percentage to decimal (e.g., "35.91%" -> 0.3591)
    const decimalValue = parseFloat(value) / 100;
    // Map decimal value to the range of 0.1 to 1.0
    const scaledValue = decimalValue * 0.9 + 0.1;
    return scaledValue;
}

// Convert from 0.1 to 1.0 scale to percentage string
export const scaleToPercentage = (value: number): string => {
    // Map value back to 0% to 100% range
    const decimalValue = (value - 0.1) / 0.9;
    // Convert to percentage and format as string with "%" suffix
    const percentageString = (decimalValue * 100).toFixed(6) + '%';
    return percentageString;
}

// // Example usage:
// const xCoordinate = "35.9109439550095%";
// const yCoordinate = "36.75164747764981%";

// const xScaled = percentageToScale(xCoordinate);
// const yScaled = percentageToScale(yCoordinate);

// console.log(`X Coordinate on scale: ${xScaled}`); // X Coordinate on scale: 0.4231984955950855
// console.log(`Y Coordinate on scale: ${yScaled}`); // Y Coordinate on scale: 0.43076482729884835

// // Convert back to percentage string
// const xPercentage = scaleToPercentage(xScaled);
// const yPercentage = scaleToPercentage(yScaled);

// console.log(`X Coordinate as percentage: ${xPercentage}`); // X Coordinate as percentage: 35.910944%
// console.log(`Y Coordinate as percentage: ${yPercentage}`); // Y Coordinate as percentage: 36.751647%
