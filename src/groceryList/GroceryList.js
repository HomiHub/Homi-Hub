import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./groceryList.css"
import {db} from "../components/firebase";
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

    var[newItem, setNewItem] = useState("");

    const handleNewItemChange=(e)=>{
        setNewItem(e.target.value)
      };

    //add a new grocery item to the database
    const addGroceryItem = async () => {
        try{
          //get a unique key for the item
          var itemRef = push(ref(db, `families/-NDfcsZTM4BWrJoA9eRd/groceryList`),{
          })
          //add the item to the unique key
          update(ref(db, `families/-NDfcsZTM4BWrJoA9eRd/groceryList`),{
            [itemRef.key]: newItem
          })
          setNewItem("");
        }
        catch (error) {
            console.log(error.message);
        }
    };

    //get the grocery list from the database
    const dbRef = ref(getDatabase());
    get(child(dbRef, `families/-NDfcsZTM4BWrJoA9eRd/groceryList`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        data = snapshot.val();
        console.log(data);
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
    
    //displayed on the page
    return (
        <div className="groceryListMid">
            <table>
                <tr>
                    <th className="tableHeader">Grocery List</th>
                </tr>
                {data.map((val, key) => {
                    return (
                    <tr key={key}>
                        <td>{val.groceryId}</td>
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