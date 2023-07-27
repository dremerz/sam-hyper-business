import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
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

export default function TakeAttendance() {
  const [employeeData, setEmployeeData] = useState([""]);
  const [attendanceData, setAttendanceData] = useState([]); // Initialize attendanceData with an empty array

  useEffect(() => {
    const fetchData = async () => {
      const itemsCol = collection(db, 'employeeDetails');
      const itemSnapshot = await getDocs(itemsCol);
      const data = itemSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEmployeeData(data);
    };

    fetchData();
  }, []);

  const handleAttendanceChange = (e, id) => {
    if (e.target.checked) {
      // Mark employee as absent
      setAttendanceData((prevAttendance) => [...prevAttendance, id]);
    } else {
      // Mark employee as present
      setAttendanceData((prevAttendance) => prevAttendance.filter((absentId) => absentId !== id));
    }
  };

  const handleSubmitAttendance = async (e) => {
    e.preventDefault();

    try {
      const attendanceCol = collection(db, 'employeeAttendance');
      const date = new Date().toISOString();

      // Loop through all employees and add their data to the attendanceData array
      const attendanceDataArray = employeeData.map((employee) => {
        const attendanceStatus = attendanceData.includes(employee.id) ? 'absent' : 'present';
        return {
          name: employee.fullName,
          employeeid: employee.employeeId,
          attendance: attendanceStatus,
          date: date,
        };
      });

      // Add the attendance data to the "employeeAttendance" collection one by one
      await Promise.all(attendanceDataArray.map((data) => addDoc(attendanceCol, data)));

      // Reset the attendanceData state after saving
      setAttendanceData([]);

      alert('Attendance saved successfully!');
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Error saving attendance. Please try again.');
    }
  };


  return (
    <div className="dashboard-content-one" id="cont-1">
       <div className="breadcrumbs-area">
    <h3>  Take Employee Attendance</h3>
   
  </div>

  <div className="card height-auto">
    <div className="card-body">
      <div className="heading-layout1">
        
        
      </div>
      <table className="table display data-table text-nowrap">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Full Name</th>
            <th>Employee ID</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {employeeData!=""? employeeData.map((employee, index) => (
            <tr key={employee.id}>
              <td>{index + 1}</td>
              <td>{employee.fullName}</td>
              <td>{employee.employeeId}</td>
              <td>
                <input
                  type="checkbox"
                  checked={attendanceData.includes(employee.id)}
                  onChange={(e) => handleAttendanceChange(e, employee.id)}
                />
              </td>
            </tr>
          )):"Loading..."}
        </tbody>
      </table>
      <div style={{textAlign:"right",alignItems:"right"}}>
      <button  onClick={handleSubmitAttendance}>Save Attendance</button>

      </div>
    </div>
    </div></div>
  );
}
