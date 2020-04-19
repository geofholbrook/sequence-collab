import superagent from 'superagent';
import * as React from 'react'
import { doJsonPost } from '../client/requests';




export function TestRequests() {
	async function createUser() {
        const res = await doJsonPost('/create-user', { name: 'anonymous' })
        console.log(res)
    }
    
    return (
        <div className="Screen TestRequestScreen">
        <header>api testing page</header>
        <div className="content">
            <button onClick={createUser}>create user</button>
        </div>
    </div>
    )
}
