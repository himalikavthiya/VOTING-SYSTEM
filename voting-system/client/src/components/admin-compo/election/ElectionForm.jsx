import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  POST_ELECTION_PENDING,
  UPDATE_ELECTION_PENDING,
} from "../../../redux-saga/Admin-saga/create-election/action/action";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";

function ElectionForm() {
  const {
    register,
    setValue,  // Add setValue from react-hook-form
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = (data) => {
    console.log(data)
    if (isUpdate === "") {
      dispatch({ type: POST_ELECTION_PENDING, payload: data });
    } else {
      dispatch({ type: UPDATE_ELECTION_PENDING, payload: data});
    }
    navigate("/create-election");
  };

  useEffect(() => {
    if (state) {
      const { editData } = state;
      setIsUpdate(editData._id);
      setValue("ElectionName", editData.ElectionName);
      setValue("RegisterDate", new Date(editData.RegisterDate).toISOString().split("T")[0]);
    }
  }, [state, setValue]);

  return (
    <div>
      <form className="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="innerfield">
          <label htmlFor="ElectionName">Election Name</label>
          <input
            type="text"
            id="ElectionName"
            className="inputfield"
            placeholder="Election Name"
            {...register("ElectionName", {
              required: "Election name is required",
            })}
          />
          {errors.ElectionName && (
            <p className="error">{errors.ElectionName.message}</p>
          )}
        </div>
        <div className="innerfield">
          <label htmlFor="RegisterDate">Register Date</label>
          <input
            type="date"
            id="RegisterDate"
            className="inputfield"
            placeholder="Election Date"
            {...register("RegisterDate", {
              required: "Election Date is required",
            })}
          />
          {errors.RegisterDate && (
            <p className="error">{errors.RegisterDate.message}</p>
          )}
        </div>
        <div className="innerfield">
          {isLoading ? (
            <>
              <CircularProgress />
              Loading...
            </>
          ) : (
            <button type="submit" className="AddData">
              {isUpdate === "" ? "Add" : "Update"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ElectionForm;
