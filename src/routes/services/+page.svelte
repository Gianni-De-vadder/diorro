<!-- src/routes/services/+page.svelte -->
<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Flexbox from '$lib/components/Flexbox.svelte';
	import Button from '$lib/components/Button.svelte';

	interface Service {
		id: string;
		title: string;
		tagline: string;
		description: string;
		features: string[];
		price: string;
		image: string;
		alt: string;
	}

	interface ProcessStep {
		number: number;
		title: string;
		description: string;
	}

	const services: Service[] = [
		{
			id: 'vitrine',
			title: 'Site Vitrine',
			tagline: 'Votre présence en ligne, professionnelle et élégante',
			description:
				'Un site web sur mesure qui reflète votre identité et valorise votre activité. Design moderne, optimisé pour tous les écrans.',
			features: [
				'Design personnalisé et responsive',
				'Optimisation SEO avancée',
				'Performance et rapidité',
				'Formulaire de contact',
				'Hébergement et maintenance',
				'Tableaux de bord analytics'
			],
			price: 'À partir de 1 500€',
			image: '/images/site-vitrine.png',
			alt: 'Exemple de site vitrine moderne'
		},
		{
			id: 'ecommerce',
			title: 'Site E-commerce',
			tagline: 'Vendez en ligne 24/7 avec une boutique performante',
			description:
				'Une solution complète pour vendre vos produits en ligne. Gestion simplifiée, paiement sécurisé, suivi des commandes.',
			features: [
				'Catalogue produits illimité',
				'Paiement sécurisé (Stripe, PayPal)',
				'Gestion des stocks et commandes',
				'Espace client personnalisé',
				'Système de promotion et codes promo',
				'Statistiques de vente en temps réel'
			],
			price: 'À partir de 3 500€',
			image: '/images/site-ecommerce.png',
			alt: 'Interface de boutique en ligne'
		},
		{
			id: 'application',
			title: 'Application Web',
			tagline: 'Des outils sur mesure pour optimiser votre activité',
			description:
				'Application web personnalisée pour répondre à vos besoins spécifiques. CRM, ERP, plateforme métier, tout est possible.',
			features: [
				'Développement sur mesure',
				'Interface intuitive et moderne',
				'Gestion des utilisateurs et permissions',
				'API et intégrations tierces',
				'Évolutivité et scalabilité',
				'Support technique dédié'
			],
			price: 'Sur devis',
			image: '/images/application.png',
			alt: 'Application web personnalisée'
		}
	];

	const processSteps: ProcessStep[] = [
		{
			number: 1,
			title: 'Échange & Analyse',
			description:
				'Nous écoutons vos besoins, analysons votre projet et définissons ensemble les objectifs.'
		},
		{
			number: 2,
			title: 'Conception & Design',
			description: 'Création de maquettes et validation du design avant le développement.'
		},
		{
			number: 3,
			title: 'Développement',
			description: 'Développement de votre solution avec les technologies les plus adaptées.'
		},
		{
			number: 4,
			title: 'Tests & Déploiement',
			description: "Tests rigoureux, mise en ligne et formation à l'utilisation."
		},
		{
			number: 5,
			title: 'Suivi & Maintenance',
			description: 'Accompagnement continu, mises à jour et support technique.'
		}
	];
</script>

<svelte:head>
	<title>Nos Services - DIORRO | Création Web sur Mesure</title>
	<meta
		name="description"
		content="Sites vitrines, e-commerce et applications web sur mesure. Solutions modernes et performantes adaptées à vos besoins."
	/>
	<meta property="og:title" content="Nos Services - DIORRO" />
	<meta property="og:description" content="Création de sites web et applications sur mesure" />
</svelte:head>

<Section height="auto" backgroundColor="primary" paddingTop="xl">
	<Flexbox direction="column" gap="lg" align="center">
		<h1 class="text-center">NOS SERVICES</h1>
		<p class="intro text-center max-w-prose">
			Des solutions web adaptées à vos besoins. De la simple vitrine à l'application métier
			complexe, nous créons des outils performants et évolutifs.
		</p>
	</Flexbox>
</Section>

