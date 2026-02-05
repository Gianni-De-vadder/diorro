<script lang="ts">
	import { page } from '$app/state';
	import { visibleNavLinks } from '$lib/config/navigation';
	import Button from '$lib/components/Button.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import LogoDiorro from '$lib/components/LogoDiorro.svelte';

	let mobileMenuOpen = $state(false);

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMenu() {
		mobileMenuOpen = false;
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && mobileMenuOpen) {
			closeMenu();
		}
	}

	function isActive(href: string): boolean {
		if (href === '/') {
			return page.url.pathname === '/';
		}
		return page.url.pathname.startsWith(href);
	}

	$effect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<header>
	<div class="container">
		<a href="/" class="logo" aria-label="Accueil">
			<LogoDiorro width="120" height="auto" />
		</a>

		<nav class="desktop-nav" aria-label="Navigation principale">
			<ul>
				{#each visibleNavLinks as link (link.href)}
					<li>
						<a href={link.href} class:active={isActive(link.href)}>
							{link.label.toUpperCase()}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="header-actions">
			<ThemeToggle />

			<Button href="/contact" variant="primary" size="medium">Nous contacter</Button>

			<button
				class="mobile-toggle"
				onclick={toggleMenu}
				aria-expanded={mobileMenuOpen}
				aria-label="Menu de navigation"
				aria-controls="mobile-menu"
				type="button"
			>
				<span class="hamburger"></span>
			</button>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div
			class="mobile-menu-overlay"
			onclick={closeMenu}
			onkeydown={(e) => e.key === 'Enter' && closeMenu()}
			role="button"
			tabindex="-1"
			aria-label="Fermer le menu"
		></div>

		<div class="mobile-menu" id="mobile-menu">
			<nav aria-label="Navigation mobile">
				<ul>
					{#each visibleNavLinks as link (link.href)}
						<li>
							<a href={link.href} class:active={isActive(link.href)} onclick={closeMenu}>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>

				<div class="mobile-cta">
					<Button href="/contact" variant="primary" size="medium" fullWidth>Nous contacter</Button>
				</div>
			</nav>
		</div>
	{/if}
</header>

<style>
	header {
		background-color: color-mix(in srgb, var(--color-bg-primary) 95%, transparent);
		border-bottom: 1px solid var(--primitive-gray-50);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		backdrop-filter: blur(8px);
	}

	@media (prefers-reduced-motion: no-preference) {
		header {
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease;
		}
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-md) var(--space-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
	}

	.logo {
		text-decoration: none;
		color: var(--color-text-primary);
		font-weight: var(--font-weight-bold);
		font-size: var(--text-lg);
		flex-shrink: 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.logo {
			transition: color 0.2s ease;
		}
	}

	.logo:hover {
		color: var(--color-interactive);
	}

	.desktop-nav {
		flex: 1;
		display: flex;
		justify-content: center;
	}

	.desktop-nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		gap: var(--space-lg);
		align-items: center;
	}

	.desktop-nav li {
		margin: 0;
	}

	.desktop-nav a {
		text-decoration: none;
		color: var(--color-text-primary);
		font-weight: var(--font-weight-medium);
		font-size: var(--text-base);
		padding: var(--space-xs) var(--space-sm);
		border-radius: 4px;
		position: relative;
		white-space: nowrap;
	}

	@media (prefers-reduced-motion: no-preference) {
		.desktop-nav a {
			transition: all 0.2s ease;
		}
	}

	.desktop-nav a:hover {
		color: var(--color-interactive);
		background-color: var(--color-bg-secondary);
	}

	.desktop-nav a.active {
		color: var(--color-interactive);
	}

	.desktop-nav a.active::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: var(--space-sm);
		right: var(--space-sm);
		height: 2px;
		background-color: var(--color-interactive);
		border-radius: 2px;
	}

	.mobile-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: var(--space-xs);
		position: relative;
		width: 44px;
		height: 44px;
		border-radius: 4px;
		flex-shrink: 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.mobile-toggle {
			transition: background-color 0.2s ease;
		}
	}

	.mobile-toggle:hover {
		background-color: var(--color-bg-secondary);
	}

	.mobile-toggle:focus-visible {
		outline: 2px solid var(--color-interactive);
		outline-offset: 2px;
	}

	.hamburger {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 24px;
		height: 2px;
		background-color: var(--color-text-primary);
		border-radius: 2px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.hamburger,
		.hamburger::before,
		.hamburger::after {
			transition: all 0.3s ease;
		}
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		left: 0;
		width: 24px;
		height: 2px;
		background-color: var(--color-text-primary);
		border-radius: 2px;
	}

	.hamburger::before {
		top: -8px;
	}

	.hamburger::after {
		bottom: -8px;
	}

	.mobile-toggle[aria-expanded='true'] .hamburger {
		background-color: transparent;
	}

	.mobile-toggle[aria-expanded='true'] .hamburger::before {
		transform: rotate(45deg);
		top: 0;
	}

	.mobile-toggle[aria-expanded='true'] .hamburger::after {
		transform: rotate(-45deg);
		bottom: 0;
	}

	.mobile-menu-overlay {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: color-mix(in srgb, var(--primitive-charcoal) 50%, transparent);
		z-index: 98;
		cursor: pointer;
	}

	.mobile-menu {
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background-color: var(--color-bg-primary);
		border-bottom: 1px solid var(--primitive-gray-50);
		box-shadow: 0 4px 6px color-mix(in srgb, var(--primitive-charcoal) 10%, transparent);
		z-index: 99;
	}

	.mobile-menu nav {
		padding: var(--space-md) var(--space-lg);
	}

	.mobile-menu ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.mobile-menu li {
		margin: 0;
	}

	.mobile-menu a {
		display: block;
		text-decoration: none;
		color: var(--color-text-primary);
		font-weight: var(--font-weight-medium);
		padding: var(--space-sm) var(--space-md);
		border-radius: 4px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.mobile-menu a {
			transition: all 0.2s ease;
		}
	}

	.mobile-menu a:hover {
		background-color: var(--color-bg-secondary);
		color: var(--color-interactive);
	}

	.mobile-menu a.active {
		background-color: var(--color-bg-secondary);
		color: var(--color-interactive);
		font-weight: var(--font-weight-bold);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		flex-shrink: 0;
	}

	.mobile-cta {
		margin-top: var(--space-md);
		padding: 0 var(--space-md);
	}

	@media (max-width: 768px) {
		.desktop-nav {
			display: none;
		}

		.header-actions :global(.btn) {
			display: none;
		}

		.mobile-toggle {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.mobile-menu-overlay,
		.mobile-menu {
			display: block;
		}

		.header-actions {
			gap: var(--space-sm);
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: var(--space-sm) var(--space-md);
		}

		.logo {
			font-size: var(--text-base);
		}
	}
</style>
