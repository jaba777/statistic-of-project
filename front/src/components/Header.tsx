import React from 'react'
import './Header.scss';
import {Link,NavLink} from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header className="header">
        <section className="header-section">
          <div className="logo">
            <h1>to do</h1>
          </div>
          <div className="menuIcon">
          
          </div>
          <div className="lists">
           
          <ul>
              <li><NavLink to='/' 
              style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white' })}>Home</NavLink></li>
             
              <li><NavLink to='/pie-chart' 
              style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white' })}>Pie chart</NavLink></li>
              
            </ul>
          </div>
        </section>
      </header>
    </>
  )
}

export default Header
