export const TOGGLESEARCHBARVISIBLESTATE = 'TOGGLESEARCHBARVISIBLESTATE';
export type TOGGLESEARCHBARVISIBLESTATE = typeof TOGGLESEARCHBARVISIBLESTATE;

export const TEXTCHANGE = 'TEXTCHANGE';
export type TEXTCHANGE = typeof TEXTCHANGE;

export interface ToggleSearchBarVisibility {
    type: TOGGLESEARCHBARVISIBLESTATE;
    payload: {
        visibility: boolean;
    };
}
export interface ChangeText {
    type: TEXTCHANGE;
    payload: {
        term: string;
    };
}

export type SearchBarActions = ToggleSearchBarVisibility |
    ChangeText ;