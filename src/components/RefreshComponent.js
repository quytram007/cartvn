import React from 'react';

// set the defaults
const refreshComponent = React.createContext({
    refresh: '',
    setRefresh: () => {},
});

export default refreshComponent;
