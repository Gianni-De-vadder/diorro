<script lang="ts">
	import { browser } from '$app/environment';

	interface Props {
		lineCount?: number;
		maxWidth?: number;
		minWidth?: number;
		lineHeight?: number;
		containerHeight?: number;
		color?: string;
		animationDuration?: number;
		animationStagger?: number;
		curveIntensity?: number;
		cutAngle?: number;
		curveStart?: number;
		centerLineRatio?: number;
		// Nouvelles props pour l'effet de "push" dynamique
		basePushDistance?: number;
		maxPushDistance?: number;
	}

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
		centerLineRatio = 0.85,
		basePushDistance = 0,
		maxPushDistance = 150
	}: Props = $props();

	let windowWidth = $state(browser ? window.innerWidth : 0);
	let scrollY = $state(0);
	let documentHeight = $state(browser ? document.body.scrollHeight : 1);

	// Calcul du facteur de "push" basé sur le scroll
	// Les lignes s'écartent progressivement quand on scroll
	const scrollProgress = $derived(() => {
		if (!browser || documentHeight <= windowHeight) return 0;
		const maxScroll = documentHeight - windowHeight;
		return Math.min(scrollY / maxScroll, 1);
	});

	let windowHeight = $state(browser ? window.innerHeight : 0);

	// Distance de push dynamique basée sur le scroll
	// Utilise une fonction sinusoïdale pour un effet plus fluide
	const pushDistance = $derived(() => {
		const progress = scrollProgress();
		// Effet ondulé: les lignes s'écartent et se resserrent légèrement
		const wave = Math.sin(progress * Math.PI * 2) * 0.3 + 0.7;
		return basePushDistance + (maxPushDistance * progress * wave);
	});

	// Observer pour détecter les changements de taille du document
	$effect(() => {
		if (!browser) return;
		
		const updateDocHeight = () => {
			documentHeight = document.body.scrollHeight;
		};
		
		// Observer les mutations du DOM pour mettre à jour la hauteur
		const resizeObserver = new ResizeObserver(updateDocHeight);
		resizeObserver.observe(document.body);
		
		return () => resizeObserver.disconnect();
	});

	const validLineCount = $derived(lineCount % 2 === 0 ? lineCount + 1 : lineCount);
	const isMobile = $derived(windowWidth <= 480 && windowWidth > 0);

	const responsiveMaxWidth = $derived(windowWidth <= 768 ? maxWidth * 1.2 : maxWidth);
	const responsiveMinWidth = $derived(windowWidth <= 768 ? minWidth * 1.5 : minWidth);
	const responsiveLineHeight = $derived(windowWidth <= 768 ? lineHeight * 1.2 : lineHeight);
	const responsiveCurveIntensity = $derived(
		windowWidth <= 768 ? curveIntensity * 0.8 : curveIntensity
	);
	const responsiveCutAngle = $derived(windowWidth <= 768 ? cutAngle * 1 : cutAngle);

	// Version mobile améliorée: on garde la couleur navy avec opacité
	const lineColor = $derived(isMobile ? 'var(--primitive-navy)' : color);

	interface Line {
		width: number;
		delay: number;
		y: number;
		curveDirection: number;
		isCenter: boolean;
		isAboveCenter: boolean;
		id: string;
		cp1x: number;
		cp1y: number;
		cp2x: number;
		cp2y: number;
		opacity?: number;
	}

	const lines = $derived.by(() => {
		const result: Line[] = [];
		const middle = Math.floor(validLineCount / 2);
		const totalHeight = 1000;
		const spacing = (totalHeight * 0.8) / (validLineCount - 1);

		for (let i = 0; i < validLineCount; i++) {
			const distanceFromCenter = Math.abs(i - middle);
			const ratio = 1 - distanceFromCenter / middle;

			let width: number;
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

			// Opacité graduelle pour mobile: plus fort au centre
			const opacity = isMobile ? 0.08 + ratio * 0.12 : 1;

			result.push({
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
				cp2y,
				opacity
			});
		}

		return result;
	});
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} bind:scrollY={scrollY} />

