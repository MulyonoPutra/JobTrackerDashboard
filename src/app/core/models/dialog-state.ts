export interface DialogState<T = any | undefined> {
	id: string | null;
	isEmpty: boolean;
	items: T;
	title: string;
}
