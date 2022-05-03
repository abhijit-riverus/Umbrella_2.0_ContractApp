export default interface AppState {
    pageType: string;
}

export function defaultAppState(): AppState {
    return {
        pageType: ''
    };
}