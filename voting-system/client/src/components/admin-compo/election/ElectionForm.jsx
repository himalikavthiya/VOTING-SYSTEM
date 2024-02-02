import React, { useEffect, useRef, useState } from "react";
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
    getValues,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const ElectionName = useRef();
  const RegisterDate = useRef();
  const [view, setView] = useState();

  const onSubmit = (data) => {
    let objectData;
    if (isUpdate === "") {
      objectData = {
        ElectionName: ElectionName.current.value,
        RegisterDate: RegisterDate.current.value,
      };
      console.log(objectData)
      dispatch({ type: POST_ELECTION_PENDING, payload: objectData });
    } else {
      // Assuming objectData is defined somewhere before
      dispatch({ type: UPDATE_ELECTION_PENDING, payload: objectData });
    }
    navigate("/create-election");
  };

  const handlechange = () => {

  }
  useEffect(() => {
    if (state) {
      const { editData } = state;
      setIsUpdate(editData._id);
      setValue("ElectionName", editData.ElectionName);
      const RegisterDate = new Date(editData.RegisterDate);
      setValue("RegisterDate", RegisterDate);
      const formattedDate = RegisterDate.toISOString().split("T")[0];
      setValue("RegisterDate", formattedDate);
      setSelectedDate(formattedDate);
    }
  }, []);
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
            onChange={(e) => handlechange(e.target.value)}
            ref={ElectionName}
            //  onChange={(e) => setValue("ElectionName", e.target.value)}
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
            ref={RegisterDate}
            onChange={(e) => setValue("RegisterDate", e.target.value)}
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
