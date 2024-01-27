import React, { useEffect, useRef, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { GET_ELECTION_PARTY_PANDING, POST_ELECTION_PARTY_PANDING } from "../../redux-saga/Admin-saga/election-party/action/action";
import { Button } from "@mui/material";

const ElectionParty = () => {
  const electionParty = useSelector((state) => state.electionPartyReducer);
  console.log(electionParty.PartyData.Data);
  const dispatch = useDispatch();
  const [dataTableData, setDataTable] = useState([]);
const [newUrl, setNewUrl] = useState()

 const pName = useRef();
  const shortCode = useRef();

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setNewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit=(data)=>{
    console.log(data)
    //  let formData = new FormData() //formdata object
    // Object.keys(data).forEach(function (key) {
    //   if (key === 'Profile') {
    //     formData.append(key, data[key][0])
    //   } else {
    //     formData.append(key, data[key])
    //   }
    // })
     const partyData = {
      pName: pName.current.value,
      shortCode: shortCode.current.value,
    };
     dispatch({ type:POST_ELECTION_PARTY_PANDING,partyData  });
  }

  useEffect(() => {
    const fetchData = async () => {
       dispatch({ type: GET_ELECTION_PARTY_PANDING });
      // Update the state with the fetched data
     await setDataTable(electionParty.PartyData.Data);
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: "pName",
      label: "Election Party Name",
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
  ];

  const options = {
    filterType: "checkbox",
  };

  return (
    <div className="custom-container">
      <div className="right-text">
         <button
          type="button"
          className="btn btn-primary AddButton"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@fat"
        >
          Add Party
        </button>
      </div>
      {/* dataTable data */}
      <MUIDataTable
        title={"Election Party List"}
        data={dataTableData}
        columns={columns}
        options={options}
      />

      {/* Model data */}
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Create E-Election Party
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">
              Election Party Name
            </label>
            <input type="text" className="form-control" id="Party Name"
            ref={pName} />
          </div>

          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">
              Election Party Logo
            </label>
            <input type="file" className="form-control" onChange={handleFileUpload} id="PartyLogo" />
          </div>

          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">
              Election Party Short Code
            </label>
            <input type="text" className="form-control" id=" Party Shortcode"
            ref={shortCode} />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Add Party
        </button>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default ElectionParty;
