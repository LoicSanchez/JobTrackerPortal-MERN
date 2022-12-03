import { useAppContext } from '../context/appContext'
import StatsItem from './StatsItem'
import { TfiBriefcase, TfiCalendar, TfiFaceSad } from 'react-icons/tfi'
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {
	const { stats } = useAppContext()
	const defaultStats = [
		{
			title: 'pending applications',
			count: stats.pending || 0,
			icon: <TfiBriefcase />,
			color: '#E9CC2C',
			bcg: '#fcefc7',
		},
		{
			title: 'interviews scheduled',
			count: stats.interview || 0,
			icon: <TfiCalendar />,
			color: '#3D64F4',
			bcg: '#e0e8f9',
		},
		{
			title: 'jobs declined',
			count: stats.declined || 0,
			icon: <TfiFaceSad />,
			color: '#D03A3A',
			bcg: '#ffeeee',
		},
	]
	return (
		<Wrapper>
			{defaultStats.map((item, index) => {
				return <StatsItem key={index} {...item} />
			})}
		</Wrapper>
	)
}

export default StatsContainer
