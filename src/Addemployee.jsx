import React, { useEffect, useState } from 'react';
// import { db,addItem } from './Firebaseconfig';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore/lite';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA95pWNegQN52jOC8gB2cs9s2BRMHbERR4",
    authDomain: "sam-hyper-business.firebaseapp.com",
    projectId: "sam-hyper-business",
    storageBucket: "sam-hyper-business.appspot.com",
    messagingSenderId: "644102757906",
    appId: "1:644102757906:web:50d98f81cb35e9e52842cb",
    measurementId: "G-F6J99L8CHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
 async function fetchData(db, collectionName) {
    const itemsCol = collection(db, collectionName);
    const itemSnapshot = await getDocs(itemsCol);
    const itemList = itemSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return itemList;
  }
export default function AddEmployee() {
    const [isDataEntered, setIsDataEntered] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    gender: '',
    dateOfBirth: '',
    address:'',
    phoneNumber:'',
    emailAddress:'',

    maritalStatus: '',
    nationalIdNumber: '',
    passportInfo: '',
    emergencyContact: '',
    bankName: '', // New field - Bank Name
    bankAccountNumber: '', // New field - Bank Account Number
    accountType: '', // New field - Account Type
    bankBranch: '', // New field - Bank Branch
    ifscCode: '', // New field - IFSC Code
    swiftCode: '', // New field - SWIFT/BIC Code (for international transactions)
    bankAddress: '', // New field - Bank Address
    micrCode: '', // New field - MICR Code
    pt: '', // New field - Professional Tax (PT)
    pf: '', // New field - Provident Fund (PF)
    esi: '', // New field - Employee State Insurance (ESI)
    residencyStatus: '',
    employmentStartDate: '',
    employmentStatus: '',
    jobTitle: '',
    department: '',
    reportingManager: '',
    salary: ''
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the database
    fetchData(db, 'employeeDetails').then((data) => {
       
      setItems(data);
      console.log(items);

    });
  },[]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Check if all data is entered whenever the form data changes
    const allDataEntered = Object.values({ ...formData, [name]: value }).every(
      (value) => value.trim() !== ''
    );
    setIsDataEntered(allDataEntered);
  };

  const  handleSubmit = () => {
  

    try {
      const itemsCol = collection(db, "employeeDetails");
       addDoc(itemsCol, formData);
      console.log("Item added successfully!");
      alert("Item added successfully!");
    } catch (error) {
      console.error("Error! Kindly Contact: 9 840 841 840", error);
      alert("Error! Kindly Contact: 9 840 841 840");
  
    
  }
    
  };
  
  const handleReset = () => {
    setFormData({
        fullName: '',
        employeeId: '',
        gender: '',
        dateOfBirth: '',
        address: '',
        phoneNumber: '',
        emailAddress: '',
        maritalStatus: '',
        nationalIdNumber: '',
        passportInfo: '',
        emergencyContact: '',
        bankName: '', 
        bankAccountNumber: '',
        accountType: '', 
        bankBranch: '', 
        ifscCode: '', 
        swiftCode: '', 
        bankAddress: '',
        micrCode: '',
        pt: '', 
        pf: '', 
        esi: '', 
        residencyStatus: '',
        employmentStartDate: '',
        employmentStatus: '',
        jobTitle: '',
        department: '',
        reportingManager: '',
        salary: '',
      });
    
    setIsDataEntered(false);
  };

  return (
    <div className="dashboard-content-one" id="cont">
      <div className="breadcrumbs-area">
        <h3>Add New Employee</h3>
      </div>
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="dropdown">
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  <i className="fas fa-times text-orange-red" />
                  Close
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs text-dark-pastel-green" />
                  Edit
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-redo-alt text-orange-peel" />
                  Refresh
                </a>
              </div>
            </div>
          </div>
          <form className="new-added-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder=""
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Employee ID *</label>
                <input
                  type="text"
                  name="employeeId"
                  placeholder=""
                  className="form-control"
                  value={formData.employeeId}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Gender *</label>
                <select
                  className="select2"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Date Of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="dd/mm/yyyy"
                  className="form-control air-datepicker"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                <i className="far fa-calendar-alt" />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
  <label>Address *</label>
  <input
    type="text"
    name="address"
    placeholder=""
    className="form-control"
    value={formData.address}
    onChange={handleChange}
  />
</div>

<div className="col-xl-3 col-lg-6 col-12 form-group">
  <label>Phone Number *</label>
  <input
    type="text"
    name="phoneNumber"
    placeholder=""
    className="form-control"
    value={formData.phoneNumber}
    onChange={handleChange}
  />
</div>

<div className="col-xl-3 col-lg-6 col-12 form-group">
  <label>Email Address *</label>
  <input
    type="text"
    name="emailAddress"
    placeholder=""
    className="form-control"
    value={formData.emailAddress}
    onChange={handleChange}
  />
</div>

              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Marital Status *</label>
                <select
                  className="select2"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Marital Status *</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>National Identification Number</label>
                <input
                  type="text"
                  name="nationalIdNumber"
                  placeholder=""
                  className="form-control"
                  value={formData.nationalIdNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Passport Information</label>
                <input
                  type="text"
                  name="passportInfo"
                  placeholder=""
                  className="form-control"
                  value={formData.passportInfo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Emergency Contact *</label>
                <input
                  type="text"
                  name="emergencyContact"
                  placeholder=""
                  className="form-control"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Bank Name *</label>
                <input
                  type="text"
                  name="bankName"
                  placeholder=""
                  className="form-control"
                  value={formData.bankName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Bank Account Number *</label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  placeholder=""
                  className="form-control"
                  value={formData.bankAccountNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Account Type *</label>
                <input
                  type="text"
                  name="accountType"
                  placeholder=""
                  className="form-control"
                  value={formData.accountType}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Bank Branch *</label>
                <input
                  type="text"
                  name="bankBranch"
                  placeholder=""
                  className="form-control"
                  value={formData.bankBranch}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>IFSC Code *</label>
                <input
                  type="text"
                  name="ifscCode"
                  placeholder=""
                  className="form-control"
                  value={formData.ifscCode}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>SWIFT/BIC Code (for international transactions)</label>
                <input
                  type="text"
                  name="swiftCode"
                  placeholder=""
                  className="form-control"
                  value={formData.swiftCode}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Bank Address *</label>
                <input
                  type="text"
                  name="bankAddress"
                  placeholder=""
                  className="form-control"
                  value={formData.bankAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>MICR Code *</label>
                <input
                  type="text"
                  name="micrCode"
                  placeholder=""
                  className="form-control"
                  value={formData.micrCode}
                  onChange={handleChange}
                />
              </div>


              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Professional Tax (PT)</label>
                <input
                  type="text"
                  name="pt"
                  placeholder=""
                  className="form-control"
                  value={formData.pt}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Provident Fund (PF)</label>
                <input
                  type="text"
                  name="pf"
                  placeholder=""
                  className="form-control"
                  value={formData.pf}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Employee State Insurance (ESI)</label>
                <input
                  type="text"
                  name="esi"
                  placeholder=""
                  className="form-control"
                  value={formData.esi}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Citizenship/Residency Status</label>
                <select
                  className="select2"
                  name="residencyStatus"
                  value={formData.residencyStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Citizen">Citizen</option>
                  <option value="Resident">Resident</option>
                  <option value="Work Visa">Work Visa</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Employment Start Date *</label>
                <input
                  type="date"
                  name="employmentStartDate"
                  placeholder="dd/mm/yyyy"
                  className="form-control air-datepicker"
                  value={formData.employmentStartDate}
                  onChange={handleChange}
                />
                <i className="far fa-calendar-alt" />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Employment Status *</label>
                <select
                  className="select2"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Employment Status</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder=""
                  className="form-control"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Department/Team *</label>
                <input
                  type="text"
                  name="department"
                  placeholder=""
                  className="form-control"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Reporting Manager *</label>
                <input
                  type="text"
                  name="reportingManager"
                  placeholder=""
                  className="form-control"
                  value={formData.reportingManager}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>salary Details *</label>
                <input
                  type="text"
                  name="salary"
                  placeholder=""
                  className="form-control"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 form-group mg-t-8">
                {
                    isDataEntered?
                    <div
                    className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark"
                    onClick={()=>{
                      handleSubmit();
                    }}
                    style={{cursor:"pointer"}}
                  >
                    Save
                  </div>:
                  <div
                 
                  className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark"
                   style={{cursor:"auto",backgroundColor:"#ff9e017b"}}
                  >
                    Save
                  </div>
                }
               
                <div
 onClick={handleReset}
                  className="btn-fill-lg bg-blue-dark btn-hover-yellow"
                >
                  Reset
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
