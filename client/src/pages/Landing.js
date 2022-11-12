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
						Job <span>Tracking</span> App
					</h1>
					<p>
						Before they sold out letterpress vexillologist adaptogen
						mumblecore crucifix. Semiotics selfies bitters listicle. Twee
						next level 8-bit, sus edison bulb vegan blog photo booth synth
						fit JOMO 90's neutra cardigan fixie. Dreamcatcher locavore
						distillery, put a bird on it kickstarter activated charcoal
						banjo vibecession cliche 8-bit hella.
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
