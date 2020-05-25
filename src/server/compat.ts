

export const currentVersion = '0.4.0'

const versionHistory = [
    {
        version: "0.4.0",
        date: "2020/05/25",
    },
    {
        version: "0.3.1",
        date: "2020/05/24"
    }
] 

function convertOldScene(rawScene: any) {
    // if the scene 
}


// function convertTo_0_3_1(rawScene: any): IScene {
// 	if (rawScene.version < '0.2.1') {
// 		return {
// 			name: rawScene.name,
// 			version: currentSceneVersion,
// 			reduxState: getStateToSave(initialState),
// 		};
// 	} else if (rawScene.version < '0.3') {
// 		return {
// 			...rawScene,
// 			reduxState: {
// 				...getStateToSave(initialState),
// 				...rawScene.reduxState,
// 				lanes: (rawScene.reduxState as IReduxState).lanes.map(lane => {
// 					const drumLane = lane as ISingleNoteLane & { loopTimes: PropTime[] }
// 					if (lane.laneType === 'SingleNoteLane') {
// 						// convert from an assumed-4/4 16th note grid with prop times
// 						const result: ISingleNoteLane = {
// 							rhythmTree: tree44,
// 							...lane,
// 							treeLoopTimes: getRhythmPoints(tree44).map(p => p.position),
// 							notes: drumLane.loopTimes.map(time => ({
// 								treePointIndex: time * 16
// 							}))
// 						}
// 						return result
// 					} else {
// 						return lane
// 					}
// 				})
// 			},
// 			version: currentSceneVersion,
// 		}
// 	} else {
// 		return {
// 			...rawScene,
// 			reduxState: {
// 				...getStateToSave(initialState),
// 				...rawScene.reduxState,
// 				// masterRhythmTree: initialState.masterRhythmTree,
// 			},
// 			version: currentSceneVersion,
// 		}

// 		// return {
// 		// 	...rawScene,
// 		// 	lanes: rawScene.lanes.map((lane:any) => !!lane.laneId ? lane : {
// 		// 		...lane,
// 		// 		laneId: uuid()
// 		// 	})
// 		// }

// 		// this doesn't work
// 		// return {
// 		// 	...rawScene,
// 		// 	reduxState: {
// 		// 		...rawScene.reduxState,
// 		// 		lanes: rawScene.lanes.map((lane: any) => laneBackwardCompat(lane, rawScene.version)),
// 		// 	},
// 		// };
// 	}
// }