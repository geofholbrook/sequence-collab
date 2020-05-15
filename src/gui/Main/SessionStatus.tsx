import React from 'react';
import { ISession } from '../../@types';


export function SessionStatus(props: { sessionInfo: ISession | null; user: string }) {
	if (!props.sessionInfo) return null;

	if (props.sessionInfo.host === props.user) {
		if (props.sessionInfo.guests.length > 0) {
			return (
				<span className="session-status">
					hosting <span className="user-list">{props.sessionInfo.guests.join()}</span>
				</span>
			);
		} else {
			return null;
		}
	} else {
		return (
			<span className="session-status">
				hosted by <span className="user-list">{props.sessionInfo.host}</span>
			</span>
		);
	}
}
