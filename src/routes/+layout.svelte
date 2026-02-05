<script>
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import DecorativeLines from '$lib/components/layout/DecorativeLines.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Diorro - Agence Web</title>
	<meta name="description" content="Création de sites web sur mesure" />
</svelte:head>

<a href="#main-content" class="skip-link">Aller au contenu principal</a>

<DecorativeLines centerLineRatio={0.8} />

<Header />

<main id="main-content">
	{@render children()}
</main>

<Footer />

<style>
	.skip-link {
		position: absolute;
		top: -40px;
		left: 0;
		background: var(--color-interactive);
		color: var(--primitive-white);
		padding: var(--space-sm) var(--space-md);
		text-decoration: none;
		z-index: 100;
		border-radius: 0 0 4px 0;
	}

	.skip-link:focus {
		top: 0;
	}

	main {
		position: relative;
		min-height: calc(100vh - var(--header-height, 80px) - var(--footer-height, 200px));
		padding-block: var(--space-xl);
	}
</style>
