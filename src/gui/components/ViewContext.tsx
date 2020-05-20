import React from 'react';
import { ViewMode } from './types';
export const ViewContext = React.createContext<
	[ViewMode, React.Dispatch<React.SetStateAction<ViewMode>> | null]
>(['None', null]);
