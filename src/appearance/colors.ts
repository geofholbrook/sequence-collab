/**
 * get an rgb color that is derived deterministically from a string
 * more or less bright, using sin functions to get component values
 * @param name
 */
export function getColorFromString(name: string) {
	// arbitrary number
	const num = Array.from(name)
		.map((char, i) => (char.charCodeAt(0) % 26) * 2 ** Math.max(i, 6))
		.reduce((sum, c) => sum + c, 0);

	// little trick to get decent colors
	const radians = (num % 6283) * 0.001;
	const radiansToByte = (r: number) => Math.floor((Math.sin(r) * 0.5 + 0.5) * 256);
	const red = radiansToByte(radians);
	const green = radiansToByte(radians + (Math.PI * 2) / 3);
	const blue = radiansToByte(radians + (Math.PI * 4) / 3);

	return `rgb(${red},${green},${blue})`;
}

// console.log(getColorFromString('kick'))
// console.log(getColorFromString('snare'))
// console.log(getColorFromString('hihat'))
// console.log(getColorFromString('tablaalsdkjf'))
