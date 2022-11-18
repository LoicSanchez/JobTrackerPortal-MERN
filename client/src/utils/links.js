import { TfiStatsUp, TfiDashboard, TfiPlus, TfiPanel } from 'react-icons/tfi'

const links = [
	{
		id: 1,
		text: 'stats',
		path: '/',
		icon: <TfiStatsUp />,
	},
	{
		id: 2,
		text: 'all jobs',
		path: 'all-jobs',
		icon: <TfiDashboard />,
	},
	{
		id: 3,
		text: 'add job',
		path: 'add-job',
		icon: <TfiPlus />,
	},
	{
		id: 4,
		text: 'profile',
		path: 'profile',
		icon: <TfiPanel />,
	},
]

export default links
