import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import * as Icons from "@mui/icons-material";
import swal from 'sweetalert'
import {
  DELETE_ELECTION_PENDING,
  GET_ELECTION_PENDING,
  GET_ELECTION_REJECTED,
} from "../../../redux-saga/Admin-saga/create-election/action/action";
import { delete_election_data } from "../../../redux-saga/Admin-saga/create-election/api/api";

const CreateElection = () => {
 const election = useSelector(
    (state) => state.electionReducer.electionData.Data
  );
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUrl, setNewUrl] = useState();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const columns = [
    {
      name: 'index',
      label: 'No',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1
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
      name: "RegisterDate",
      label: "Election Date",
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
              <Icons.EditRounded
                className="editButton"
                // onClick={() => {
                //   const editdata = dataTableData.find(
                //     (data) => data._id === value
                //   );
                //   navigate("/election-form", { state: { editdata: editdata } });
                // }}
              ></Icons.EditRounded>
              <Icons.DeleteRounded
                className="deleteButton"
                onClick={async () => {
                  const confirm = await swal({
                    title: "Are you sure?",
                    text: "Are you sure? Want to delete Location? All related data will also be deleted",
                    icon: "warning",
                    buttons: ["No, cancel it!", "Yes, I am sure!"],
                    dangerMode: true,
                  });
                  if (confirm) { 
                    delete_election_data(value)
                    // dispatch({
                    //   type: DELETE_ELECTION_PENDING,
                    //   payload: value,
                    // });

                    toast.success("deleted successfully!", {
                      key: value,
                    });
                    // console.log(value);

                    toast.error("something went wrong!", {
                      key: value,
                    });
                  }
                }}
              ></Icons.DeleteRounded>
            </div>
          );
        },
      },
    },
  ];

  const options = {
   selectableRows: 'none',
  };

  return (
    <div className="custom-container">
      <div className="right-text">
        <button
          type="button"
          className="btn btn-primary AddButton"
          onClick={() => navigate("/election-form")}
        >
          Add Election
        </button>
      </div>
      {/* dataTable data */}
      <MUIDataTable
        title={"Election List"}
        data={election}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default CreateElection;
