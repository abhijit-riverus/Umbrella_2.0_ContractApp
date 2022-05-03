import { AggregateState } from "../State/AggregatesState";

export interface Props {
    type: string;
    data: AggregateState;
    clickedStatus: boolean;
}
export default class SortUtils {
    public static SortedDataGenerator(props: Props) {
        if (props.type === 'alphabetical') {
            if (props.clickedStatus) {
                props.data.children.sort(function (a: any, b: any) {
                    if (a.value < b.value) { return 1; }
                    if (a.value > b.value) { return -1; }
                    return 0;
                });
            } else {
                props.data.children.sort(function (a: any, b: any) {
                    if (a.value > b.value) { return 1; }
                    if (a.value < b.value) { return -1; }
                    return 0;
                });
            }
        }
        return props.data;
    }
}