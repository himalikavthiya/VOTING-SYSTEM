import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Icons from "@mui/icons-material";
import {
  GET_ELECTION_PENDING,
  GET_ELECTION_REJECTED,
} from "../../../redux-saga/Admin-saga/create-election/action/action";

const CreateElection = () => {
 const election = useSelector(
    (state) => state.electionReducer.electionData.Data
  );
  console.log(election, "election data");
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

  const fetchData = async () => {
    try {
      await dispatch({ type: GET_ELECTION_PENDING });
    } catch (error) {
      dispatch({ type: GET_ELECTION_REJECTED, payload: error.message });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
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
                  const editdata = dataTableData.find(
                    (data) => data._id === value
                  );
                  navigate("/election-form", { state: { editdata: editdata } });
                }}
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
                }}
              ></Icons.DeleteRounded>
            </div>
          );
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
          onClick={() => navigate("/election-form")}
        >
          Add Party
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
