import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_PARTYCONNECT_PENDING } from "../../../redux-saga/Admin-saga/party-connect/action/action";

function PartyConnect() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const partyConnection = useSelector(
        (state) => state.PartyConnectReducer.partyConnectData
    );
    // const electionData = useSelector(state => state.electionReducer.electionData);
    // // const election = useSelector((state) => state.electionReducer);
    // const electionParty = useSelector((state) => state.electionPartyReducer);
    // const [selectedValue, setSelectedValue] = useState([]);
    const [selectedElection, setSelectedElection] = useState("");
    const [selectedParty, setSelectedParty] = useState("");
    const electionData = useSelector(state => state.electionReducer.electionData);
    const electionPartyData = useSelector(state => state.electionPartyReducer);


    /** partyconnection filter data */
    const transformedData = partyConnection.map((obj) => ({
        ElectionName: obj.Election ? obj.Election.ElectionName : "",
        shortCode: obj.Party ? obj.Party.shortCode : "",
        pName: obj.Party ? obj.Party.pName : "",
        Profile: obj.Party ? obj.Party.Profile : "",
    }));


    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    // useEffect(() => {
    //     const filteredData = selectedValue ? electionData.filter(election => election.ElectionName === selectedValue) : electionData;
    //     setTableData(filteredData);
    // }, [selectedValue, electionData]);

    // const optionsElements = electionData.map(election => (
    //     <option key={election.ElectionName} value={election.ElectionName}>{election.ElectionName}</option>
    // ));
    useEffect(() => {
        let filteredData = electionData;
        if (selectedElection) {
            filteredData = filteredData.filter(election => election.ElectionName === selectedElection);
        }
        if (selectedParty) {
            filteredData = filteredData.filter(election => election.PartyName === selectedParty);
        }
        setTableData(filteredData);
    }, [selectedElection, selectedParty, electionData]);
    const handleElectionChange = (event) => {
        setSelectedElection(event.target.value);
        setSelectedParty(""); // Reset selected party when election changes
    };

    const handlePartyChange = (event) => {
        setSelectedParty(event.target.value);
    };

    const electionOptions = electionData.map(election => (
        <option key={election.ElectionName} value={election.ElectionName}>{election.ElectionName}</option>
    ));

    const partyOptions = electionPartyData.map(party => (
        <option key={party.partyName} value={party.partyName}>{party.partyName}</option>
    ));


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
                <select value={selectedElection} onChange={handleElectionChange}>
                    <option value="">Select an election</option>
                    {electionOptions}
                </select>
            </div>
            <div>
                <select value={selectedParty} onChange={handlePartyChange}>
                    <option value="">Select a party</option>
                    {partyOptions}
                </select>
            </div>
            <MUIDataTable title={"Party Connection"} data={tableData} columns={columns} options={{ selectableRows: "none" }} />

            {/* <div>
                <select value={selectedValue} onChange={handleSelectChange}>
                    <option value="">Select Election Name</option>
                    {electionData.map(election => (
                        <option key={election.ElectionName} value={election.ElectionName}>{election.ElectionName}</option>
                    ))}
                </select>

                <select value={selectedValue} onChange={handleSelectChange}>
                    <option value="">Select Party Name</option>
                    {electionData.map(election => (
                        <option key={election.ElectionName} value={election.ElectionName}>{election.ElectionName}</option>
                    ))}
                </select>
            </div> */}

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
