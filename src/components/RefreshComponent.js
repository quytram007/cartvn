import React from 'react';

// set the defaults
const refreshComponent = React.createContext({
    refresh: '',
    setRefresh: () => {},
    search: '',
    setSearch: () => {},
    ai: '',
    setAi: () => {},
});

export default refreshComponent;
