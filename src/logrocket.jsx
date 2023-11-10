import React from 'react';

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';


const Logrocket = () => {
    LogRocket.init(import.meta.env.VITE_LOGROCKET_ID);
    setupLogRocketReact(LogRocket);
    LogRocket.identify(Date.now().toString());
    return (<> </>);
};

export default Logrocket;


