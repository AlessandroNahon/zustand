import emptyImage from './assets/picture.svg'

type Props = {
	image: string | undefined
	className?: string
	onClick?: () => void
}

export default function Image({ image, className, onClick }: Props) {
	return (
		<div
			onClick={onClick}
			className={className}
			style={{ backgroundImage: `url(${image ?? emptyImage})` }}
		/>
	)
}
