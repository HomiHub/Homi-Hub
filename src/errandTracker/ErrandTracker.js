import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./errandTracker.css"
import {db} from "../components/firebase";
import { getDatabase, ref, get, child} from "firebase/database";


function ErrandTracker() 
{
    const data = [
        { errandId: "Get the groceries" },
        { errandId: "Pick up the dry cleaning"},
        { errandId: "Buy tools to hang the pictures"},
      ]

    const [isMouseOver, setMouseOver] = useState(false);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `families/-NDfcsZTM4BWrJoA9eRd/errandTracker`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
    
    return (
        <div className="centered">
            <table>
                <tr>
                    <th className="centeredText">Errand Tracker</th>
                </tr>
                {data.map((val, key) => {
                    return (
                    <tr key={key}>
                        <td>{val.errandId}</td>
                    </tr>
                    )
                })}
            </table>
        </div>
    );
}

export default ErrandTracker