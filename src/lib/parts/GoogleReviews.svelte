<script>
	let { reviews } = $props();
</script>

<section class="py-12 sm:py-16 bg-white border-b border-slate-100 overflow-hidden">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="flex flex-col items-center text-center mb-8 sm:mb-12">
			<div
				class="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full text-amber-500 text-xs font-bold mb-3 shadow-sm"
			>
				<div class="flex gap-0.5">
					<i class="fa-solid fa-star"></i>
					<i class="fa-solid fa-star"></i>
					<i class="fa-solid fa-star"></i>
					<i class="fa-solid fa-star"></i>
					<i class="fa-solid fa-star"></i>
				</div>
				<span class="text-slate-700 ml-1">{reviews?.averageRating ?? '5'} / 5 sur Google</span>
			</div>
			<h2 class="font-display text-2xl sm:text-4xl font-extrabold text-ax-textDark tracking-tight max-w-xl">
				Les avis réels de mes (vrais) clients
			</h2>
		</div>

		<!-- Banner Container avec effet fondu latéral -->
		<div class="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
			<div class="flex w-max banner-track gap-4 sm:gap-6 py-2">
				{#each Array.from({ length: 2 }) as _}
					<div class="flex gap-4 sm:gap-6 shrink-0">
						{#each reviews?.reviews ?? [] as item}
							<div
								class="bg-ax-slate p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between w-[280px] sm:w-[350px] shrink-0 whitespace-normal"
							>
								<div class="flex flex-col gap-3">
									<div class="flex items-center justify-between">
										<div class="flex items-center gap-1 text-amber-400 text-xs">
											{#each Array.from({ length: item.rating ?? 5 }) as _}
												<i class="fa-solid fa-star"></i>
											{/each}
										</div>
										<span class="text-slate-400 text-[10px] sm:text-[11px] flex items-center gap-1 font-medium">
											<i class="fa-brands fa-google text-amber-500"></i> Avis vérifié
										</span>
									</div>

									<p class="text-xs sm:text-sm text-ax-textMuted leading-relaxed italic">
										"{item.comment}"
									</p>
								</div>

								<div class="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between">
									<span class="font-bold text-xs sm:text-sm text-ax-textDark">{item.reviewer}</span>
								</div>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.banner-track {
		animation: banner-scroll 35s linear infinite;
	}

	.banner-track:hover {
		animation-play-state: paused;
	}

	@keyframes banner-scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.banner-track {
			animation: none;
			overflow-x: auto;
		}
	}
</style>