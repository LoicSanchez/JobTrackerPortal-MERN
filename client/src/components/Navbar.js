import { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import { TfiAlignLeft, TfiArrowCircleDown, TfiUser } from 'react-icons/tfi'

const Navbar = () => {
	const { user, toggleSidebar, logoutUser } = useAppContext()
	const [showLogout, setShowLogout] = useState(false)

	return (
		<Wrapper>
			<div className="nav-center">
				<button
					type="button"
					className="toggle-btn"
					onClick={toggleSidebar}
				>
					<TfiAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className="logo-text">dashboard</h3>
				</div>
				<div className="btn-container">
					<button
						type="button"
						className="btn"
						onClick={() => setShowLogout(!showLogout)}
					>
						<TfiUser />
						{user?.name}
						<TfiArrowCircleDown />
					</button>
					<div
						className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}
					>
						<button
							type="button"
							onClick={logoutUser}
							className="dropdown-btn"
						>
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}

export default Navbar
