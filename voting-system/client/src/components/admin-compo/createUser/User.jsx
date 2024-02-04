import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import * as Icons from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_USER_PENDING } from "../../../redux-saga/Admin-saga/create-user/action/action";

function User() {
  const User = useSelector((state) => state.userReducer.userData.Data);
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
      name: "Profile",
      label: "user profile",
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
      name: "Name",
      label: "User Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Sex",
      label: "User Gender",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "DOB",
      label: "User DOB",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Email",
      label: "User Email",
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
                  navigate("/user-form", {
                    state: { editdata: editdata },
                  });
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
                  if (shouldDelete) {
                    // Dispatch the DELETE_USER_PENDING action
                    dispatch({
                      type: DELETE_USER_PENDING,
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
    <div className="custom-container">
      <div className="right-text">
        <button
          type="button"
          className="btn btn-primary AddButton"
          onClick={() => navigate("/user-form")}
        >
          Add User
        </button>
      </div>
      {/* dataTable data */}
      <MUIDataTable
        title={"User List"}
        data={User}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default User;
