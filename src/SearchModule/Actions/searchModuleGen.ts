import { SelectCase, SELECTCASE, EmptyResults, EMPTYRESULTS } from "./searchModuleDef";
import { SearchResult } from "../../Search/State/SearchState";

export default class SearchModuleGenerator {
    public static selectCase(searchCase: SearchResult): SelectCase {
        return {
            type: SELECTCASE,
            payload: {
                searchCase: searchCase
            }
        };
    }
    public static emptyResults(): EmptyResults {
        return {
            type: EMPTYRESULTS
        };
    }
}