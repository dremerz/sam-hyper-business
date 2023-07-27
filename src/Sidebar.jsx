import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { faStreetView } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className='dashboard-page-one'>
      {/* <Link to={"/lol"}>lol kudi </Link> */}
      <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
        <div className="sidebar-menu-content">
          <ul className="nav nav-sidebar-menu sidebar-toggle-view">
            <div className="nav-item sidebar-nav-item">
              <div className="nav-link">
                <FontAwesomeIcon icon={faPersonCirclePlus} style={{ color: "#ffa404" }} /> &nbsp;&nbsp;
                <a id='sidebara' href='ADD-EMPLOYEE'>Add New Employee</a>
                {/* <Link to="/fgdfg">Home</Link> */}
               
              </div>
            </div>
            <div className="nav-item sidebar-nav-item">
              <div className="nav-link">
                <FontAwesomeIcon icon={faPeopleGroup} style={{ color: "#ffa404" }} /> &nbsp;&nbsp;
                <a id='sidebara' href='VIEW-EMPLOYEE'>View Employee Details</a>
              </div>
            </div>
            <div className="nav-item sidebar-nav-item">
              <div className="nav-link">
                <FontAwesomeIcon icon={faFingerprint} style={{ color: "#ffa404" }} /> &nbsp;&nbsp;
                <a id='sidebara' href='TAKE-ATTENDANCE'>Take Attendance</a>
              </div>
            </div>
            <div className="nav-item sidebar-nav-item">
              <div className="nav-link">
                <FontAwesomeIcon icon={faStreetView} style={{ color: '#ffa404' }} /> &nbsp;&nbsp;
                <a id='sidebara' href='VIEW-ATTENDANCE'>View Attendance</a>
              </div>
            </div>
            <div className="nav-item sidebar-nav-item">
              <div className="nav-link">
                <FontAwesomeIcon icon={faMoneyBill} style={{ color: "#ffa404" }} /> &nbsp;&nbsp;
                <a id='sidebara' href='SALARYANDTAX'>Salary & Tax Details</a>
              </div>
            </div>
            <div className="nav-item sidebar-nav-item">
              <div className="nav-link">
                <FontAwesomeIcon icon={faMoneyBillTransfer} style={{ color: "#ffa404" }} /> &nbsp;&nbsp;
                <span>Direct Deposit</span> &nbsp;&nbsp;<FontAwesomeIcon icon={faLock} />
              </div>
            </div>
            {/* Add other sidebar items here */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
