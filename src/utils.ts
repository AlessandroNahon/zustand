export function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

export function convertToCurrency(ammount: number, currency: string) {
	if (!ammount) return

	return ammount.toLocaleString('en-US', { style: 'currency', currency })
}

export function isEmpty(obj: object) {
	return Object.keys(obj).length === 0
}
