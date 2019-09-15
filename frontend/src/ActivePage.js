import React from 'react';
import './ActivePage.css';

const ActivePage = (props) => (
    <div className={'ActivePage'}>
        {props.children}
    </div>
);

export default ActivePage;
