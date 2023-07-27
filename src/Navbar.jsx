import React from 'react';

const Navbar = () => {
  return (
    
       <div className="navbar navbar-expand-md header-menu-one bg-light">
      <div className="nav-bar-header-one">
        <div className="header-logo">
          <div>
            <img src="img/dremerz-transparent-logo.png"  width={"180px"} alt="logo" />
          </div>
        </div>
        <div className="toggle-button sidebar-toggle">
          <button type="button" className="item-link">
            <span className="btn-icon-wrap">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
      <div className="d-md-none mobile-nav-bar">
         
        <button type="button" className="navbar-toggler sidebar-toggle-mobile">
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className="header-main-menu collapse navbar-collapse" id="mobile-navbar">
        <ul  id='navbar-nav'>
        <div id='sam-hyper-business' >Sam Hyper Business Private Limited</div>
        </ul>
        <ul className="navbar-nav">
          <li className="navbar-item dropdown header-admin">
            <div className="navbar-nav-link dropdown-toggle"  data-toggle="dropdown" aria-expanded="false">
              <div className="admin-title">
                <h5 className="item-title">S.H.B</h5>
                <span>Admin</span>
              </div>
              <div className="admin-img">
                <img src="img/figure/admin.jpg" alt="Admin" />
              </div>
            </div>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="item-header">
                <h6 className="item-title">Steven Zone</h6>
              </div>
              
            </div>
          </li>
          {/* Add other navbar items here */}
        </ul>
      </div>
    </div>
  
 
  );
};

export default Navbar;
