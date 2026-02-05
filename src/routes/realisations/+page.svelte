<!-- src/routes/realisations/+page.svelte -->
<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Flexbox from '$lib/components/Flexbox.svelte';
	import Button from '$lib/components/Button.svelte';

	interface Project {
		id: string;
		title: string;
		category: 'vitrine' | 'ecommerce' | 'application';
		description: string;
		image: string;
		alt: string;
		tags: string[];
		url?: string;
		caseStudyUrl?: string;
	}

	const projects: Project[] = [
		{
			id: 'home-reno',
			title: 'Home Reno & Co',
			category: 'vitrine',
			description:
				'Site vitrine pour une entreprise de rénovation. Design moderne et galerie de projets immersive.',
			image: '/images/site-home-reno.png',
			alt: 'Site web Home Reno & Co',
			tags: ['SvelteKit', 'SEO', 'Responsive'],
			url: 'https://homereno.example.com',
			caseStudyUrl: '/realisations/home-reno'
		},
		{
			id: 'au-meliz',
			title: 'Au Méliz',
			category: 'vitrine',
			description:
				'Site web pour un food truck. Menu interactif, localisation en temps réel et système de réservation.',
			image: '/images/site-au-meliz.png',
			alt: 'Site web Au Méliz',
			tags: ['SvelteKit', 'Maps API', 'Mobile-First'],
			url: 'https://aumeliz.fr',
			caseStudyUrl: '/realisations/au-meliz'
		},
		{
			id: 'projet-3',
			title: 'Boutique Mode',
			category: 'ecommerce',
			description:
				'E-commerce de prêt-à-porter avec paiement sécurisé, gestion de stock et tableau de bord admin.',
			image: '/images/placeholder.png',
			alt: 'Boutique e-commerce de mode',
			tags: ['SvelteKit', 'Stripe', 'Dashboard'],
			caseStudyUrl: '/realisations/boutique-mode'
		},
		{
			id: 'projet-4',
			title: 'CRM sur mesure',
			category: 'application',
			description:
				'Application de gestion de relation client pour PME. Interface intuitive et reporting avancé.',
			image: '/images/placeholder.png',
			alt: 'Application CRM personnalisée',
			tags: ['SvelteKit', 'PostgreSQL', 'API'],
			caseStudyUrl: '/realisations/crm-custom'
		},
		{
			id: 'projet-5',
			title: 'Portfolio Architecte',
			category: 'vitrine',
			description:
				'Site portfolio élégant pour un architecte. Galerie haute résolution et animations subtiles.',
			image: '/images/placeholder.png',
			alt: 'Portfolio architecte',
			tags: ['SvelteKit', 'Animations', 'Performance'],
			caseStudyUrl: '/realisations/portfolio-architecte'
		},
		{
			id: 'projet-6',
			title: 'Plateforme de formation',
			category: 'application',
			description:
				'LMS (Learning Management System) avec gestion de cours, quiz et suivi des progrès.',
			image: '/images/placeholder.png',
			alt: 'Plateforme de formation en ligne',
			tags: ['SvelteKit', 'Authentification', 'Video'],
			caseStudyUrl: '/realisations/plateforme-formation'
		}
	];

	let selectedCategory = $state<'all' | 'vitrine' | 'ecommerce' | 'application'>('all');

	const filteredProjects = $derived(
		selectedCategory === 'all' ? projects : projects.filter((p) => p.category === selectedCategory)
	);

	const categories = [
		{ value: 'all' as const, label: 'Tous les projets' },
		{ value: 'vitrine' as const, label: 'Sites Vitrine' },
		{ value: 'ecommerce' as const, label: 'E-commerce' },
		{ value: 'application' as const, label: 'Applications' }
	];
</script>

<svelte:head>
	<title>Nos Réalisations - DIORRO | Portfolio de projets web</title>
	<meta
		name="description"
		content="Découvrez nos réalisations : sites vitrines, e-commerce et applications web sur mesure. Portfolio de projets réussis."
	/>
	<meta property="og:title" content="Nos Réalisations - DIORRO" />
	<meta property="og:description" content="Portfolio de nos projets web réalisés" />
</svelte:head>

<Section height="full" backgroundColor="primary" paddingTop="none">
	<Flexbox direction="column" gap="lg" align="center">
		<h1 class="text-center">NOS RÉALISATIONS</h1>
		<p class="intro text-center max-w-prose">
			Découvrez une sélection de projets que nous avons conçus et développés pour nos clients.
			Chaque projet est unique et répond à des besoins spécifiques.
		</p>
	</Flexbox>
</Section>

