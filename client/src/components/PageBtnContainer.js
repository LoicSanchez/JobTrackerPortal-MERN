import { TfiAngleRight, TfiAngleLeft } from 'react-icons/tfi'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/PageBtnContainer'

const PageButtonContainer = () => {
	const { numOfPages, page, changePage } = useAppContext()

	const prevPage = () => {
		let newPage = page - 1
		if (newPage < 1) {
			// newPage = 1
			// alternative
			newPage = numOfPages
		}
		changePage(newPage)
	}
	const nextPage = () => {
		let newPage = page + 1
		if (newPage > numOfPages) {
			// newPage = numOfPages
			// alternative
			newPage = 1
		}
		changePage(newPage)
	}
	const pages = Array.from({ length: numOfPages }, (_, index) => {
		return index + 1
	})

	return (
		<Wrapper>
			<button className="prev-btn" onClick={prevPage}>
				<TfiAngleLeft />
				prev
			</button>

			<div className="btn-container">
				{pages.map((pageNumber) => {
					return (
						<button
							type="button"
							className={
								pageNumber === page ? 'pageBtn active' : 'pageBtn'
							}
							key={pageNumber}
							onClick={() => changePage(pageNumber)}
						>
							{pageNumber}
						</button>
					)
				})}
			</div>

			<button className="next-btn" onClick={nextPage}>
				next
				<TfiAngleRight />
			</button>
		</Wrapper>
	)
}

export default PageButtonContainer