{#if browser && windowWidth > 0}
	<div class="decorative-lines" class:mobile={isMobile} style="--push-distance: {pushDistance()}px;">
		<svg class="lines-svg left-lines" viewBox="0 0 350 1000" preserveAspectRatio="none">
			<defs>
				<!-- Gradient pour effet de profondeur en mobile -->
				{#if isMobile}
					<linearGradient id="mobile-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" style="stop-color:{lineColor};stop-opacity:0" />
						<stop offset="50%" style="stop-color:{lineColor};stop-opacity:1" />
						<stop offset="100%" style="stop-color:{lineColor};stop-opacity:0.3" />
					</linearGradient>
				{/if}

				{#each lines as line (line.id)}
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

			{#each lines as line (line.id)}
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
					fill={isMobile ? 'url(#mobile-gradient)' : lineColor}
					clip-path="url(#clip-left-{line.id})"
					class="line"
					class:mobile-line={isMobile}
					style="
                        animation-delay: {line.delay}s;
                        animation-duration: {animationDuration}s;
                        {isMobile ? `opacity: ${line.opacity};` : ''}
                    "
				/>
			{/each}
		</svg>

		{#if !isMobile}
			<svg class="lines-svg mirror right-lines" viewBox="0 0 350 1000" preserveAspectRatio="none">
				<defs>
					{#each lines as line (line.id)}
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

				{#each lines as line (line.id)}
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
						fill={lineColor}
						clip-path="url(#clip-right-{line.id})"
						class="line"
						style="
                            animation-delay: {line.delay}s;
                            animation-duration: {animationDuration}s;
                        "
					/>
				{/each}
			</svg>
		{/if}
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
		--push-distance: 0px;
	}

	.decorative-lines.mobile {
		z-index: -1;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.lines-svg {
		width: 350px;
		height: 75%;
		will-change: transform;
	}

	/* Effet de push dynamique sur les lignes gauches et droites */
	.left-lines {
		transform: translateX(calc(var(--push-distance) * -1));
	}

	.right-lines {
		transform: translateX(var(--push-distance));
	}

	.line {
		transform-origin: left center;
	}

	.mirror .line {
		transform-origin: right center;
	}

	@media (min-width: 481px) and (prefers-reduced-motion: no-preference) {
		.lines-svg {
			transition:
				transform 0.15s ease-out,
				width 0.3s ease,
				height 0.3s ease;
		}

		.line {
			opacity: 0;
			transform: scaleX(0);
			animation: slideIn ease-out forwards;
		}
	}

	@media (min-width: 481px) and (prefers-reduced-motion: reduce) {
		.line {
			opacity: 1;
			transform: scaleX(1);
			animation: none;
		}

		.lines-svg {
			transition: none;
		}
	}

	@media (max-width: 480px) {
		.line {
			transform: scaleX(1) !important;
			animation: none !important;
		}

		.mobile-line {
			/* Effet de mélange pour plus de profondeur */
			mix-blend-mode: multiply;
		}

		.lines-svg {
			width: 100%;
			max-width: 420px;
			height: 100%;
			/* Légère translation pour créer plus de dynamisme */
			transform: translateX(-5%);
		}

		.left-lines,
		.right-lines {
			transform: translateX(-5%);
		}

		.decorative-lines {
			padding-left: 0;
			/* Léger dégradé de fond pour intégration subtile */
			background: linear-gradient(135deg, rgba(212, 222, 236, 0.03) 0%, rgba(255, 255, 255, 0) 50%);
		}
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

	@media (max-width: 768px) and (min-width: 481px) {
		.lines-svg {
			width: 140px;
			height: 60%;
		}

		.line {
			opacity: 0.35;
		}
	}
</style>
