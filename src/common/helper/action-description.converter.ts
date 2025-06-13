const ACTION_DESCRIPTIONS = {}

export function actionDescriptionConverter(action: string): string {
	return ACTION_DESCRIPTIONS[action] ?? `Noma'lum harakat`
}
