import { PAGEWATCHER, PageWatcher } from "./def";

export default class AppActionGenerator {
    public static pageWatcher(pageType: string): PageWatcher {
        return {
            type: PAGEWATCHER,
            payload: {
                pageType: pageType
            }
        }
    }
}