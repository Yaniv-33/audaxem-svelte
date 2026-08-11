<script>
	let {reviews} = $props()
	$inspect(reviews)
</script>

<section class="py-14 bg-white border-b border-slate-100">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="flex flex-col items-center text-center mb-10">
			<div
				class="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full text-amber-500 font-display text-xs font-bold mb-3 shadow-sm"
			>
				<i class="fa-solid fa-star"></i>
				<i class="fa-solid fa-star"></i>
				<i class="fa-solid fa-star"></i>
				<i class="fa-solid fa-star"></i>
				<i class="fa-solid fa-star"></i>
				<span class="text-slate-700 ml-1">5.0 / 5 sur Google Reviews</span>
			</div>
			<h2
				class="font-display text-2xl sm:text-3xl font-extrabold text-ax-textDark tracking-tight"
			>
				Les avis réels de mes (vrais) clients
			</h2>
		</div>

		<!-- Reviews Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each reviews as item, index}
				<div
					class="bg-ax-slate p-6 rounded-2xl border border-slate-200/50 shadow-sm flex flex-col justify-between"
				>
					<div>
						<div class="flex items-center gap-1 text-amber-400 text-xs mb-3">
							<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
								class="fa-solid fa-star"
							></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
						</div>
						<p class="text-xs text-ax-textMuted leading-relaxed italic">
							"
							{@html item.comment.split('\n')[0]}
							"
						</p>
					</div>
					<div
						class="mt-4 pt-4 border-t border-slate-200/40 flex items-center justify-between text-[11px]"
					>
						<span class="font-bold text-ax-textDark">{item.reviewer}</span>
						<span class="text-slate-400 font-display text-[10px] flex items-center gap-1"
							><i class="fa-brands fa-google text-amber-500"></i> Avis vérifié</span
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>