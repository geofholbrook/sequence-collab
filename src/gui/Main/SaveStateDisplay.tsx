import React from 'react';
import { SaveState } from '../../@types';
export function SaveStateDisplay(props: {
	saveState: SaveState;
}) {
	return props.saveState === 'Clean' ? null : (<span className="unsaved-alert">
		{props.saveState === 'WaitingForSave' ? 'SAVING' : 'UNSAVED CHANGES'}
	</span>);
}
