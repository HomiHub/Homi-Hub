import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./emergencyContact.css"
import {db, auth} from "../components/firebase";
import { getDatabase, ref, get, child, push, update} from "firebase/database";

function EmergencyContacts() 
{
    //test data
    var data = [
        {eID: "Adam: 123-456-7890"},
        {eID: "Jean: 098-765-4321"},
        {eID: "Ashur: 574-234-2534"},
    ]
    console.log(data);

    var[newItem, setNewItem] = useState("");

    const handleNewItemChange=(e)=>{
        setNewItem(e.target.value)
      };

    //add a new errand
    const addContact = async () => {
        try{
          //get a unique key for the item
          var itemRef = push(ref(db, `families/-NDfcsZTM4BWrJoA9eRd/emergencyContacts`),{
          })
          //add the item to the unique key
          update(ref(db, `families/-NDfcsZTM4BWrJoA9eRd/emergencyContacts`),{
            [itemRef.key]: newItem
          })
          setNewItem("");
        }
        catch (error) {
            console.log(error.message);
        }
    };

    const id = auth.currentUser.uid;
    console.log("the user id");
    console.log(id);
    const [familyID, setFamilyID] = useState("Default");
  
    //get the familyID of the logged in user
    const userFamilyRef = ref(db, `/users/${id}/families`);
    get(userFamilyRef).then((snapshot) => {
      if (snapshot.exists()) {
        //all the data from the query
        const dataFamily = snapshot.val();
        console.log(dataFamily);
        for(const [key, value] of Object.entries(dataFamily)){
          let value1 = key;
          setFamilyID(value1);
        }
        console.log("family ID found");
        console.log(familyID);
      }}
    );

    const [contact, setContact] = useState();
    let queryData = [];
    let famArr = new Set();

    const contactRef = ref(db, `families/${familyID}/emergencyContacts`);
    get(contactRef).then((snapshot) => {
    if (snapshot.exists()) {
        const contactData = snapshot.val();
        console.log(contactData);
        let counter = 0;
        for(const [key, value] of Object.entries(contactData)){
            let value1 = value;
            console.log(value1);
            famArr.add(value1);
        }
        console.log(famArr);
    } 
    else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });

    
    return (
        <div className="emergencyContacts">
            <table>
                <tr>
                    <th className="tableHeader">Emergency Contacts</th>
                </tr>
                {data.map((value, key) => {
                    return (
                    <tr key={key}>
                        <td>{value.eID}</td>
                    </tr>
                    )
                })}
            </table>
            <div className="emergencyContactsInput">
                <input type="text" placeholder="New Item" value={newItem} onChange={handleNewItemChange} />
                <button onClick={addContact}>Add</button>
            </div>
        </div>
    );
}

export default EmergencyContacts