import { SearchResult } from "../../Search/State/SearchState";

export const SELECTCASE = 'SELECTCASE';
export type SELECTCASE = typeof SELECTCASE;

export const EMPTYRESULTS = 'EMPTYRESULTS';
export type EMPTYRESULTS = typeof EMPTYRESULTS;

export interface SelectCase {
    type: SELECTCASE;
    payload: {
        searchCase: SearchResult;
    }
}


export interface EmptyResults {
    type: EMPTYRESULTS;
}
export type SearchModuleAction = 
    SelectCase |
    EmptyResults;