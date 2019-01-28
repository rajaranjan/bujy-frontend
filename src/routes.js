import pages from './pages';

const {
    Home,
    Dashboard,
} = pages;

export const groups = [
    {
		group: 'home',
		isPublic: true,
		routes: [
			{
				title: 'Home',
				path: '/login',
				icon: 'home',
                component: Home,
                isExact: true,
                subRoutes: [],
				isPublic: true,
				visible: true,
				index: 1
            }
		]
    },
    {
		group: 'dashboard',
		isPublic: false,
		routes: [
			{
				title: 'Dashboard',
				path: '/dashboard',
				icon: 'dashboard',
                component: Dashboard,
                isExact: true,
                subRoutes: [],
				isPublic: false,
				visible: true,
				index: 1
            }
		]
	}
];

const joinFn = (acc = [], curr) => {
	return acc.concat(curr);
};

export const allRoutes = groups
	.map(function merge(group) {
		const { routes } = group;
		const subRoutes = routes.map(route => route.subRoutes).reduce(joinFn);
		return routes.concat(subRoutes);
	})
	.reduce(joinFn);

export const getGroups = () => groups;

export default {
	groups,
	allRoutes
};