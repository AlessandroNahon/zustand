import { LineItem } from './types'

import { products } from './api'

import removeIcon from './assets/trash.svg'
import { useQuote } from './store'
import { convertToCurrency } from './utils'

import Image from './Image'

export default function App() {
	const quote = useQuote((state) => state)
	const createQuote = useQuote((state) => state.createQuote)
	const addLineItem = useQuote((state) => state.addLineItem)
	const removeLineItem = useQuote((state) => state.removeLineItem)
	const updateItemQty = useQuote((state) => state.updateItemQty)
	const updateItemUnitPrice = useQuote((state) => state.updateItemUnitPrice)
	const updateItemTotal = useQuote((state) => state.updateItemTotal)
	const updateSubTotal = useQuote((state) => state.updateSubTotal)
	const updateDiscount = useQuote((state) => state.updateDiscount)
	const updateTax = useQuote((state) => state.updateTax)
	const updateTotal = useQuote((state) => state.updateTotal)

	return (
		<main className='flex fixed h-screen w-screen bg-indigo-950 text-white'>
			<section className='w-3/6 p-5 overflow-y-scroll'>
				<h2 className='pb-10 text-2xl'>Products</h2>
				<div className='grid lg:grid-cols-3 gap-0 justify-items-stretch auto-rows-max'>
					{products.map((product) => (
						<button
							key={product.sku}
							onClick={() => {
								if (quote.id === '') {
									createQuote()
									addLineItem(product)
								} else {
									addLineItem(product)
								}
							}}
							className='m-5 rounded'
						>
							<div>
								<Image
									className='w-full aspect-square bg-center bg-cover bg-no-repeat rounded-t'
									image={product.url}
								/>
								<div className='text-left p-2'>
									<h3 className='font-semibold'>{product.name}</h3>
									<p className='text-sm'>SKU: {product.sku}</p>
								</div>
							</div>
						</button>
					))}
				</div>
			</section>
			<section className='w-3/6 p-5 overflow-y-scroll'>
				<h2 className='pb-10 text-2xl'>Quote Builder</h2>
				<div className='py-5 pr-5'>
					{quote.lineItems?.map((li: LineItem, idx: number) => (
						<div
							key={li.sku}
							className='mb-5 p-5 relative bg-indigo-600 rounded-md flex'
						>
							<Image
								className='absolute right-5 w-10 aspect-square cursor-pointer bg-left bg-contain bg-no-repeat'
								image={removeIcon}
								onClick={() => {
									removeLineItem(li.id)
									updateSubTotal()
									updateTotal()
									if (idx === 0 && quote.lineItems.length < 2) {
										updateDiscount(0)
										updateTax(0)
									}
								}}
							/>
							<div>
								<Image
									className='w-40 aspect-video bg-left bg-contain bg-no-repeat'
									image={li.url}
								/>
								<div className='text-left pb-2'>
									<h3 className='font-semibold'>{li.name}</h3>
									<p className='text-sm'>SKU: {li.sku}</p>
								</div>
							</div>
							<div className='flex flex-col'>
								<span>
									<label className='m-0 p-0 relative -bottom-1'>Qty:</label>
									<input
										type='text'
										onChange={(e) => {
											updateItemQty(e.target.value, li.id)
											updateItemTotal(li.id)
											updateSubTotal()
											updateTotal()
										}}
										value={li.quantity > 0 ? li.quantity : ''}
										className='bg-transparent border-b-2 ml-1 w-3/6'
									/>
								</span>
								<span>
									<label className='m-0 p-0 relative -bottom-1'>
										Unit Price:
									</label>
									<input
										type='text'
										onChange={(e) => {
											updateItemUnitPrice(e.target.value, li.id)
											updateItemTotal(li.id)
											updateSubTotal()
											updateTotal()
										}}
										value={li.unitPrice > 0 ? li.unitPrice : ''}
										className='bg-transparent border-b-2 ml-1 w-3/6'
									/>
								</span>

								<p className='mt-5'>
									Unit Total: {convertToCurrency(li.totalPrice, 'CAD')}
								</p>
							</div>
						</div>
					))}
				</div>
				<div>
					<p className='mb-5'>
						{' '}
						Subtotal: {convertToCurrency(quote.subtotal, 'CAD')}
					</p>
					<div>
						<label className='m-0 p-0 relative -bottom-1'>Discount:</label>
						<input
							type='text'
							name='discount'
							onChange={(e) => {
								updateDiscount(Number(e.target.value))
								updateTotal()
							}}
							value={quote.discount > 0 ? quote.discount : ''}
							className='bg-transparent border-b-2 ml-1'
						/>
					</div>
					<div>
						<label className='m-0 p-0 relative -bottom-1'>Tax:</label>
						<input
							type='text'
							name='tax'
							onChange={(e) => {
								updateTax(Number(e.target.value))
								updateTotal()
							}}
							value={quote.tax > 0 ? quote.tax : ''}
							className='bg-transparent border-b-2 ml-1'
						/>
					</div>

					<div className='w-full'></div>
					<p className='mt-5'>Total: {convertToCurrency(quote.total, 'CAD')}</p>
				</div>
			</section>
		</main>
	)
}
