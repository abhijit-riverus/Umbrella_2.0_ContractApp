export const PAGEWATCHER = 'PAGEWATCHER';
export type PAGEWATCHER = typeof PAGEWATCHER; // To display or hide top menu bar in mobile

export interface PageWatcher {
    type: PAGEWATCHER;
    payload: {
        pageType: string;
    }
}

export type AppActions = PageWatcher;