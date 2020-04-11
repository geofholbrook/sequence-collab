import { PropTime } from "../Scheduler/Scheduler";
import { IPoint } from "@musicenviro/base";

export interface INoteContent {
    sequence: number;
    action: 'Add' | 'Delete'
    laneIndex: number;
    loopTime: PropTime
}

export interface IMessage {
    user: string;
    type: 'MousePosition' | 'NoteChange';
    content: IPoint | INoteContent
}