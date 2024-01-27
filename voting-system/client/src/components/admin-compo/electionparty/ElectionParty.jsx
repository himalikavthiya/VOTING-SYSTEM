import React, { useEffect, useRef, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { GET_ELECTION_PARTY_PANDING, POST_ELECTION_PARTY_PANDING } from "../../../redux-saga/Admin-saga/election-party/action/action";
import { Button } from "@mui/material";
import * as Icons from '@mui/icons-material'

const ElectionParty = () => {
  const electionParty = useSelector((state) => state.electionReducer);
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
    // console.log(data)
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
     dispatch({ type:POST_ELECTION_PARTY_PANDING,partyData});
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
     {
      name: '_id',
      label: 'Action',
      options: {
        customBodyRender: (value) => {
          return (
            <div>
              <Icons.EditRounded
                className="editButton"
                onClick={() => {
                  const editdata = dataTableData.find((data) => data._id === value)
                  navigate('/election-party-form', { state: { editdata: editdata } })
                }}
              ></Icons.EditRounded>
               <Icons.DeleteRounded
              //   className="deleteButton"
              //   onClick={async () => {
              //     const confirm = await swal({
              //       title: 'Are you sure?',
              //       text: 'Are you sure? Want to delete Location? All related data will also be deleted',
              //       icon: 'warning',
              //       buttons: ['No, cancel it!', 'Yes, I am sure!'],
              //       dangerMode: true,
              //     })
              //     if (confirm) {
              //       deleteCategory(value)
              //         .then(() => {
              //           toast.success('deleted successfully!', {
              //             key: value,
              //           })
              //           console.log(value)
              //           categoryList()
              //         })
              //         .catch(() => {
              //           toast.error('something went wrong!', {
              //             key: value,
              //           })
              //         })
              //     }
              //   }}
              >

              </Icons.DeleteRounded>
            </div>
          )
        },
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
         onClick={() => navigate('/election-party-form')}
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


    </div>
  );
};

export default ElectionParty;
