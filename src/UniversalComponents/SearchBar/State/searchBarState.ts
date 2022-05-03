export default interface SearchBarState {
    visibility: boolean;
    term: string;
} 

export function defaultSearchBarState(): SearchBarState {
    return {
        visibility: false,
        term: ''
    }
}