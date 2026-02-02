<!-- src/lib/components/Button.svelte -->
<script>
	let {
		variant = 'primary',
		size = 'medium',
		href = null,
		type = 'button',
		disabled = false,
		fullWidth = false,
		loading = false,
		onclick = null,
		children,
		...restProps
	} = $props();

	// CORRECTION : Utiliser $derived pour rendre Tag réactif
	const Tag = $derived(href ? 'a' : 'button');
</script>

<svelte:element
	this={Tag}
	class="btn btn-{variant} btn-{size}"
	class:btn-full={fullWidth}
	class:btn-loading={loading}
	{href}
	type={href ? undefined : type}
	disabled={disabled || loading}
	{onclick}
	role={href ? 'button' : undefined}
	aria-disabled={disabled || loading}
	{...restProps}
>
	{#if loading}
		<span class="spinner" aria-hidden="true"></span>
	{/if}
	<span class="btn-content" class:btn-content-loading={loading}>
		{@render children()}
	</span>
</svelte:element>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		font-family: 'Inter', var(--primitive-font-family-sans);
		font-weight: var(--font-weight-medium);
		text-decoration: none;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
		white-space: nowrap;
		user-select: none;
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-interactive);
		outline-offset: 2px;
	}

	/* Variants */
	.btn-primary {
		background-color: var(--button-bg);
		color: var(--button-text);
	}

	.btn-primary:hover:not(:disabled) {
		background-color: var(--button-bg-hover);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px color-mix(in srgb, var(--primitive-navy) 30%, transparent);
	}

	.btn-primary:active:not(:disabled) {
		transform: translateY(0);
	}

	.btn-secondary {
		background-color: var(--color-bg-secondary);
		color: var(--color-text-primary);
		border: 1px solid var(--primitive-gray-50);
	}

	.btn-secondary:hover:not(:disabled) {
		background-color: var(--primitive-gray-50);
		border-color: color-mix(in srgb, var(--primitive-charcoal) 20%, transparent);
	}

	.btn-outline {
		background-color: transparent;
		color: var(--color-interactive);
		border: 2px solid var(--color-interactive);
	}

	.btn-outline:hover:not(:disabled) {
		background-color: var(--color-interactive);
		color: var(--primitive-white);
	}

	.btn-ghost {
		background-color: transparent;
		color: var(--color-interactive);
	}

	.btn-ghost:hover:not(:disabled) {
		background-color: var(--color-bg-secondary);
	}

	/* Sizes */
	.btn-small {
		padding: var(--space-xs) var(--space-md);
		font-size: var(--text-sm);
		min-height: 36px;
	}

	.btn-medium {
		padding: var(--button-padding);
		font-size: var(--text-base);
		min-height: 44px;
	}

	.btn-large {
		padding: var(--space-md) var(--space-xl);
		font-size: var(--text-lg);
		min-height: 52px;
	}

	/* States */
	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none !important;
	}

	.btn-full {
		width: 100%;
	}

	.btn-loading {
		cursor: wait;
	}

	.btn-content {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.btn-content-loading {
		opacity: 0.7;
	}

	/* Spinner pour état loading */
	.spinner {
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 2px solid currentColor;
		border-top-color: transparent;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
