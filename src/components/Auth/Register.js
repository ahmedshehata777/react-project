import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    pass: "",
  });

  const [error, setError] = useState({
    username: null,
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

      case "username":
        if (e.target.value.length <= 5) {
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
          pass: null,
        });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    setError((prevError) => ({
      ...prevError,
      username: formValues.username === "" ? 1 : null,
      email: formValues.email === "" ? 1 : null,
      pass: formValues.pass === "" ? 1 : null,
    }));

    // If any field is empty, return without further processing
    if (
      formValues.username === "" ||
      formValues.email === "" ||
      formValues.pass === ""
    ) {
      return;
    }

    // Create user object
    const user = {
      username: formValues.username,
      email: formValues.email,
      pass: formValues.pass,
    };

    // Save user to local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Reset form fields and error message
    setFormValues({
      username: "",
      email: "",
      pass: "",
    });

    setError({
      username: null,
      email: null,
      pass: null,
    });

    setTimeout(navigate("/home"), 3000);
    // Redirect to home page
  };

  return (
    <section className="contact section bd-container" id="contact">
      <div className="contact__container bd-grid">
        <div className="contact__box">
          <h2 className="section__title">
            Join Us, <br /> so you can order our Products any Time
          </h2>
        </div>
        <form action="" className="contact__form">
          <div className="contact__inputs">
            <div className="contact__content">
              <input
                type="text"
                placeholder=" "
                className="contact__input"
                id="name"
                onChange={changeHandeler}
                name="username"
              />
              <label htmlFor="" className="contact__label">
                Name
              </label>
            </div>

            {error.username && (
              <p className="text-danger">
                user name must be longer than 5 chats
              </p>
            )}

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
              <p className="text-danger">
                Password Must be a more than 8 char...
              </p>
            )}
          </div>
          <button
            className="button contact__submit"
            id="submit"
            onClick={onSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
