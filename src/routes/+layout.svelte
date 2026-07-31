<script>
	import './layout.css';
	import favicon from '$lib/assets/logo.svg';
	import { onMount } from 'svelte';
	import logo from '$lib/assets/logo.svg';

	let { children } = $props();

	let mBtn;
	let mMenu;

	onMount(() => {
		mBtn = document.getElementById('mobile-menu-btn');
		mMenu = document.getElementById('mobile-menu');
		mBtn.addEventListener('click', () => mMenu.classList.toggle('hidden'));
		document.querySelectorAll('#mobile-menu a').forEach((link) => {
			link.addEventListener('click', () => mMenu.classList.add('hidden'));
		});
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-20">
			<!-- Logo Left: Combined text in dark blue -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-3">
					<img src={logo} class="w-20 h-20" />
					<div class="flex flex-col">
						<span
							class="font-display text-2xl font-extrabold tracking-tight leading-tight text-[#0F4585]"
						>
							Audaxem Conseil
						</span>
					</div>
				</a>
			</div>

			<!-- Desktop Nav Tabs (Accueil, Services, A propos, Contact) -->
			<div class="hidden md:flex items-center space-x-8">
				<a
					href="/"
					class="text-ax-textMuted hover:text-ax-primary font-semibold text-sm transition-colors"
					>Accueil</a
				>
				<a
					href="#services"
					class="text-ax-textMuted hover:text-ax-primary font-semibold text-sm transition-colors"
					>Services</a
				>
				<a
					href="#a-propos"
					class="text-ax-textMuted hover:text-ax-primary font-semibold text-sm transition-colors"
					>À propos</a
				>
				<a
					href="#contact"
					class="text-ax-textMuted hover:text-ax-primary font-semibold text-sm transition-colors"
					>Contact</a
				>

				<div class="h-6 w-px bg-slate-200"></div>

				<a
					href="tel:0603962664"
					class="text-[#0F4585] font-display text-sm flex items-center gap-2"
				>
					<i class="fa-solid fa-phone text-ax-primary text-xs"></i> 06 03 96 26 64
				</a>
				<a
					href="#contact"
					class="bg-ax-primary hover:bg-ax-royal text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all uppercase tracking-wide"
				>
					Prendre RDV
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<div class="flex items-center md:hidden">
				<button
					id="mobile-menu-btn"
					class="text-[#254789] hover:text-ax-primary focus:outline-none"
				>
					<i class="fa-solid fa-bars text-2xl"></i>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	<div
		id="mobile-menu"
		class="hidden md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-3 shadow-lg"
	>
		<a href="/" class="block py-2 text-ax-textDark hover:text-ax-primary font-semibold text-sm"
			>Accueil</a
		>
		<a
			href="#services"
			class="block py-2 text-ax-textDark hover:text-ax-primary font-semibold text-sm">Services</a
		>
		<a
			href="#a-propos"
			class="block py-2 text-ax-textDark hover:text-ax-primary font-semibold text-sm">À propos</a
		>
		<a
			href="#contact"
			class="block py-2 text-ax-textDark hover:text-ax-primary font-semibold text-sm">Contact</a
		>
		<hr class="border-slate-100 my-2" />
		<a href="tel:0603962664" class="block py-2 text-slate-700 font-display text-sm"
			><i class="fa-solid fa-phone text-ax-primary mr-1"></i> 06 03 96 26 64</a
		>
		<a
			href="#contact"
			class="block text-center bg-ax-primary text-white py-3 rounded-xl hover:bg-ax-royal transition-colors uppercase font-bold text-xs"
			>Prendre RDV</a
		>
	</div>
</nav>

{@render children()}

<footer class="bg-ax-deep text-slate-400 pt-16 pb-8 border-t border-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-12 mb-12">
			<!-- Branding -->
			<div class="space-y-4">
				<div class="flex items-center space-x-3">
					<img src={logo} class="w-14 h-14" />
					<span class="font-display text-base uppercase font-extrabold text-white tracking-tight">
						Audaxem Conseil
					</span>
				</div>
				<p class="text-xs text-slate-400 leading-relaxed">
					Cabinet d'expertise-comptable moderne et axé sur le digital. Il propose un accompagnement
					sur mesure pour optimiser votre gestion comptable, financière et fiscale. Son objectif est
					de vous faire gagner du temps et de la sérénité pour développer votre activité.
				</p>
			</div>

			<!-- Coordinates Place Gambetta -->
			<div class="space-y-4">
				<h4 class="text-white font-display font-bold text-xs uppercase tracking-wider">
					Le Cabinet
				</h4>
				<ul class="space-y-3 text-xs text-slate-400 font-display">
					<li class="flex items-start gap-2">
						<i class="fa-solid fa-map-location-dot text-ax-primary mt-1"></i>
						<span>35 Place Gambetta,<br />33000 Bordeaux</span>
					</li>
					<li class="flex items-center gap-2">
						<i class="fa-solid fa-phone text-ax-primary"></i>
						<a href="tel:0603962664">06 03 96 26 64</a>
					</li>
					<li class="flex items-center gap-2">
						<i class="fa-solid fa-envelope text-ax-primary"></i>
						<a href="mailto:yaniv.c@audaxem-conseil.fr">yaniv.c@audaxem-conseil.fr</a>
					</li>
				</ul>
			</div>

			<!-- Specialties Links -->
			<div class="space-y-4">
				<h4 class="text-white font-display font-bold text-xs uppercase tracking-wider">Domaines</h4>
				<ul class="space-y-2 text-xs text-slate-400 font-display">
					<li>
						<a href="/" class="hover:text-white transition-colors">Accueil</a>
					</li>
					<li>
						<a href="#services" class="hover:text-white transition-colors">Services</a>
					</li>
					<li>
						<a href="#a-propos" class="hover:text-white transition-colors">À propos</a>
					</li>
					<li>
						<a href="#contact" class="hover:text-white transition-colors">Contact</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom footer info -->
		<div
			class="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-display text-slate-600 gap-4"
		>
			<p>&copy; 2026 Audaxem Conseil. Dirigé par Yaniv Choukroun. Tous droits réservés.</p>
			<div class="flex gap-4">
				<a href="/mentions-legales" class="hover:text-white transition-colors">Mentions Légales</a>
			</div>
		</div>
	</div>
</footer>
