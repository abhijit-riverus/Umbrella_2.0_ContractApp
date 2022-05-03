import { TOGGLESEARCHBARVISIBLESTATE, ChangeText, TEXTCHANGE, ToggleSearchBarVisibility } from "./def";

export default class SearchBarActionGenerator {
    public static toggleVisibility(visibility: boolean): ToggleSearchBarVisibility {
        return {
            type: TOGGLESEARCHBARVISIBLESTATE,
            payload: {
                visibility: visibility
            }
        };
    }
    public static changeText(term: string): ChangeText {
        return {
            type: TEXTCHANGE,
            payload: {
                term: term
            }
        };
    }
}