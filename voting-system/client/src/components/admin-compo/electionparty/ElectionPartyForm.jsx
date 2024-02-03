import React from "react";
import { useForm } from "react-hook-form";
import { POST_ELECTION_PARTY_PENDING } from "../../../redux-saga/Admin-saga/election-party/action/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ElectionPartyForm = () => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    let formData = new FormData(); //formdata object
    Object.keys(data).forEach(function (key) {
      if (key === "Profile") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });
    dispatch({ type: POST_ELECTION_PARTY_PENDING, payload: formData ,
    headers:{
      "Content-Type":"multipart/form-data"
    }});
    navigate("/election-party");
  };
  return (
    <div>
      <form className="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="innerfield">
          <label htmlFor="pName">Party Name</label>
          <input
            type="text"
            id="pName"
            className="inputfield"
            placeholder="E-Election Party Name"
            {...register("pName", { required: "Party Name is required" })}
          />
          {errors.pName && <p className="error">{errors.pName.message}</p>}
        </div>
        <div className="innerfield">
          <label htmlFor="shortCode">Party Code</label>
          <input
            type="text"
            id="shortCode"
            className="inputfield"
            placeholder="E-Election Party short Code"
            {...register("shortCode", {
              required: "Party short Code is required",
            })}
          />
          {errors.shortCode && (
            <p className="error">{errors.shortCode.message}</p>
          )}
        </div>
        <div className="innerfield">
          <label htmlFor="Profile">Party Image</label>
          <input
            type="file"
            id="Profile"
            name="Profile"
            className="inputfield"
            {...register("Profile", { required: "Party Image is required" })}
          />
          {errors.Profile && <p className="error">{errors.Profile.message}</p>}
        </div>
        <div className="innerfield">
          <button type="submit" className="AddData">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ElectionPartyForm;
