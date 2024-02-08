import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_PARTYCONNECT_PENDING } from "../../../redux-saga/Admin-saga/party-connect/action/action";

function PartyConnect() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const partyConnection = useSelector((state) => state.PartyConnectReducer.partyConnectData);
    const election = useSelector((state) => state.electionReducer);
    const electionParty = useSelector((state) => state.electionPartyReducer);
    const [selectedValue, setSelectedValue] = useState("");

    // Handler function to update the selected value
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        dispatch({ type: GET_PARTYCONNECT_PENDING });
    }, []);

    const transformedData = partyConnection.map((obj) => ({
        ElectionName: obj.Election ? obj.Election.ElectionName : '',
        shortCode: obj.Party ? obj.Party.shortCode : '',
        pName: obj.Party ? obj.Party.pName : '',
        Profile: obj.Party ? obj.Party.Profile : '',
    }));

    const columns = [
        {
            name: "index",
            label: "No",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return tableMeta.rowIndex + 1;
                },
            },
        },
        {
            name: "ElectionName",
            label: "Election Name",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "shortCode",
            label: "Short Code",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "pName",
            label: "Party Name",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "Profile",
            label: "Party logo",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <img
                            src={value}
                            alt={tableMeta.rowData[0]}
                            style={{ width: "50px", height: "auto" }}
                        />
                    );
                },
            },
        },
    ];

    const options = {
        selectableRows: "none",
    };

    return (
        <div className="custom-container">
            <div>
                {/* Dropdown select element */}
                <select value={selectedValue} onChange={handleSelectChange}>
                    <option value="">Select an option</option>
                    {options.map(option => (
                        <option key={option.value} value={JSON.stringify(option.data)}>{option.label}</option>
                    ))}
                </select>

            </div>
            <MUIDataTable
                title={"Party Connection"}
                data={transformedData}
                columns={columns}
                options={options}
            />
        </div>
    );
}

export default PartyConnect;
