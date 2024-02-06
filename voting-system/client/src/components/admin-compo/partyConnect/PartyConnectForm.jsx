import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { POST_PARTYCONNECT_PENDING } from '../../../redux-saga/Admin-saga/party-connect/action/action';

function PartyConnectForm() {
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
        console.log(data);
        let formData = new FormData(); //formdata object
        Object.keys(data).forEach(function (key) {
          if (key === "Profile") {
            formData.append(key, data[key][0]);
          } else {
            formData.append(key, data[key]);
          }
        });
        dispatch({ type: POST_PARTYCONNECT_PENDING, payload: formData ,
        headers:{
          "Content-Type":"multipart/form-data"
        }});
        navigate("/party-connect");
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
              <button type="submit" className="AddData">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
}

export default PartyConnectForm