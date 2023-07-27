import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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

export function useEmployeeAttendanceData() {
  const [employeeData, setEmployeeData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { employeeData, attendanceData, loading, error };
}
