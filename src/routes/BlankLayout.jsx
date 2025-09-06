// BlankLayout.jsx
import React from 'react';

const BlankLayout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>
            {children}
        </div>
    );
};

export default BlankLayout;
