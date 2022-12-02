import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>

			<div className="container page">
				<div className="info">
					<h1>
						Track your <span>Job</span> Applications
					</h1>
					<p>
						We help people keep track of job applications, find better
						jobs and relieve the burden of daily job search management.
					</p>
					<p>
						No more stacks of paper, no more distributed notes. Everything
						is centralized, searchable, and you can access it anywhere you
						go.
					</p>
					<Link to="/register" className="btn btn-hero">
						Login/Register
					</Link>
				</div>
				<img src={main} alt="job hunt" className="img main-img" />
			</div>
		</Wrapper>
	)
}

export default Landing
