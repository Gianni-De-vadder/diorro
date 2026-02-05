<script lang="ts">
	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		rating?: number;
		maxRating?: number;
		size?: Size;
		ariaLabel?: string;
	}

	let { rating = 5, maxRating = 5, size = 'md', ariaLabel }: Props = $props();

	const sizeMap: Record<Size, number> = { sm: 32, md: 48, lg: 64 };

	const diamondSize = $derived(sizeMap[size]);
	const fullStars = $derived(Math.floor(rating));
	const hasHalfStar = $derived(rating % 1 >= 0.5);
	const emptyStars = $derived(maxRating - fullStars - (hasHalfStar ? 1 : 0));
	const label = $derived(ariaLabel ?? `Note: ${rating} sur ${maxRating}`);
</script>

<div class="rating" role="img" aria-label={label}>
	{#each { length: fullStars } as _, i (i)}
		<svg
			width={diamondSize}
			height={diamondSize}
			viewBox="0 0 100 100"
			class="diamond filled"
			aria-hidden="true"
		>
			<path d="M 50 5 L 95 50 L 50 95 L 5 50 Z" fill="currentColor" />
		</svg>
	{/each}

	{#if hasHalfStar}
		<svg
			width={diamondSize}
			height={diamondSize}
			viewBox="0 0 100 100"
			class="diamond half"
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="half-fill">
					<stop offset="50%" stop-color="var(--color-interactive)" />
					<stop
						offset="50%"
						stop-color="color-mix(in srgb, var(--color-interactive) 20%, transparent)"
					/>
				</linearGradient>
			</defs>
			<path d="M 50 5 L 95 50 L 50 95 L 5 50 Z" fill="url(#half-fill)" />
		</svg>
	{/if}

	{#each { length: emptyStars } as _, i (i + fullStars + (hasHalfStar ? 1 : 0))}
		<svg
			width={diamondSize}
			height={diamondSize}
			viewBox="0 0 100 100"
			class="diamond empty"
			aria-hidden="true"
		>
			<path d="M 50 5 L 95 50 L 50 95 L 5 50 Z" fill="currentColor" />
		</svg>
	{/each}
</div>

<style>
	.rating {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
	}

	.diamond {
		transition: transform 0.2s ease;
	}

	.diamond.filled {
		color: var(--color-interactive);
	}

	.diamond.empty {
		color: color-mix(in srgb, var(--color-interactive) 20%, transparent);
	}

	.diamond:hover {
		transform: scale(1.1);
	}

	@media (prefers-reduced-motion: reduce) {
		.diamond {
			transition: none;
		}

		.diamond:hover {
			transform: none;
		}
	}
</style>
