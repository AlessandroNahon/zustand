import { LineItem } from './types'

import { products } from './api'

import removeIcon from './assets/trash.svg'
import { useStore } from './store'
import { convertToCurrency, isEmpty } from './utils'

import Image from './Image'

export default function App() {
	const quote = useStore((state) => state.quote)
	const createQuote = useStore((state) => state.createQuote)
	const addLineItem = useStore((state) => state.addLineItem)
	const removeLineItem = useStore((state) => state.removeLineItem)
	const updateItemQty = useStore((state) => state.updateItemQty)
	const updateItemUnitPrice = useStore((state) => state.updateItemUnitPrice)
	const updateItemTotal = useStore((state) => state.updateItemTotal)

	return (
		<main className='flex fixed h-screen w-screen bg-indigo-950 text-white'>
			<section className='w-3/6 p-5 overflow-y-scroll'>
				<h2 className='pb-10 text-2xl'>Products</h2>
				<div className='grid lg:grid-cols-3 gap-0 justify-items-stretch auto-rows-max'>
					{products.map((product) => (
						<button
							key={product.sku}
							onClick={() => {
								if (isEmpty(quote)) {
									createQuote()
									addLineItem(product)
								}
								addLineItem(product)
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
					{quote.lineItems?.map((li: LineItem) => (
						<div
							key={li.sku}
							className='mb-5 p-5 relative bg-indigo-600 rounded-md flex'
						>
							<Image
								className='absolute right-5 w-10 aspect-square cursor-pointer bg-left bg-contain bg-no-repeat'
								image={removeIcon}
								onClick={() => removeLineItem(li.id)}
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
			</section>
		</main>
	)
}
