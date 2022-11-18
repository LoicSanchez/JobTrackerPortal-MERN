import links from '../utils/links'
import { NavLink } from 'react-router-dom'

const NavLinks = ({ toggleSidebarFunction }) => {
	return (
		<div className="nav-links">
			{links.map((link) => {
				const { text, path, id, icon } = link

				return (
					<NavLink
						to={path}
						end
						key={id}
						onClick={toggleSidebarFunction}
						className={({ isActive }) =>
							isActive ? 'nav-link active' : 'nav-link'
						}
					>
						<span className="icon">{icon}</span>
						{text}
					</NavLink>
				)
			})}
		</div>
	)
}

export default NavLinks
