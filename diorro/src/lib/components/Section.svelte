<script lang="ts">
	type Height = 'full' | 'half' | 'auto';
	type BackgroundColor = 'primary' | 'secondary';
	type PaddingTop = 'none' | 'sm' | 'md' | 'lg' | 'xl';

	interface Props {
		height?: Height;
		backgroundColor?: BackgroundColor;
		paddingTop?: PaddingTop;
		children?: import('svelte').Snippet;
		class?: string;
	}

	let {
		height = 'auto',
		backgroundColor = 'primary',
		paddingTop = 'none',
		children,
		class: className = ''
	}: Props = $props();

	const heightClass = $derived(
		{
			full: 'h-screen-safe',
			half: 'h-half-safe',
			auto: 'h-auto'
		}[height]
	);

	const bgClass = $derived(`section-bg-${backgroundColor}`);

	const paddingClass = $derived(
		{
			none: '',
			sm: 'pt-fluid-sm',
			md: 'pt-fluid-md',
			lg: 'pt-fluid-lg',
			xl: 'pt-fluid-xl'
		}[paddingTop]
	);

	const classes = $derived(
		[
			'section',
			'flex',
			'flex-col',
			'justify-center',
			'align-center',
			'px-fluid',
			heightClass,
			bgClass,
			paddingClass,
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<section class={classes}>
	{#if children}
		{@render children()}
	{/if}
</section>

<style>
	.section {
		box-sizing: border-box;
		overflow-x: hidden;
		position: relative;
		max-width: 75vw;
		margin: auto;
	}

	.section-bg-primary {
		background-color: var(--color-bg-primary);
	}

	.section-bg-secondary {
		background-color: var(--color-bg-secondary);
	}

	@media (max-width: 480px) {
		.section-bg-primary,
		.section-bg-secondary {
			background-color: transparent;
		}
	}
</style>
