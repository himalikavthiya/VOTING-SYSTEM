import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Icons from "@mui/icons-material";
import swal from "sweetalert";
import { DELETE_ELECTION_PENDING } from "../../../redux-saga/Admin-saga/create-election/action/action";

const CreateElection = () => {
  const election = useSelector((state) => state.electionReducer.electionData);

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
                onClick={() => {
                  const editData = election.find((data) => data._id === value);

                  navigate("/election-form", { state: { editData: editData } });
                }}
              ></Icons.EditRounded>
              <Icons.DeleteRounded
                className="deleteButton"
                onClick={async () => {
                  const shouldDelete = await swal({
                    title: "Are you sure?",
                    text: "Are you sure? Want to delete Location? All related data will also be deleted",
                    icon: "warning",
                    buttons: ["No, cancel it!", "Yes, I am sure!"],
                    dangerMode: true,
                  });
                  if (shouldDelete) {
                    // Dispatch the DELETE_ELECTION_PENDING action
                    dispatch({
                      type: DELETE_ELECTION_PENDING,
                      payload: value,
                    });
                    // toast.success("Deleted successfully!", {
                    //   key: value,
                    // });
                  } else {
                    toast.error("Deletion canceled or something went wrong!", {
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
    selectableRows: "none",
  };

  return (
    <>
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
        <ToastContainer />
        <MUIDataTable
          title={"Election List"}
          data={election}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default CreateElection;
