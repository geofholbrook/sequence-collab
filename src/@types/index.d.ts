import { PropTime } from "../Scheduler/Scheduler";




export interface INoteContent {
    sequence: number;
    action: 'Add' | 'Delete'
    instrument: number;
    loopTime: PropTime
}

export interface IMessage {
    user: string;
    type: 'MousePosition' | 'NoteChange';
    content: IPoint | INoteContent
}