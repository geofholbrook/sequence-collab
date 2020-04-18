export type Seconds = number;
export type PropTime = number; // proportional time (0 - 1)

export interface ICreateUserRequestBody {
    name: string;
}

export interface ILane {
	synthName: string;
	loopTimes: PropTime[];
	muted: boolean;
}

export interface IUserData {
    name: string;
    savedPatterns: {[index: string]: ILane[]}
}