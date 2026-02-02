<!-- src/routes/+layout.svelte -->
<script>
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import DecorativeLines from '$lib/components/layout/DecorativeLines.svelte';
</script>

<!-- Lignes décoratives fixes sur TOUTES les pages -->
<DecorativeLines
	lineCount={7}
	maxWidth={320}
	minWidth={20}
	lineHeight={26}
	containerHeight={75}
	color="var(--primitive-navy)"
	animationDuration={1.2}
	animationStagger={0.2}
	curveIntensity={35}
	cutAngle={18}
	curveStart={0.7}
	centerLineRatio={0.85}
/>

<Header />

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		min-height: 100vh;
	}
</style>
