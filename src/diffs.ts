export function getDiff(prev: number[], curr: number[]) {
	console.log({ prev, curr });
	const addedNotes = curr.filter((n) => !prev.includes(n));
	const deletedNotes = prev.filter((n) => !curr.includes(n));
	return {
		add: addedNotes,
		delete: deletedNotes,
	};
}
export function applyDiff(orig: number[], diff: {
	add: number[];
	delete: number[];
}): number[] {
	let copy = orig.slice();
	copy.push(...diff.add);
	copy = copy.filter((n) => !diff.delete.includes(n));
	return copy;
}
