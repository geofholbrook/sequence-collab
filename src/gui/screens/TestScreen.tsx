import * as React from 'react'
import { workingFileName } from '../../config';
import { requestLoad } from '../../bridge';
// import { doJsonPost } from '../client/requests';

export function TestRequests() {
	async function loadWorkingScene() {
        const res = await requestLoad({user: 'dev', fileName: workingFileName})
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
