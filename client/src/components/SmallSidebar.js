import Wrapper from '../assets/wrappers/SmallSidebar'
import { TfiClose } from 'react-icons/tfi'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import NavLinks from './NavLinks'

const SmallSidebar = () => {
	const { showSidebar, toggleSidebar } = useAppContext()

	return (
		<Wrapper>
			<div
				className={
					showSidebar
						? 'sidebar-container show-sidebar'
						: 'sidebar-container'
				}
			>
				<div className="content">
					<button className="close-btn" onClick={toggleSidebar}>
						<TfiClose />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks toggleSidebarFunction={toggleSidebar}></NavLinks>
				</div>
			</div>
		</Wrapper>
	)
}

export default SmallSidebar
