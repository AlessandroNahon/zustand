export type Product = {
	id: number
	name: string
	sku: string
	url?: string
}

export type LineItem = {
	quantity: number
	unitPrice: number
	totalPrice: number
} & Product

export type Quote = {
	id: string
	name: string
	lineItems: LineItem[] | []
	tax: number
	subtotal: number
	discounts: number
	total: number
	createdAt?: Date
	updatedAt?: Date
}

export type BuilderState = {
	quote: Quote
	quoteList: Quote[]
	createQuote: () => void
	addLineItem: (product: Product) => void
	removeLineItem: (id: number) => void
	updateItemQty: (qty: string, id: number) => void
	updateItemUnitPrice: (unitPrice: string, id: number) => void
	updateItemTotal: (id: number) => void
}
