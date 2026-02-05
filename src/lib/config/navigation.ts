export interface NavLink {
	href: string;
	label: string;
	showInNav: boolean;
}

export const navLinks = [
	{ href: '/', label: 'Accueil', showInNav: true },
	{ href: '/realisations', label: 'Réalisations', showInNav: true },
	{ href: '/services', label: 'Services', showInNav: true },
	{ href: '/contact', label: 'Contact', showInNav: false }
] as const satisfies readonly NavLink[];

export const visibleNavLinks = navLinks.filter((link) => link.showInNav);

export type NavRoute = (typeof navLinks)[number]['href'];
