import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);


function db()
{
    return  getFirestore(app);
}

// Get a list of items from your database
async function getItems(db, collectionName) {
  const itemsCol = collection(db, collectionName);
  const itemSnapshot = await getDocs(itemsCol);
  const itemList = itemSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return itemList;
}

// Add a new item to the database
async function addItem(db, collectionName, newItem) {
  try {
    const itemsCol = collection(db, collectionName);
    await addDoc(itemsCol, newItem);
    console.log("Item added successfully!");
    alert("Item added successfully!");
  } catch (error) {
    console.error("Error! Kindly Contact: 9 840 841 840", error);
    alert("Error! Kindly Contact: 9 840 841 840");

  }
}

// Update an existing item in the database
async function updateItem(db, collectionName, itemId, updatedItem) {
  try {
    const itemRef = doc(db, collectionName, itemId);
    await updateDoc(itemRef, updatedItem);
    console.log("Item updated successfully!");
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

// Delete an item from the database
async function deleteItem(db, collectionName, itemId) {
  try {
    const itemRef = doc(db, collectionName, itemId);
    await deleteDoc(itemRef);
    console.log("Item deleted successfully!");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

export { getItems, addItem, updateItem, deleteItem,db };
