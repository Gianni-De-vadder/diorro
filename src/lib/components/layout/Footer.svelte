<script lang="ts">
	import { navLinks } from '$lib/config/navigation';

	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ href: 'https://linkedin.com', label: 'LinkedIn', icon: 'linkedin' },
		{ href: 'https://github.com', label: 'GitHub', icon: 'github' },
		{ href: 'mailto:contact@diorro.fr', label: 'Email', icon: 'email' }
	];
</script>

<footer>
	<div class="container">
		<div class="footer-content">
			<div class="footer-section footer-brand">
				<a href="/" class="footer-logo">
					<span class="logo-text">Diorro</span>
				</a>
				<p class="footer-tagline">
					Création de sites web sur mesure et solutions digitales innovantes.
				</p>
			</div>

			<div class="footer-section">
				<h3>Navigation</h3>
				<ul class="footer-links">
					{#each navLinks as link (link.href)}
						<li>
							<a href={link.href}>{link.label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="footer-section">
				<h3>Contact</h3>
				<ul class="footer-links">
					<li>
						<a href="mailto:contact@diorro.fr">contact@diorro.fr</a>
					</li>
					<li>
						<a href="tel:+33123456789">+33 1 23 45 67 89</a>
					</li>
					<li>
						<span>Lille, France</span>
					</li>
				</ul>
			</div>

			<div class="footer-section">
				<h3>Suivez-nous</h3>
				<ul class="social-links">
					{#each socialLinks as social (social.href)}
						<li>
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.label}
							>
								{#if social.icon === 'linkedin'}
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
										></path>
										<rect x="2" y="9" width="4" height="12"></rect>
										<circle cx="4" cy="4" r="2"></circle>
									</svg>
								{:else if social.icon === 'github'}
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
										></path>
									</svg>
								{:else if social.icon === 'email'}
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
										></path>
										<polyline points="22,6 12,13 2,6"></polyline>
									</svg>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="footer-bottom">
			<p class="copyright">
				© {currentYear} Diorro. Tous droits réservés.
			</p>
			<div class="footer-legal">
				<a href="/mentions-legales">Mentions légales</a>
				<span class="separator">•</span>
				<a href="/confidentialite">Confidentialité</a>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--color-bg-secondary);
		border-top: 1px solid color-mix(in srgb, var(--color-text-primary) 10%, transparent);
		margin-top: auto;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-xl) var(--space-lg);
	}

	.footer-content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-xl);
		margin-bottom: var(--space-xl);
	}

	.footer-brand {
		grid-column: span 1;
	}

	.footer-logo {
		text-decoration: none;
		color: var(--color-text-primary);
		font-weight: var(--font-weight-bold);
		font-size: var(--text-xl);
		display: inline-block;
		margin-bottom: var(--space-sm);
	}

	@media (prefers-reduced-motion: no-preference) {
		.footer-logo {
			transition: color 0.2s ease;
		}
	}

	.footer-logo:hover {
		color: var(--color-interactive);
	}

	.footer-tagline {
		color: var(--color-text-secondary);
		font-size: var(--text-sm);
		line-height: var(--line-height-base);
		max-width: 280px;
	}

	.footer-section h3 {
		font-size: var(--text-base);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-md);
	}

	.footer-links,
	.social-links {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.footer-links a,
	.footer-links span {
		color: var(--color-text-secondary);
		text-decoration: none;
		font-size: var(--text-sm);
		display: inline-block;
	}

	@media (prefers-reduced-motion: no-preference) {
		.footer-links a {
			transition: color 0.2s ease;
		}
	}

	.footer-links a:hover {
		color: var(--color-interactive);
	}

	.social-links {
		flex-direction: row;
		gap: var(--space-md);
	}

	.social-links a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background-color: var(--color-bg-primary);
		color: var(--color-text-secondary);
		border: 1px solid color-mix(in srgb, var(--color-text-primary) 10%, transparent);
	}

	@media (prefers-reduced-motion: no-preference) {
		.social-links a {
			transition: all 0.2s ease;
		}
	}

	.social-links a:hover {
		background-color: var(--color-interactive);
		color: var(--primitive-white);
		border-color: var(--color-interactive);
		transform: translateY(-2px);
	}

	.social-links a:focus-visible {
		outline: 2px solid var(--color-interactive);
		outline-offset: 2px;
	}

	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--space-lg);
		border-top: 1px solid color-mix(in srgb, var(--color-text-primary) 10%, transparent);
		flex-wrap: wrap;
		gap: var(--space-md);
	}

	.copyright {
		color: var(--color-text-secondary);
		font-size: var(--text-sm);
		margin: 0;
	}

	.footer-legal {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--text-sm);
	}

	.footer-legal a {
		color: var(--color-text-secondary);
		text-decoration: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.footer-legal a {
			transition: color 0.2s ease;
		}
	}

	.footer-legal a:hover {
		color: var(--color-interactive);
	}

	.separator {
		color: var(--color-text-secondary);
	}

	@media (max-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: var(--space-lg);
		}

		.footer-brand {
			grid-column: span 1;
		}

		.footer-bottom {
			flex-direction: column;
			text-align: center;
		}

		.social-links {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: var(--space-lg) var(--space-md);
		}
	}
</style>
