import superagent from 'superagent';

import * as React from 'react'
import { loadSceneFromServer } from '../rest/scene';
// import { doJsonPost } from '../client/requests';

export function TestRequests() {
	async function loadWorkingScene() {
        const res = await loadSceneFromServer('geof', 'temp')
        console.log(res)
    }
    
    return (
        <div className="Screen TestRequestScreen">
        <header>api testing page</header>
        <div className="content">
            <button onClick={loadWorkingScene}>load geof working scene</button>
        </div>
    </div>
    )
}
