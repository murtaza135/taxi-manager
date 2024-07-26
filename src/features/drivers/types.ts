export const views = ['notRetired', 'retired'] as const;
export type ViewState = typeof views[number];
