import React from 'react';
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/">Disburse/</NavLink>
          <NavLink to="/about">About</NavLink>
       </div>
    );
}

export default Navigation;