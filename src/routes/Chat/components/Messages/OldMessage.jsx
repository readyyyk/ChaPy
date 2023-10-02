import React from 'react';
import PropTypes from 'prop-types';

const OldMessage = ({children}) => {
    return (
        <div style={{
            opacity: .6,
            filter: 'contrast(60%)',
        }}>
            {children}
        </div>
    );
};

OldMessage.propTypes = {
    isOld: PropTypes.bool,
    children: PropTypes.object,
};

export default OldMessage;