<Section height="auto" backgroundColor="secondary" paddingTop="lg">
	<Flexbox direction="column" gap="xl">
		{#each services as service, index (service.id)}
			<article class="service-card" class:reverse={index % 2 !== 0}>
				<div class="service-image">
					<img src={service.image} alt={service.alt} loading="lazy" />
				</div>

				<div class="service-content">
					<div class="service-header">
						<h2>{service.title}</h2>
						<p class="tagline">{service.tagline}</p>
					</div>

					<p class="description">{service.description}</p>

					<ul class="features">
						{#each service.features as feature (feature)}
							<li>{feature}</li>
						{/each}
					</ul>

					<div class="service-footer">
						<p class="price">{service.price}</p>
						<Button href="/contact" variant="primary" size="medium">Demander un devis</Button>
					</div>
				</div>
			</article>
		{/each}
	</Flexbox>
</Section>

<Section height="auto" backgroundColor="primary" paddingTop="lg">
	<Flexbox direction="column" gap="xl">
		<h2 class="text-center">NOTRE PROCESSUS</h2>
		<p class="text-center max-w-prose">
			Une méthodologie éprouvée pour mener votre projet à bien, de la conception au déploiement.
		</p>

		<div class="process-grid">
			{#each processSteps as step (step.number)}
				<div class="process-step">
					<div class="step-number">{step.number}</div>
					<h3>{step.title}</h3>
					<p>{step.description}</p>
				</div>
			{/each}
		</div>
	</Flexbox>
</Section>

<Section height="half" backgroundColor="secondary">
	<Flexbox direction="column" gap="xl" align="center">
		<h2 class="text-center">PRÊT À DÉMARRER VOTRE PROJET ?</h2>
		<p class="text-center max-w-prose">
			Discutons de vos besoins et trouvons ensemble la solution adaptée à votre activité.
		</p>
		<Button href="/contact" variant="primary" size="large">Contactez-nous</Button>
	</Flexbox>
</Section>

<style>
	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
		margin: 0;
	}

	h2 {
		font-size: clamp(1.5rem, 4vw, 2rem);
		margin: 0 0 var(--space-sm) 0;
	}

	h3 {
		font-size: var(--text-lg);
		margin: 0 0 var(--space-xs) 0;
	}

	.intro {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		margin: 0 auto;
	}

	.service-card {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-xl);
		align-items: center;
		background-color: var(--color-bg-primary);
		border-radius: var(--card-border-radius);
		padding: var(--card-padding);
		max-width: 1200px;
		margin: 0 auto;
	}

	.service-card.reverse {
		grid-template-columns: 1fr 1fr;
	}

	.service-card.reverse .service-image {
		order: 2;
	}

	.service-card.reverse .service-content {
		order: 1;
	}

	.service-image {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 8px;
	}

	.service-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: 4 / 3;
	}

	.service-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.service-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.tagline {
		color: var(--color-interactive);
		font-weight: var(--font-weight-medium);
		font-size: var(--text-base);
		margin: 0;
	}

	.description {
		color: var(--color-text-secondary);
		line-height: var(--line-height-base);
		margin: 0;
	}

	.features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-sm);
	}

	.features li {
		position: relative;
		padding-left: var(--space-md);
		font-size: var(--text-sm);
	}

	.features li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--color-interactive);
		font-weight: var(--font-weight-bold);
	}

	.service-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: var(--space-sm);
		padding-top: var(--space-md);
		border-top: 1px solid var(--color-bg-secondary);
	}

	.price {
		font-size: var(--text-xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-interactive);
		margin: 0;
	}

	.process-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-lg);
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.process-step {
		background-color: var(--color-bg-secondary);
		padding: var(--space-lg);
		border-radius: var(--card-border-radius);
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	@media (prefers-reduced-motion: no-preference) {
		.process-step {
			transition: transform 0.2s ease;
		}

		.process-step:hover {
			transform: translateY(-4px);
		}
	}

	.step-number {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: var(--color-interactive);
		color: var(--button-text);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--text-xl);
		font-weight: var(--font-weight-bold);
		margin: 0 auto var(--space-sm);
	}

	.process-step p {
		color: var(--color-text-secondary);
		font-size: var(--text-sm);
		line-height: var(--line-height-base);
		margin: 0;
	}

	@media (max-width: 768px) {
		.service-card {
			grid-template-columns: 1fr;
			gap: var(--space-md);
		}

		.service-card.reverse {
			grid-template-columns: 1fr;
		}

		.service-card.reverse .service-image {
			order: 1;
		}

		.service-card.reverse .service-content {
			order: 2;
		}

		.service-footer {
			flex-direction: column;
			gap: var(--space-md);
			align-items: stretch;
		}

		.features {
			grid-template-columns: 1fr;
		}

		.process-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.service-card {
			padding: var(--space-md);
		}
	}
</style>
