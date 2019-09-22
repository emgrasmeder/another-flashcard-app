import React from 'react';
import './Home.css';
import SideNav from './SideNav';
import Search from './Search';
import ActivePage from "./ActivePage";
import Cards from "./Cards";

const App = () => (
            <div>
                <SideNav>
                    <Search/>
                </SideNav>
                <ActivePage>
                    <Cards/>
                </ActivePage>
            </div>
        );

export default App;
