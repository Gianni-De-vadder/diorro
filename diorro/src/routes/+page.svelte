<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Flexbox from '$lib/components/Flexbox.svelte';
	import LogoDiorro from '$lib/components/LogoDiorro.svelte';
	import Button from '$lib/components/Button.svelte';
	import Rating from '$lib/components/Rating.svelte';

	interface Service {
		image: string;
		alt: string;
		title: string;
	}

	interface Realisation {
		image: string;
		alt: string;
		title: string;
		href?: string;
	}

	const services: Service[] = [
		{
			image: '/images/site-vitrine.png',
			alt: 'Mockup de site vitrine moderne',
			title: 'Site vitrine'
		},
		{
			image: '/images/site-ecommerce.png',
			alt: 'Interface de site e-commerce',
			title: 'Site e-commerce'
		},
		{
			image: '/images/application.png',
			alt: 'Application web sur ordinateur et mobile',
			title: 'Application'
		}
	];

	const realisations: Realisation[] = [
		{
			image: '/images/site-home-reno.png',
			alt: 'Site web Home Reno & Co',
			title: 'Home Reno & Co',
			href: '/realisations/home-reno'
		},
		{
			image: '/images/site-au-meliz.png',
			alt: 'Site web Au Méliz',
			title: 'Au Méliz',
			href: '/realisations/au-meliz'
		},
		{
			image: '/images/placeholder.png',
			alt: 'Projet à venir',
			title: 'À venir'
		}
	];

	const rating = 4.7;
	const maxRating = 5;
</script>

<svelte:head>
	<title>DIORRO - Développeur Web & Application</title>
	<meta
		name="description"
		content="Création d'applications web sur mesure. Solutions modernes, performantes et évolutives pour votre entreprise."
	/>
	<meta property="og:title" content="DIORRO - Développeur Web & Application" />
	<meta property="og:description" content="Création d'applications web sur mesure" />
	<meta property="og:type" content="website" />
</svelte:head>

<Section height="full" backgroundColor="primary">
	<Flexbox direction="column" gap="clamp(1rem, 3vh, 2rem)">
		<LogoDiorro width="min(600px, 90vw)" height="auto" class="logo-wordmark" />

		<p class="tagline text-center font-medium">Développeur Web - Application</p>

		<p class="description text-center max-w-prose">
			Conception et développement d'applications web sur mesure. Solutions modernes, performantes et
			évolutives.
		</p>

		<Flexbox justify="center" align="center" wrap={true} gap="clamp(1rem, 2vh, 1.5rem)">
			<Button href="/realisations" variant="primary" size="large">Voir nos réalisations</Button>
			<Button href="/contact" variant="outline" size="large">Nous contacter</Button>
		</Flexbox>
	</Flexbox>
</Section>

<Section height="half" backgroundColor="secondary" paddingTop="lg">
	<Flexbox direction="column" gap="xl">
		<h2 class="text-center">NOS SERVICES</h2>

		<div class="grid-cards">
			{#each services as service (service.title)}
				<article class="card">
					<img src={service.image} alt={service.alt} loading="lazy" />
					<h3>{service.title}</h3>
				</article>
			{/each}
		</div>
	</Flexbox>
</Section>

<Section height="half" backgroundColor="secondary">
	<Flexbox direction="column" gap="xl">
		<h2 class="text-center">
			UNE SOLUTION PENSÉE POUR VOUS<br />ET VOTRE BUDGET
		</h2>
		<Button href="/services" variant="primary" size="large">Découvrir</Button>
	</Flexbox>
</Section>

<Section height="half">
	<Flexbox direction="column" gap="xl">
		<h2 class="text-center">NOS RÉALISATIONS</h2>

		<div class="grid-cards">
			{#each realisations as realisation (realisation.title)}
				<article class="card">
					{#if realisation.href}
						<a href={realisation.href}>
							<img src={realisation.image} alt={realisation.alt} loading="lazy" />
							<h3>{realisation.title}</h3>
						</a>
					{:else}
						<img src={realisation.image} alt={realisation.alt} loading="lazy" />
						<h3>{realisation.title}</h3>
					{/if}
				</article>
			{/each}
		</div>
	</Flexbox>
</Section>

<Section height="half" backgroundColor="secondary">
	<Flexbox direction="column" gap="xl" align="center">
		<h2 class="text-center">L'AVIS DE NOS CLIENTS</h2>

		<Rating {rating} {maxRating} size="lg" />

		<Flexbox direction="column" gap="sm" align="center">
			<p class="score">{rating}/{maxRating}</p>
			<p class="subtitle text-secondary">Merci de votre confiance</p>
		</Flexbox>
	</Flexbox>
</Section>

<style>
	.tagline {
		font-size: clamp(1rem, 4vw, 1.25rem);
	}

	.description {
		font-size: clamp(0.875rem, 3vw, 1rem);
		margin: 0 auto;
	}

	.grid-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: clamp(var(--space-md), 2vw, var(--space-lg));
		width: 100%;
		max-width: 1100px;
		margin: 0 auto;
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		background-color: var(--color-bg-primary);
		border-radius: var(--card-border-radius);
		padding: var(--card-padding);
	}

	@media (prefers-reduced-motion: no-preference) {
		.card {
			transition: transform 0.2s ease;
		}

		.card:hover {
			transform: translateY(-4px);
		}
	}

	.card a {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		text-decoration: none;
		color: inherit;
		width: 100%;
	}

	.card img {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 4px;
	}

	.card h3 {
		margin: 0;
		font-size: var(--text-lg);
		font-weight: var(--font-weight-bold);
		text-align: center;
	}

	.score {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: var(--font-weight-bold);
		line-height: 1;
		margin: 0;
	}

	.subtitle {
		font-size: clamp(1rem, 2vw, 1.25rem);
		margin: 0;
	}
</style>
