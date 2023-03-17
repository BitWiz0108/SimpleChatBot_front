import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
// import "../styles.css";

export default function App() {
    const options = [
        { label: "Baptist", value: "Baptist" },
        { label: "Souther Baptist", value: "SBapist" },
        { label: "Non-Denominational", value: "NDenominational" },
        { label: "Pentecostal", value: "Pentecostal" },
        { label: "Lutheran", value: "Lutheran" },
        { label: "Seventh Day Adventist", value: "sventh" },
        { label: "Methodist", value: "Methodist" }
    ];

    const options_1 = [
        { label: "Reformed", value: "Reformed" },
        { label: "Paedobaptist", value: "Paedobaptist" },
        { label: "Credobaptist", value: "Credobaptist" },
        { label: "Egalitarian", value: "Egalitarian" },
        { label: "Charismatic", value: "Charismatic" },
        { label: "Missional", value: "Missional" },
        { label: "Methodist", value: "Methodist" }
    ];

    const options_2 = [
        { label: "Charles Spurgeon", value: "Charles" },
        { label: "John Wesley", value: "John" },
        { label: "Douglas Wilson", value: "Douglas" },
        { label: "Jen Wilkin", value: "Jen" },
        { label: "Matt Chandler", value: "Matt" },
        { label: "Tony Evans", value: "Tony" },
        { label: "Craig Groeschel", value: "Craig" },
        { label: "Kevin Deyoung", value: "Kevin" },
        { label: "Steven Furtick", value: "Steven" },
    ];

    const [selected, setSelected] = useState([]);
    const [selected1, setSelected1] = useState([]);
    const [selected2, setSelected2] = useState([]);
    
    return (
        <div>

            <h1>Please answer the following questions</h1>
            &nbsp;
            &nbsp;
            &nbsp;
            <h2>Please choose one that express you. (Only One choice)</h2>

            <pre>{JSON.stringify(selected)}</pre>

            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy={"Select"}
                isCreatable={true}
            />
            &nbsp;
            <h2>Please choose one that express you. (Multiple choices)</h2>
            <pre>{JSON.stringify(selected1)}</pre>
            <MultiSelect
                options={options_1}
                value={selected1}
                onChange={setSelected1}
                labelledBy={"Select"}
                isCreatable={true}
            />
            &nbsp;
            <h2>Please choose one that express you. (Multiple choices)</h2>
            <pre>{JSON.stringify(selected2)}</pre>
            <MultiSelect
                options={options_2}
                value={selected2}
                onChange={setSelected2}
                labelledBy={"Select"}
                isCreatable={true}
            />
        </div>
    );
}
