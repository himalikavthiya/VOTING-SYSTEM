import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { POST_ELECTION_PENDING } from "../../../redux-saga/Admin-saga/create-election/action/action";
import { useForm } from "react-hook-form";

function ElectionForm() {
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
    console.log(data)
      let formData = new FormData(); //formdata object
        Object.keys(data).forEach(function (key) {
          if (key === 'Profile') {
            formData.append(key, data[key][0])
          } else {
            formData.append(key, data[key])
          }
        })
    dispatch({ type: POST_ELECTION_PENDING, payload: formData });
    navigate("/create-election");
  };
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
            placeholder="Election Date "
            {...register("RegisterDate", {
              required: "Election Date is required",
            })}
          />
          {errors.RegisterDate && (
            <p className="error">{errors.RegisterDate.message}</p>
          )}
        </div>
        <div className="innerfield">
          <button type="submit" className="AddData">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ElectionForm;
