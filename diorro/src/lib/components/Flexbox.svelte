<script lang="ts">
	type GapToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	type Direction = 'row' | 'column';
	type Justify = 'start' | 'end' | 'center' | 'between' | 'around';
	type Align = 'start' | 'end' | 'center';

	interface Props {
		direction?: Direction;
		justify?: Justify;
		align?: Align;
		wrap?: boolean;
		gap?: GapToken | string;
		responsive?: boolean;
		fullWidth?: boolean;
		children?: import('svelte').Snippet;
		[key: string]: unknown;
	}

	let {
		direction = 'row',
		justify = 'center',
		align = 'center',
		wrap = false,
		gap = 'md',
		responsive = false,
		fullWidth = true,
		children,
		...restProps
	}: Props = $props();

	const gapTokens: GapToken[] = ['xs', 'sm', 'md', 'lg', 'xl'];

	const isToken = $derived(gapTokens.includes(gap as GapToken));
	const gapClass = $derived(isToken ? `gap-${gap}` : '');
	const customGap = $derived(!isToken ? gap : undefined);

	const classes = $derived(
		[
			'flexbox',
			'flex',
			direction === 'row' ? 'flex-row' : 'flex-col',
			`justify-${justify}`,
			`align-${align}`,
			wrap && 'flex-wrap',
			gapClass,
			responsive && 'responsive',
			fullWidth && 'w-full'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={classes} style:gap={customGap} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.responsive {
		flex-direction: column;
	}

	@media (min-width: 768px) {
		.responsive {
			flex-direction: row;
		}
	}
</style>
