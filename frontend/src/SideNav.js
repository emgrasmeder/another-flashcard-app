import React from 'react';
import './SideNav.css';

const SideNav = (props) => (
    <div className={'SideNav'}>
      {props.children}
    </div>
);

export default SideNav;