import { create } from 'zustand'
import { BuilderState, LineItem, Product, Quote } from './types'
import { isEmpty, uuidv4 } from './utils'

const quoteTemplate = {
	id: uuidv4(),
	name: '',
	lineItems: [],
	tax: 0,
	subtotal: 0,
	discounts: 0,
	total: 0,
}

export const useStore = create<BuilderState>((set) => ({
	quote: {} as Quote,
	quoteList: [],
	createQuote: () =>
		set(() => ({
			quote: quoteTemplate,
		})),
	addLineItem: (product: Product) =>
		set((state) => {
			const quote = state.quote
			const lineItems = quote?.lineItems ?? []

			if (
				!isEmpty(quote) &&
				quote?.lineItems?.length > 0 &&
				quote?.lineItems?.some((p: LineItem) => p.id === product.id)
			) {
				return state
			}

			const updatedLineItems: LineItem[] = [
				...lineItems,
				{ ...product, quantity: 0, unitPrice: 0, totalPrice: 0 },
			]
			return { ...state, quote: { ...quote, lineItems: updatedLineItems } }
		}),
	removeLineItem: (id: number) =>
		set((state) => ({
			...state,
			quote: {
				...state.quote,
				lineItems: state.quote?.lineItems.filter((p: LineItem) => p.id !== id),
			},
		})),
	updateItemQty: (qty: string, id: number) =>
		set((state) => {
			const updatedLineItems = state.quote?.lineItems.map((li: LineItem) => {
				if (li.id === id) {
					return { ...li, quantity: Number(qty) }
				} else {
					return li
				}
			})

			return {
				...state,
				quote: { ...state.quote, lineItems: updatedLineItems },
			}
		}),
	updateItemUnitPrice: (unitPrice: string, id: number) =>
		set((state) => {
			const updatedLineItems = state.quote?.lineItems.map((li: LineItem) => {
				if (li.id === id) {
					return { ...li, unitPrice: Number(unitPrice) }
				} else {
					return li
				}
			})

			return {
				...state,
				quote: { ...state.quote, lineItems: updatedLineItems },
			}
		}),
	updateItemTotal: (id: number) =>
		set((state) => {
			const updatedLineItems = state.quote?.lineItems.map((li: LineItem) => {
				if (li.id === id) {
					return {
						...li,
						totalPrice: Number(li.unitPrice) * Number(li.quantity),
					}
				} else {
					return li
				}
			})

			return {
				...state,
				quote: { ...state.quote, lineItems: updatedLineItems },
			}
		}),
}))
