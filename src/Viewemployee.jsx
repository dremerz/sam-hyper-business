import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc  } from 'firebase/firestore/lite';

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

export default function Viewemployee() {


  const [employeeData, setEmployeeData] = useState([""]);


  const handleInputChange = (e, id, field) => {
    // Find the employee in the data by ID
    const updatedData = employeeData.map((employee) => {
      if (employee.id === id) {
        // Update the specific field with the new value
        return { ...employee, [field]: e.target.value };
      }
      return employee;
    });
  
    // Update the employeeData state with the updated data
    setEmployeeData(updatedData);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const employeeRef = doc(db, 'employeeDetails', id);
      await updateDoc(employeeRef, updatedData);
      // Update the employeeData state to reflect the changes
      setEmployeeData((prevData) =>
        prevData.map((employee) => (employee.id === id ? { ...employee, ...updatedData } : employee))
      );
      alert('Employee data updated successfully!');
    } catch (error) {
      console.error('Error updating employee data:', error);
      alert('Error updating employee data. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete the employee record from Firestore
      const employeeRef = doc(db, 'employeeDetails', id);
      await deleteDoc(employeeRef);

      // Update the employeeData state to remove the deleted employee
      setEmployeeData((prevData) => prevData.filter((employee) => employee.id !== id));

      alert('Employee data deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee data:', error);
      alert('Error deleting employee data. Please try again.');
    }
  };

// ... (imports and other code)

// ... (imports and other code)

const handleUpdateAll = async () => {
  try {
    for (const employee of employeeData) {
      const employeeRef = doc(db, 'employeeDetails', employee.id);
      await updateDoc(employeeRef, {
        fullName: employee.fullName,
        employeeId: employee.employeeId,
        gender: employee.gender,
        dateOfBirth: employee.dateOfBirth,
        address: employee.address,
        phoneNumber: employee.phoneNumber,
        emailAddress: employee.emailAddress,
        maritalStatus: employee.maritalStatus,
        nationalIdNumber: employee.nationalIdNumber,
        passportInfo: employee.passportInfo,
        emergencyContact: employee.emergencyContact,
        bankName: employee.bankName, // New field - Bank Name
        bankAccountNumber: employee.bankAccountNumber, // New field - Bank Account Number
        accountType: employee.accountType, // New field - Account Type
        bankBranch: employee.bankBranch, // New field - Bank Branch
        ifscCode: employee.ifscCode, // New field - IFSC Code
        swiftCode: employee.swiftCode, // New field - SWIFT/BIC Code (for international transactions)
        bankAddress: employee.bankAddress, // New field - Bank Address
        micrCode: employee.micrCode, // New field - MICR Code
        pt: employee.pt, // New field - Professional Tax (PT)
        pf: employee.pf, // New field - Provident Fund (PF)
        esi: employee.esi, // New field - Employee State Insurance (ESI)
        residencyStatus: employee.residencyStatus,
        employmentStartDate: employee.employmentStartDate,
        employmentStatus: employee.employmentStatus,
        jobTitle: employee.jobTitle,
        department: employee.department,
        reportingManager: employee.reportingManager,
        salary: employee.salary
      });
    }

    alert('All employee data updated successfully!');
  } catch (error) {
    console.error('Error updating employee data:', error);
    alert('Error updating employee data. Please try again.');
  }
};

// ... (rest of the code)

// ... (rest of the code)



// ... (inside the component)
const [searchById, setSearchById] = useState('');
const [searchByName, setSearchByName] = useState('');
const [searchByPhone, setSearchByPhone] = useState('');
useEffect(() => {
  const fetchData = async () => {
    const itemsCol = collection(db, 'employeeDetails');
    const itemSnapshot = await getDocs(itemsCol);
    const data = itemSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Filter the data based on search values
    const filteredData = data.filter((employee) => {
      return (
        employee.employeeId.includes(searchById) &&
        employee.fullName.toLowerCase().includes(searchByName.toLowerCase()) &&
        employee.phoneNumber.includes(searchByPhone)
      );
    });

    setEmployeeData(filteredData);
  };

  fetchData();
}, [searchById, searchByName, searchByPhone]);

// ... (rest of the code)


  return (
    // <div>
    //   <h1>Employee Details</h1>
    //   <ul>
        // {employeeData.map((employee) => (
        //   <li key={employee.id}>
        //     <strong>Full Name:</strong> {employee.fullName}
        //     <br />
        //     <strong>Employee ID:</strong> {employee.employeeId}
        //     <br />
        //     {/* Add other fields you want to display */}
        //   </li>
        // ))}
    //   </ul>
    // </div>
    <div className="dashboard-content-one" id="cont-1">
  {/* Breadcubs Area Start Here */}
  <div className="breadcrumbs-area">
    <h3>  View Employee Details</h3>
   
  </div>
  {/* Breadcubs Area End Here */}
  {/* Teacher Table Area Start Here */}
  <div className="card height-auto">
    <div className="card-body">
      <div className="heading-layout1">
        
        
      </div>
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
    </div>    <div className="col-3-xxxl col-xl-3 col-lg-3 col-12 form-group">
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
      <div
        style={{ textAlign: "center" }}
        className="fw-btn-fill btn-gradient-yellow"
      >
        SEARCH
      </div>
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
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Marital Status</th>
            <th>National ID Number</th>
            <th>Passport Info</th>
            <th>Emergency Contact</th>
            <th>Bank Name</th>
            <th>Bank Account Number</th>
            <th>Account Type</th>
            <th>Bank Branch</th>
            <th>IFSC Code</th>
            <th>SWIFT Code</th>
            <th>Bank Address</th>
            <th>MICR Code</th>
            <th>PT</th>
            <th>PF</th>
            <th>ESI</th>
            <th>Residency Status</th>
            <th>Employment Start Date</th>
            <th>Employment Status</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Reporting Manager</th>
            <th>Salary Details</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { employeeData!=""?  employeeData.map((employee,index) => (
           <tr key={employee.id}>
            <td>{index + 1}</td> {/* Generating S.No */}
                <td>
                  <input type="text" value={employee.fullName} onChange={(e) => handleInputChange(e, employee.id, 'fullName')} />
                </td>
                <td>
                  <input type="text" value={employee.employeeId} onChange={(e) => handleInputChange(e, employee.id, 'employeeId')} />
                </td>
                <td>
                  <input type="text" value={employee.gender} onChange={(e) => handleInputChange(e, employee.id, 'gender')} />
                </td>
                <td>
                  <input type="text" value={employee.dateOfBirth} onChange={(e) => handleInputChange(e, employee.id, 'dateOfBirth')} />
                </td>
                <td>
                  <input type="text" value={employee.address} onChange={(e) => handleInputChange(e, employee.id, 'address')} />
                </td>
                <td>
                  <input type="text" value={employee.phoneNumber} onChange={(e) => handleInputChange(e, employee.id, 'phoneNumber')} />
                </td>
                <td>
                  <input type="text" value={employee.emailAddress} onChange={(e) => handleInputChange(e, employee.id, 'emailAddress')} />
                </td>
                <td>
                  <input type="text" value={employee.maritalStatus} onChange={(e) => handleInputChange(e, employee.id, 'maritalStatus')} />
                </td>
                <td>
                  <input type="text" value={employee.nationalIdNumber} onChange={(e) => handleInputChange(e, employee.id, 'nationalIdNumber')} />
                </td>
                <td>
                  <input type="text" value={employee.passportInfo} onChange={(e) => handleInputChange(e, employee.id, 'passportInfo')} />
                </td>
                <td>
                  <input type="text" value={employee.emergencyContact} onChange={(e) => handleInputChange(e, employee.id, 'emergencyContact')} />
                </td>
                <td>
                  <input type="text" value={employee.bankName} onChange={(e) => handleInputChange(e, employee.id, 'bankName')} />
                </td>
                <td>
                  <input type="text" value={employee.bankAccountNumber} onChange={(e) => handleInputChange(e, employee.id, 'bankAccountNumber')} />
                </td>
                <td>
                  <input type="text" value={employee.accountType} onChange={(e) => handleInputChange(e, employee.id, 'accountType')} />
                </td>
                <td>
                  <input type="text" value={employee.bankBranch} onChange={(e) => handleInputChange(e, employee.id, 'bankBranch')} />
                </td>
                <td>
                  <input type="text" value={employee.ifscCode} onChange={(e) => handleInputChange(e, employee.id, 'ifscCode')} />
                </td>
                <td>
                  <input type="text" value={employee.swiftCode} onChange={(e) => handleInputChange(e, employee.id, 'swiftCode')} />
                </td>
                <td>
                  <input type="text" value={employee.bankAddress} onChange={(e) => handleInputChange(e, employee.id, 'bankAddress')} />
                </td>
                <td>
                  <input type="text" value={employee.micrCode} onChange={(e) => handleInputChange(e, employee.id, 'micrCode')} />
                </td>
                <td>
                  <input type="text" value={employee.pt} onChange={(e) => handleInputChange(e, employee.id, 'pt')} />
                </td>
                <td>
                  <input type="text" value={employee.pf} onChange={(e) => handleInputChange(e, employee.id, 'pf')} />
                </td>
                <td>
                  <input type="text" value={employee.esi} onChange={(e) => handleInputChange(e, employee.id, 'esi')} />
                </td>
                <td>
                  <input type="text" value={employee.residencyStatus} onChange={(e) => handleInputChange(e, employee.id, 'residencyStatus')} />
                </td>
                <td>
                  <input type="text" value={employee.employmentStartDate} onChange={(e) => handleInputChange(e, employee.id, 'employmentStartDate')} />
                </td>
                <td>
                  <input type="text" value={employee.employmentStatus} onChange={(e) => handleInputChange(e, employee.id, 'employmentStatus')} />
                </td>
                <td>
                  <input type="text" value={employee.jobTitle} onChange={(e) => handleInputChange(e, employee.id, 'jobTitle')} />
                </td>
                <td>
                  <input type="text" value={employee.department} onChange={(e) => handleInputChange(e, employee.id, 'department')} />
                </td>
                <td>
                  <input type="text" value={employee.reportingManager} onChange={(e) => handleInputChange(e, employee.id, 'reportingManager')} />
                </td>
                <td>
                  <input type="text" value={employee.salary} onChange={(e) => handleInputChange(e, employee.id, 'salary')} />
                </td>
               <td>
               <button onClick={() => handleUpdate(employee.id, {
    fullName: employee.fullName,
    employeeId: employee.employeeId,
    gender: employee.gender,
    dateOfBirth: employee.dateOfBirth,
    address: employee.address,
    phoneNumber: employee.phoneNumber,
    emailAddress: employee.emailAddress,
    maritalStatus: employee.maritalStatus,
    nationalIdNumber: employee.nationalIdNumber,
    passportInfo: employee.passportInfo,
    emergencyContact: employee.emergencyContact,
    bankName: employee.bankName, // New field - Bank Name
    bankAccountNumber: employee.bankAccountNumber, // New field - Bank Account Number
    accountType: employee.accountType, // New field - Account Type
    bankBranch: employee.bankBranch, // New field - Bank Branch
    ifscCode: employee.ifscCode, // New field - IFSC Code
    swiftCode: employee.swiftCode, // New field - SWIFT/BIC Code (for international transactions)
    bankAddress: employee.bankAddress, // New field - Bank Address
    micrCode: employee.micrCode, // New field - MICR Code
    pt: employee.pt, // New field - Professional Tax (PT)
    pf: employee.pf, // New field - Provident Fund (PF)
    esi: employee.esi, // New field - Employee State Insurance (ESI)
    residencyStatus: employee.residencyStatus,
    employmentStartDate: employee.employmentStartDate,
    employmentStatus: employee.employmentStatus,
    jobTitle: employee.jobTitle,
    department: employee.department,
    reportingManager: employee.reportingManager,
    salary: employee.salary
})}>
    Update
</button>
                </td> 
               
                <td>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                </td>
              </tr>
          ))
        :"loading..."}
        </tbody>
        <tfoot>
            <tr>
              <td id='tbfooter' colSpan="32">
                <button onClick={handleUpdateAll}>Update All</button>
              </td>
            </tr>
          </tfoot>
      </table>
    </div>
    </div>
  </div>

</div>

  );
}
