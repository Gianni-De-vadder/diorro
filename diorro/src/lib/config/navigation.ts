// src/lib/config/navigation.js
export const navLinks = [
	{ href: '/', label: 'Accueil', showInNav: true },
	{ href: '/realisations', label: 'Réalisations', showInNav: true },
	{ href: '/services', label: 'Services', showInNav: true },
	{ href: '/contact', label: 'Contact', showInNav: false }
];

export const visibleNavLinks = navLinks.filter((link) => link.showInNav);