<Section height="auto" backgroundColor="secondary" paddingTop="xl">
	<div class="filters">
		{#each categories as category (category.value)}
			<button
				class="filter-btn"
				class:active={selectedCategory === category.value}
				onclick={() => (selectedCategory = category.value)}
				type="button"
			>
				{category.label}
			</button>
		{/each}
	</div>
</Section>

<Section height="auto" backgroundColor="secondary" paddingTop="md">
	<div class="projects-grid">
		{#each filteredProjects as project (project.id)}
			<article class="project-card">
				<div class="project-image">
					<img src={project.image} alt={project.alt} loading="lazy" />
					<div class="project-overlay">
						<div class="overlay-content">
							{#if project.url}
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									class="overlay-link"
								>
									Voir le site
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
										<polyline points="15 3 21 3 21 9"></polyline>
										<line x1="10" y1="14" x2="21" y2="3"></line>
									</svg>
								</a>
							{/if}
							{#if project.caseStudyUrl}
								<a href={project.caseStudyUrl} class="overlay-link"> Voir le projet </a>
							{/if}
						</div>
					</div>
				</div>

				<div class="project-content">
					<h2>{project.title}</h2>
					<p class="project-description">{project.description}</p>

					<div class="project-tags">
						{#each project.tags as tag (tag)}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				</div>
			</article>
		{/each}
	</div>
</Section>

<Section height="half" backgroundColor="primary">
	<Flexbox direction="column" gap="xl" align="center">
		<h2 class="text-center">VOUS AVEZ UN PROJET ?</h2>
		<p class="text-center max-w-prose">
			Discutons ensemble de votre idée et donnons-lui vie. Demandez un devis gratuit et sans
			engagement.
		</p>
		<Button href="/contact" variant="primary" size="large">Démarrer un projet</Button>
	</Flexbox>
</Section>

<style>
	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
		margin: 0;
	}

	h2 {
		font-size: var(--text-xl);
		margin: 0 0 var(--space-sm) 0;
		color: var(--color-text-primary);
	}

	.intro {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		margin: 0 auto;
	}

	.filters {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
		margin: 0 auto;
		max-width: 800px;
	}

	.filter-btn {
		padding: var(--space-sm) var(--space-lg);
		background-color: var(--color-bg-primary);
		border: 2px solid var(--color-interactive);
		border-radius: 50px;
		color: var(--color-interactive);
		font-size: var(--text-base);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		white-space: nowrap;
	}

	@media (prefers-reduced-motion: no-preference) {
		.filter-btn {
			transition: all 0.2s ease;
		}

		.filter-btn:hover {
			background-color: var(--color-interactive);
			color: var(--button-text);
			transform: translateY(-2px);
		}
	}

	.filter-btn.active {
		background-color: var(--color-interactive);
		color: var(--button-text);
	}

	.filter-btn:focus-visible {
		outline: 2px solid var(--color-interactive);
		outline-offset: 4px;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: var(--space-xl);
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
	}

	.project-card {
		background-color: var(--color-bg-primary);
		border-radius: var(--card-border-radius);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	@media (prefers-reduced-motion: no-preference) {
		.project-card {
			transition: transform 0.3s ease;
		}

		.project-card:hover {
			transform: translateY(-8px);
		}
	}

	.project-image {
		position: relative;
		width: 100%;
		height: 250px;
		overflow: hidden;
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.project-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(180deg, rgba(0, 31, 63, 0.7) 0%, rgba(0, 31, 63, 0.9) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.project-overlay {
			transition: opacity 0.3s ease;
		}

		.project-card:hover .project-overlay {
			opacity: 1;
		}
	}

	.overlay-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.overlay-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-sm) var(--space-lg);
		background-color: var(--button-text);
		color: var(--color-interactive);
		text-decoration: none;
		border-radius: 4px;
		font-weight: var(--font-weight-medium);
		font-size: var(--text-base);
		white-space: nowrap;
	}

	@media (prefers-reduced-motion: no-preference) {
		.overlay-link {
			transition: transform 0.2s ease;
		}

		.overlay-link:hover {
			transform: scale(1.05);
		}
	}

	.project-content {
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		flex: 1;
	}

	.project-description {
		color: var(--color-text-secondary);
		font-size: var(--text-sm);
		line-height: var(--line-height-base);
		margin: 0;
	}

	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-top: auto;
		padding-top: var(--space-sm);
	}

	.tag {
		padding: var(--space-xs) var(--space-sm);
		background-color: var(--color-bg-secondary);
		color: var(--color-interactive);
		font-size: var(--text-xs);
		font-weight: var(--font-weight-medium);
		border-radius: 4px;
	}

	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: var(--space-lg);
		}

		.project-image {
			height: 200px;
		}
	}

	@media (max-width: 480px) {
		.filters {
			gap: var(--space-xs);
		}

		.filter-btn {
			padding: var(--space-xs) var(--space-md);
			font-size: var(--text-sm);
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
