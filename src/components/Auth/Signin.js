import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [formValues, setFormValues] = useState({
    email: "",
    pass: "",
  });

  const [error, setError] = useState({
    email: null,
    pass: null,
  });

  const navigate = useNavigate();

  const changeHandeler = (e) => {
    switch (e.target.name) {
      case "email":
        const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!regex.test(e.target.value)) {
          setError({
            [e.target.name]: 1,
          });
        } else {
          setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
          });
          setError({
            [e.target.name]: null,
          });
        }
        break;

      case "pass":
        if (e.target.value.length < 8 || isNaN(e.target.value)) {
          setError({
            [e.target.name]: 1,
          });
        } else {
          setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
          });
          setError({
            [e.target.name]: null,
          });
        }
        break;

      default:
        setError({
          username: null,
          email: null,
          phone: null,
        });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    setError((prevError) => ({
      ...prevError,
      email: formValues.email === "" ? 1 : null,
      pass: formValues.pass === "" ? 1 : null,
    }));

    // Retrieve user from local storage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("User not found");
      return;
    }

    // Parse stored user data
    const user = JSON.parse(storedUser);

    // Check if credentials match
    if (user.email === formValues.email && user.pass === formValues.pass) {
      // Redirect to home page after successful login
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <section className="contact section bd-container" id="contact">
      <div className="contact__container bd-grid">
        <div className="contact__box">
          <h2 className="section__title">
            Login.. <br />
          </h2>
        </div>
        <form action="" className="contact__form">
          <div className="contact__inputs">
            <div className="contact__content">
              <input
                type="email"
                placeholder=" "
                className="contact__input"
                id="email"
                onChange={changeHandeler}
                name="email"
              />
              <label htmlFor="" className="contact__label">
                Email
              </label>
            </div>

            {error.email && (
              <p className="text-danger">Email not match the pattern...</p>
            )}

            <div className="contact__content">
              <input
                type="password"
                placeholder=""
                className="contact__input"
                id="pass"
                onChange={changeHandeler}
                name="pass"
              />
              <label htmlFor="" className="contact__label">
                Password
              </label>
            </div>

            {error.pass && (
              <p className="text-danger">Password or Email is not Correct..</p>
            )}
          </div>

          <button
            className="button contact__submit"
            id="submit"
            onClick={onSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
