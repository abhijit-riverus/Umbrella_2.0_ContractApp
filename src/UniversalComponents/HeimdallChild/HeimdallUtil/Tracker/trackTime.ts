import { TimeState } from './state';

const timeState: TimeState = {
    page: '',
    start: 0,
    end: 0
};

export default class TrackTime {
    public static startTime(page: string, time: any) {
        timeState.page = page;
        timeState.start = time;
    }
    public static endTime(time: any) {
        timeState.end = time;
    }
}