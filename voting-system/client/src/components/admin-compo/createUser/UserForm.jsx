import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { POST_USER_PENDING } from '../../../redux-saga/Admin-saga/create-user/action/action';

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
        // dispatch({ type: POST_USER_PENDING, payload: formData });
        // navigate("/create-user");
      };
      return (
        <div>
          <form className="my-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="innerfield">
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
              <label htmlFor="Sex">User Gender</label>
              <input
                type="text"
                id="Sex"
                className="inputfield"
                placeholder="User Gender"
                {...register("Sex", {
                  required: "User Gender is required",
                })}
              />
              {errors.Sex && (
                <p className="error">{errors.Sex.message}</p>
              )}
            </div>
            <div className="innerfield">
              <label htmlFor="Profile">User Profile</label>
              <input
                type="file"
                id="Profile"
                name="Profile"
                className="inputfield"
                {...register("Profile", { required: "User Image is required" })}
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
}

export default UserForm