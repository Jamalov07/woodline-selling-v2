export function getMostFrequentStorehouseId(carts: any[]): string | null {
	const storehouseIds = carts.map((c) => c.sps?.sp?.storehouseId).filter((id): id is string => Boolean(id)) // type guard bilan

	const storehouseIdCounts = storehouseIds.reduce(
		(acc, id) => {
			acc[id] = (acc[id] || 0) + 1
			return acc
		},
		{} as Record<string, number>,
	)

	let mostFrequentId: string | null = null
	let maxCount = 0

	for (const [id, count] of Object.entries(storehouseIdCounts)) {
		if (typeof count === 'number' && count > maxCount) {
			mostFrequentId = id
			maxCount = count
		}
	}

	return mostFrequentId
}
