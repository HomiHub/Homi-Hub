import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./groceryList.css"
import {db, auth} from "../components/firebase";
import { getDatabase, ref, get, child, push, update} from "firebase/database";

function GroceryList() 
{
    //default placeholder data
    var data = [
        { groceryId: "Bananas" },
        { groceryId: "Milk"},
        { groceryId: "Eggs"},
        { groceryId: "Garlic"}
      ]
    console.log(data);

    var[newItem, setNewItem] = useState("");

    const handleNewItemChange=(e)=>{
        setNewItem(e.target.value);
      };

    //add a new grocery item to the database
    const addGroceryItem = async () => {
        try{
          //get a unique key for the item
          var itemRef = push(ref(db, `families/${familyID}/groceryList`),{
          })
          //add the item to the unique key
          update(ref(db, `families/${familyID}/groceryList`),{
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
    //query location
    const userFamilyRef = ref(db, `/users/${id}/families`);
    get(userFamilyRef).then((snapshot) => {
      if (snapshot.exists()) {
        //all the data from the query
        const dataFamily = snapshot.val();
        console.log(dataFamily);
        //currently assuming the user belongs to one family and we grab the single value here
        for(const [key, value] of Object.entries(dataFamily)){
          let value1 = key;
          setFamilyID(value1);
        }
        console.log("family ID found");
        console.log(familyID);
      }}
    );

    //get the grocery list from the database
    const [groceryItems, setGroceryItems] = useState(data);
    const [loading, setLoading] = useState(0);
    let queryData = [];
    let famArr = new Set();

    const groceryRef = ref(db, `families/${familyID}/groceryList`);
    if(loading < 2){
      get(groceryRef).then((snapshot) => {
        if (snapshot.exists()) {
            const groceryData = snapshot.val();
            console.log(groceryData);
            let counter = 0;
            for(const [key, value] of Object.entries(groceryData)){
                let value1 = value;
                console.log("grocery item found");
                console.log(value1);
                famArr.add(value1);
                queryData[counter] = {groceryId: value1};
                counter++;
            }
            setGroceryItems(queryData);
            setLoading(loading+1);
            console.log("grocery items yo");
            console.log(groceryItems);
        } 
        else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
    }
    
    //displayed on the page 
    return (
        <div className="groceryListMid">
            <table>
                <tr>
                    <th className="tableHeader">Grocery List</th>
                </tr>
                {groceryItems.map((value, key) => {
                    return (
                    <tr key={key}>
                        <td>{value.groceryId}</td>
                    </tr>
                    )
                })}
            </table>
            <div className="groceryInput">
                <input type="text" placeholder="New Item" value={newItem} onChange={handleNewItemChange} />
                <button onClick={addGroceryItem}>Add</button>
            </div>
        </div>
    );
}

export default GroceryList