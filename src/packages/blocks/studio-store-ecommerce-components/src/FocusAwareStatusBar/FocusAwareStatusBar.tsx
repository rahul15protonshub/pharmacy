import * as React from 'react';
import { StatusBar } from 'react-native';

const FocusAwareStatusBar = (props:any) => {
    return props.isFocused ? <StatusBar {...props} /> : null;
}

export default FocusAwareStatusBar;