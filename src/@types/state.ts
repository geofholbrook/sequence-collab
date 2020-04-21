/**
 * this file defines the state and the file format for scenes.
 * when we have to change it:
 *      1. copy the current definitions and identify by version number
 *      2. bump currentSceneVersion and make changes
 *      3. update backwardCompat function
 */

import { PropTime } from "./index";

export const currentSceneVersion = "0.0.1";

export interface ILane {
    synthName: string;
    loopTimes: PropTime[];
    muted: boolean;
    color: string;
}

export interface IScene {
    version: string;
    name: string;
    lanes: ILane[];
}
