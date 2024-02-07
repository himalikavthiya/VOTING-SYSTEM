import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PartyConnect() {
    const partyConnection = useSelector((state) => state.PartyConnectReducer.PartyConnectData);
    const election = useSelector((state) => state.electionReducer.electionData);
    const electionParty = useSelector(
        (state) => state.electionPartyReducer.PartyData
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newUrl, setNewUrl] = useState();

    // const handleFileUpload = (event) => {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setNewUrl(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // };
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
            name: "PName",
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
        {
            name: "shortCode",
            label: "Short Code",
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "_id",
            label: "Action",
            options: {
                customBodyRender: (value) => {
                    return (
                        <div>
                            {/* <Icons.EditRounded></Icons.EditRounded>
              <Icons.DeleteRounded
                    className="deleteButton"
                    onClick={async () => {
                      const confirm = await swal({
                        title: "Are you sure?",
                        text: "Are you sure? Want to delete ? All related data will also be deleted",
                        icon: "warning",
                        buttons: ["No, cancel it!", "Yes, I am sure!"],
                        dangerMode: true,
                      });
                      if (confirm) {
                        dispatch({
                          type: DELETE_ELECTION_PARTY_PENDING,
                          payload: value,
                        });
                        toast.success("deleted successfully!", {
                          key: value,
                        });
                        // console.log(value);
                      } else {
                        toast.error("something went wrong!", {
                          key: value,
                        });
                      }
                    }}
                  ></Icons.DeleteRounded> */}
                        </div>
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
            {/* dataTable data */}
            <MUIDataTable
                title={"Party Connection"}
                data={partyConnection}
                columns={columns}
                options={options}
            />
        </div>
    );
}

export default PartyConnect;