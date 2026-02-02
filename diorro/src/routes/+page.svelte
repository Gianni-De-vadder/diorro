<!-- src/routes/+page.svelte -->
<script>
	import LogoDiorro from '$lib/components/LogoDiorro.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
	<title>DIORRO - Développeur Web & Application</title>
	<meta name="description" content="Création d'applications web sur mesure" />
</svelte:head>

<!-- SECTION 1 : Hero (AVEC lignes - z-index élevé) -->
<section class="hero with-lines">
	<div class="hero-content">
		<div class="logo-main">
			<LogoDiorro width="600px" class="logo-wordmark" />
		</div>

		<p class="tagline">Développeur Web - Application</p>

		<p class="description">
			Conception et développement d'applications web sur mesure. Solutions modernes, performantes et
			évolutives.
		</p>

		<div class="hero-actions">
			<Button href="/realisations" variant="primary" size="large">Voir nos réalisations</Button>
			<Button href="/contact" variant="outline" size="large">Nous contacter</Button>
		</div>
	</div>
</section>

<!-- SECTION 2 : Services (SANS lignes - fond opaque) -->
<section class="services no-lines">
	<div class="container">
		<h2>NOS SERVICES</h2>

		<div class="services-grid">
			<div class="service-card">
				<img src="/images/site-vitrine.jpg" alt="Site vitrine" />
				<h3>Site vitrine</h3>
			</div>
			<div class="service-card">
				<img src="/images/site-ecommerce.jpg" alt="Site e-commerce" />
				<h3>Site e-commerce</h3>
			</div>
			<div class="service-card">
				<img src="/images/application.jpg" alt="Application" />
				<h3>Application</h3>
			</div>
		</div>
	</div>
</section>
