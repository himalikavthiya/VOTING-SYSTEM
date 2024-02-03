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
    dispatch({ type: POST_USER_PENDING, payload: formData });
    navigate("/create-user");
  };
  return (
    <div>
      <form className="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="innerfield ">
          <label htmlFor="Profile">User Profile</label>
          <input
            type="file"
            id="Profile"
            name="Profile"
            className="inputfield"
            {...register("Profile", { required: "User Image is required" })}
          />
          {errors.Profile && <p className="error">{errors.Profile.message}</p>}

          <label htmlFor="Password">Password</label><br />
          <input
            type="text"
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
        {/* <div className="innerfield ">

        </div> */}
        <div className="innerfield">
          <label htmlFor="CardNumber">Cardnumber</label>
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
        <div className="innerfield">
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
        {/* <div className="innerfield">
         
        </div> */}
        <div className="innerfield">

          <label htmlFor="Address">Address</label>
          <input
            type="text"
            id="Address"
            className="inputfield"
            placeholder="User Address"
            {...register("Address", {
              required: "User Address is required",
            })}
          />
          {errors.Address && <p className="error">{errors.Address.message}</p>}
        </div>
        {/* <div className="innerfield">
          
        </div> */}
        <div className="innerfield">
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
        {/* <div className="innerfield">
         
        </div> */}
        <div className="innerfield">
          <button type="submit" className="AddData">
            Submit
          </button>
        </div>
      </form>
    </div>



  );
}

export default UserForm;
