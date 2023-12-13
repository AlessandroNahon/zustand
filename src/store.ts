import { create } from 'zustand'
import { LineItem, Product, QuoteState } from './types'
import { uuidv4 } from './utils'

export const useQuote = create<QuoteState>((set) => ({
	id: '',
	name: '',
	lineItems: [],
	tax: 0,
	subtotal: 0,
	discount: 0,
	total: 0,
	createQuote: () => set(() => ({ id: uuidv4() })),
	addLineItem: (product: Product) =>
		set((state) => {
			if (
				state.id === '' &&
				state.lineItems?.length > 0 &&
				state.lineItems?.some((p: LineItem) => p.id === product.id)
			) {
				return state
			}

			return {
				lineItems: [
					...state.lineItems,
					{ ...product, quantity: 0, unitPrice: 0, totalPrice: 0 },
				],
			}
		}),
	removeLineItem: (id: number) =>
		set((state) => ({
			lineItems: state.lineItems.filter((p: LineItem) => p.id !== id),
		})),
	updateItemQty: (qty: string, id: number) =>
		set((state) => ({
			lineItems: state.lineItems.map((li: LineItem) => {
				if (li.id === id) {
					return { ...li, quantity: Number(qty) }
				} else {
					return li
				}
			}),
		})),
	updateItemUnitPrice: (unitPrice: string, id: number) =>
		set((state) => ({
			lineItems: state.lineItems.map((li: LineItem) => {
				if (li.id === id) {
					return { ...li, unitPrice: Number(unitPrice) }
				} else {
					return li
				}
			}),
		})),
	updateItemTotal: (id: number) =>
		set((state) => ({
			lineItems: state.lineItems.map((li: LineItem) => {
				if (li.id === id) {
					return {
						...li,
						totalPrice: Number(li.unitPrice) * Number(li.quantity),
					}
				} else {
					return li
				}
			}),
		})),
	updateSubTotal: () =>
		set((state) => ({
			subtotal: state.lineItems
				?.map((li: LineItem) => li.totalPrice)
				.reduce((partialSum: number, a: number) => partialSum + a, 0),
		})),
	updateDiscount: (discount) => set(() => ({ discount })),
	updateTax: (tax) => set(() => ({ tax })),
	updateTotal: () =>
		set((state) => ({
			total: Number(state.subtotal - state.discount + state.tax),
		})),
}))
