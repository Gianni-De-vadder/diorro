<!-- src/lib/components/DecorativeLines.svelte -->
<script>
	import { browser } from '$app/environment';

	let {
		lineCount = 7,
		maxWidth = 280,
		minWidth = 40,
		lineHeight = 24,
		containerHeight = 75,
		color = 'var(--primitive-navy)',
		animationDuration = 1.2,
		animationStagger = 0.15,
		curveIntensity = 30,
		cutAngle = 20,
		curveStart = 0.7,
		centerLineRatio = 0.85
	} = $props();

	// Détection de la largeur d'écran
	let windowWidth = $state(browser ? window.innerWidth : 1200);

	// Props responsives dérivées
	const responsiveMaxWidth = $derived(windowWidth <= 768 ? maxWidth * 0.4 : maxWidth);
	const responsiveMinWidth = $derived(windowWidth <= 768 ? minWidth * 0.5 : minWidth);
	const responsiveLineHeight = $derived(windowWidth <= 768 ? lineHeight * 0.7 : lineHeight);
	const responsiveCurveIntensity = $derived(
		windowWidth <= 768 ? curveIntensity * 0.6 : curveIntensity
	);
	const responsiveCutAngle = $derived(windowWidth <= 768 ? cutAngle * 0.7 : cutAngle);

	$effect(() => {
		if (lineCount % 2 === 0) {
			console.warn('lineCount doit être impair. Ajustement automatique.');
			lineCount = lineCount + 1;
		}
	});

	function generateLines() {
		const lines = [];
		const middle = Math.floor(lineCount / 2);
		const totalHeight = 1000;
		const spacing = (totalHeight * 0.8) / (lineCount - 1);

		for (let i = 0; i < lineCount; i++) {
			const distanceFromCenter = Math.abs(i - middle);
			const ratio = 1 - distanceFromCenter / middle;

			let width;
			if (i === middle) {
				width = responsiveMaxWidth * centerLineRatio;
			} else {
				width = responsiveMinWidth + (responsiveMaxWidth - responsiveMinWidth) * ratio;
			}

			const delay = distanceFromCenter * animationStagger;
			const y = totalHeight * 0.1 + i * spacing;

			const isAboveCenter = i < middle;
			const isCenter = i === middle;

			const curveAmount = isCenter ? 0 : responsiveCurveIntensity * ratio;
			const curveDirection = isAboveCenter ? -curveAmount : curveAmount;

			const straightDistance = width * curveStart;
			const cp1x = straightDistance;
			const cp1y = y;
			const cp2x = width * 0.8;
			const cp2y = y + curveDirection;

			lines.push({
				width,
				delay,
				y,
				curveDirection,
				isCenter,
				isAboveCenter,
				id: `line-${i}`,
				cp1x,
				cp1y,
				cp2x,
				cp2y
			});
		}

		return lines;
	}

	const lines = $derived(generateLines());
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if windowWidth > 480}
	<div class="decorative-lines">
		<!-- Lignes gauche -->
		<svg class="lines-svg" viewBox="0 0 350 1000" preserveAspectRatio="none">
			<defs>
				{#each lines as line}
					<clipPath id="clip-left-{line.id}">
						{#if line.isCenter}
							<rect
								x="0"
								y={line.y - responsiveLineHeight / 2}
								width={line.width}
								height={responsiveLineHeight}
							/>
						{:else if line.isAboveCenter}
							<polygon
								points="
                                0,{line.y - responsiveLineHeight / 2}
                                {line.width - responsiveCutAngle},{line.y -
									responsiveLineHeight / 2}
                                {line.width},{line.y + responsiveLineHeight / 2}
                                0,{line.y + responsiveLineHeight / 2}
                            "
							/>
						{:else}
							<polygon
								points="
                                0,{line.y - responsiveLineHeight / 2}
                                {line.width},{line.y - responsiveLineHeight / 2}
                                {line.width - responsiveCutAngle},{line.y +
									responsiveLineHeight / 2}
                                0,{line.y + responsiveLineHeight / 2}
                            "
							/>
						{/if}
					</clipPath>
				{/each}
			</defs>

			{#each lines as line}
				<path
					d="
                        M 0,{line.y - responsiveLineHeight / 2}
                        C {line.cp1x},{line.cp1y -
						responsiveLineHeight / 2} {line.cp2x},{line.cp2y -
						responsiveLineHeight / 2} {line.width},{line.y - responsiveLineHeight / 2}
                        L {line.width},{line.y + responsiveLineHeight / 2}
                        C {line.cp2x},{line.cp2y +
						responsiveLineHeight / 2} {line.cp1x},{line.cp1y + responsiveLineHeight / 2} 0,{line.y +
						responsiveLineHeight / 2}
                        Z
                    "
					fill={color}
					clip-path="url(#clip-left-{line.id})"
					class="line"
					style="
                        animation-delay: {line.delay}s;
                        animation-duration: {animationDuration}s;
                    "
				/>
			{/each}
		</svg>

		<!-- Lignes droite (miroir) -->
		<svg class="lines-svg mirror" viewBox="0 0 350 1000" preserveAspectRatio="none">
			<defs>
				{#each lines as line}
					<clipPath id="clip-right-{line.id}">
						{#if line.isCenter}
							<rect
								x={350 - line.width}
								y={line.y - responsiveLineHeight / 2}
								width={line.width}
								height={responsiveLineHeight}
							/>
						{:else if line.isAboveCenter}
							<polygon
								points="
                                350,{line.y - responsiveLineHeight / 2}
                                {350 - line.width + responsiveCutAngle},{line.y -
									responsiveLineHeight / 2}
                                {350 - line.width},{line.y + responsiveLineHeight / 2}
                                350,{line.y + responsiveLineHeight / 2}
                            "
							/>
						{:else}
							<polygon
								points="
                                350,{line.y - responsiveLineHeight / 2}
                                {350 - line.width},{line.y - responsiveLineHeight / 2}
                                {350 - line.width + responsiveCutAngle},{line.y +
									responsiveLineHeight / 2}
                                350,{line.y + responsiveLineHeight / 2}
                            "
							/>
						{/if}
					</clipPath>
				{/each}
			</defs>

			{#each lines as line}
				<path
					d="
                        M 350,{line.y - responsiveLineHeight / 2}
                        C {350 - line.cp1x},{line.cp1y - responsiveLineHeight / 2} {350 -
						line.cp2x},{line.cp2y - responsiveLineHeight / 2} {350 - line.width},{line.y -
						responsiveLineHeight / 2}
                        L {350 - line.width},{line.y + responsiveLineHeight / 2}
                        C {350 - line.cp2x},{line.cp2y + responsiveLineHeight / 2} {350 -
						line.cp1x},{line.cp1y + responsiveLineHeight / 2} 350,{line.y +
						responsiveLineHeight / 2}
                        Z
                    "
					fill={color}
					clip-path="url(#clip-right-{line.id})"
					class="line"
					style="
                        animation-delay: {line.delay}s;
                        animation-duration: {animationDuration}s;
                    "
				/>
			{/each}
		</svg>
	</div>
{/if}

<style>
	.decorative-lines {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.lines-svg {
		width: 350px;
		height: 75%;
		transition:
			width 0.3s ease,
			height 0.3s ease;
	}

	.line {
		opacity: 0;
		transform: scaleX(0);
		transform-origin: left center;
		animation: slideIn ease-out forwards;
	}

	.mirror .line {
		transform-origin: right center;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: scaleX(0);
		}
		to {
			opacity: 1;
			transform: scaleX(1);
		}
	}

	/* Tablette : Adaptation progressive */
	@media (max-width: 768px) {
		.lines-svg {
			width: 140px;
			height: 60%;
		}

		.line {
			opacity: 0.35;
		}
	}

	/* Mobile : Cache complètement */
	@media (max-width: 480px) {
		.decorative-lines {
			display: none;
		}
	}
</style>
