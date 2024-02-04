import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { POST_USER_PENDING } from "../../../redux-saga/Admin-saga/create-user/action/action";

function UserForm() {
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

  // handle submit form
  const onSubmit = (data) => {
    let formData = new FormData(); //formdata object
    Object.keys(data).forEach(function (key) {
      if (key === "Profile") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });
    dispatch({ type: POST_USER_PENDING, payload: formData });
    navigate("/create-user");
  };
  return (
    <div className="maincontainer">
      <form className="col-lg-8 userform" onSubmit={handleSubmit(onSubmit)}>

        {/* user name */}
        <div className="col-lg-6">
          <label htmlFor="Name">User Name</label>
          <input
            type="text"
            id="Name"
            className="inputfield"
            placeholder="User Name"
            {...register("Name", { required: "User Name is required" })}
          />
          {errors.Name && <p className="error">{errors.Name.message}</p>}
        </div>
        {/* end */}

        {/* password */}
        <div className="col-lg-6">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            className="inputfield"
            placeholder="User Password"
            {...register("Password", {
              required: "User Password is required",
            })}
          />
          {errors.Password && (
            <p className="error">{errors.Password.message}</p>
          )}
        </div>
        {/* end */}

        {/* Email */}
        <div className="col-lg-6">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            id="Email"
            className="inputfield"
            placeholder="User Email"
            {...register("Email", {
              required: "User Email is required",
            })}
          />
          {errors.Email && <p className="error">{errors.Email.message}</p>}
        </div>
        {/* end */}

        {/* Phone Number */}
        <div className="col-lg-6">
          <label htmlFor="Phone">Phone Number</label>
          <input
            type="text"
            id="Phone"
            className="inputfield"
            placeholder="User Phone"
            {...register("Phone", {
              required: "User Phone is required",
            })}
          />
          {errors.Phone && <p className="error">{errors.Phone.message}</p>}
        </div>
        {/* end */}

        {/* Profile */}
        <div className="col-lg-6">
          <label htmlFor="C">User Profile</label>
          <input
            type="file"
            id="Profile"
            name="Profile"
            className="inputfield"
            {...register("Profile", { required: "User Image is required" })}
          />
          {errors.Profile && <p className="error">{errors.Profile.message}</p>}
        </div>
        {/* end */}

        {/* Card Number */}
        <div className="col-lg-6">
          <label htmlFor="CardNumber">Card Number</label>
          <input
            type="text"
            id="CardNumber"
            className="inputfield"
            placeholder="User CardNumber"
            {...register("CardNumber", {
              required: "CardNumber is required",
            })}
          />
          {errors.CardNumber && (
            <p className="error">{errors.CardNumber.message}</p>
          )}
        </div>
        {/* end */}

        {/* Gender */}
        <div className="col-lg-6">
          <label htmlFor="Sex">Gender</label>
          <input
            type="text"
            id="Sex"
            className="inputfield"
            placeholder="User Gender"
            {...register("Sex", {
              required: "User Gender is required",
            })}
          />
          {errors.Sex && <p className="error">{errors.Sex.message}</p>}
        </div>
        {/* end */}

        {/* User Birthdate */}
        <div className="col-lg-6">
          <label htmlFor="DOB">User Birthdate</label>
          <input
            type="date"
            id="DOB"
            className="inputfield"
            placeholder="User DOB"
            {...register("DOB", {
              required: "User DOB is required",
            })}
          />
          {errors.DOB && <p className="error">{errors.DOB.message}</p>}
        </div>
        {/* end */}

        {/* Address */}
        <div className="col-lg-6">
          <label htmlFor="Address">Address</label>
          <input
            type="textarea"
            id="Address"
            className="inputfield"
            placeholder="User Address"
            {...register("Address", {
              required: "User Address is required",
            })}
          />
          {errors.Address && <p className="error">{errors.Address.message}</p>}
        </div>
        {/* end */}

        <div className="col-lg-12 add">
          <button type="submit" className="AddData">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
