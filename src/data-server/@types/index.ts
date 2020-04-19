import { PropTime } from "../../@types";

export interface ICreateUserParams {
    name: string;
}

export interface ICreateUserResponse {
    success: boolean;
    message: string;
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