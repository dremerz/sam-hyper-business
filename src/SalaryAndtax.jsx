import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  // Your Firebase config here...
  apiKey: "AIzaSyA95pWNegQN52jOC8gB2cs9s2BRMHbERR4",
  authDomain: "sam-hyper-business.firebaseapp.com",
  projectId: "sam-hyper-business",
  storageBucket: "sam-hyper-business.appspot.com",
  messagingSenderId: "644102757906",
  appId: "1:644102757906:web:50d98f81cb35e9e52842cb",
  measurementId: "G-F6J99L8CHG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function SalaryAndtax() {
  const [employeeData, setEmployeeData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchByName, setSearchByName] = useState('');
  const [searchById, setSearchById] = useState('');
  const [searchByPhone, setSearchByPhone] = useState('');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const employeeCol = collection(db, 'employeeDetails');
        const employeeSnapshot = await getDocs(employeeCol);
        const employees = employeeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEmployeeData(employees);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError('Error fetching employee data. Please try again.');
        setLoading(false);
      }
    };

    const fetchAttendanceData = async () => {
      try {
        const attendanceCol = collection(db, 'employeeAttendance');
        const attendanceSnapshot = await getDocs(attendanceCol);
        const attendanceData = attendanceSnapshot.docs.map((doc) => doc.data());
        setAttendanceData(attendanceData);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setError('Error fetching attendance data. Please try again.');
      }
    };

    fetchEmployeeData();
    fetchAttendanceData();
  }, []);

  // Function to calculate the number of present days for a specific employee
  const getPresentDays = (employeeId) => {
    return attendanceData.filter((data) => data.employeeid === employeeId && data.attendance === 'present').length;
  };

  // Function to calculate the number of absent days for a specific employee
  const getAbsentDays = (employeeId) => {
    return attendanceData.filter((data) => data.employeeid === employeeId && data.attendance === 'absent').length;
  };

  // Function to calculate the total days for a specific employee
  const getTotalDays = (employeeId) => {
    return attendanceData.filter((data) => data.employeeid === employeeId).length;
  };

  const filteredEmployeeData = employeeData.filter(
    (employee) =>
      employee.fullName.toLowerCase().includes(searchByName.toLowerCase()) &&
      (searchById === '' || employee.employeeId.includes(searchById)) &&
      (searchByPhone === '' || (employee.phoneNumber && employee.phoneNumber.includes(searchByPhone)))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-content-one" id="cont-1">
      <div className="breadcrumbs-area">
        <h3>Salary & Tax Details</h3>
      </div>

      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1"></div>

          <form className="mg-b-20">
            <div className="row gutters-8">
              <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group">
                <input
                  type="text"
                  placeholder="Search by Name ..."
                  className="form-control"
                  value={searchByName}
                  onChange={(e) => setSearchByName(e.target.value)}
                />
              </div>
              <div className="col-3-xxxl col-xl-3 col-lg-3 col-12 form-group">
                <input
                  type="text"
                  placeholder="Search by ID ..."
                  className="form-control"
                  value={searchById}
                  onChange={(e) => setSearchById(e.target.value)}
                />
              </div>
              <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
                <input
                  type="text"
                  placeholder="Search by Phone ..."
                  className="form-control"
                  value={searchByPhone}
                  onChange={(e) => setSearchByPhone(e.target.value)}
                />
              </div>
              <div className="col-1-xxxl col-xl-2 col-lg-3 col-12 form-group">
                <button
                  type="button"
                  style={{ textAlign: "center" }}
                  className="fw-btn-fill btn-gradient-yellow"
                >
                  SEARCH
                </button>
              </div>
            </div>
          </form>
          <div className="table-responsive">

          <table className="table display data-table text-nowrap">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Full Name</th>
            <th>Employee ID</th>
            <th>Phone Number</th>
            <th>Salary</th> {/* New column for displaying salary */}
            <th>Absent days</th>
            <th>Present days</th>
            
            <th>Total days</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through filteredEmployeeData */}
          {filteredEmployeeData.length ? (
            filteredEmployeeData.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.fullName}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.phoneNumber || 'N/A'}</td>
                <td>{employee.salary || 'N/A'}</td> {/* Display the salary or 'N/A' if not available */}
                <td>{getAbsentDays(employee.employeeId)}</td>
                <td>{getPresentDays(employee.employeeId)}</td>
               
                <td>{getTotalDays(employee.employeeId)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No matching employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
        </div>
      </div>
    </div>
  );
}
