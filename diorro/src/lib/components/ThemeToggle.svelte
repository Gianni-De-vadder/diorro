<script lang="ts">
	import { browser } from '$app/environment';

	let theme = $state<'light' | 'dark'>('light');

	$effect(() => {
		if (!browser) return;

		const stored = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		const initialTheme =
			stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light';

		theme = initialTheme;
		document.documentElement.setAttribute('data-theme', initialTheme);
	});

	function toggleTheme() {
		if (!browser) return;

		const newTheme = theme === 'light' ? 'dark' : 'light';
		theme = newTheme;

		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	}
</script>

<button
	class="theme-toggle"
	onclick={toggleTheme}
	type="button"
	aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
	title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
>
	{#if theme === 'light'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="5"></circle>
			<line x1="12" y1="1" x2="12" y2="3"></line>
			<line x1="12" y1="21" x2="12" y2="23"></line>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
			<line x1="1" y1="12" x2="3" y2="12"></line>
			<line x1="21" y1="12" x2="23" y2="12"></line>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		padding: var(--space-xs);
		background: transparent;
		border: 2px solid var(--color-interactive);
		border-radius: 50%;
		color: var(--color-interactive);
		cursor: pointer;
	}

	@media (prefers-reduced-motion: no-preference) {
		.theme-toggle {
			transition: all 0.3s ease;
		}

		.theme-toggle:hover {
			transform: rotate(15deg) scale(1.05);
		}
	}

	.theme-toggle:hover {
		background-color: var(--color-interactive);
		color: var(--button-text);
	}

	.theme-toggle:active {
		transform: scale(0.95);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--color-interactive);
		outline-offset: 4px;
	}

	.theme-toggle svg {
		width: 24px;
		height: 24px;
	}
</style>
