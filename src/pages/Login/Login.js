import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../../firebase.config';
import "./Login.style.css";
import { useHistory, Link } from "react-router-dom";
// import firebase from "firebase";
import Config, { auth } from "../../firebase.config";
import { Form } from "react-bootstrap";
import Header from "../../components/Header/Header";


import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

function Login() {
  const [user, setUser] = useState({});
  const [newUser, setNewUser] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const dispatch = useDispatch();

  const history = useHistory();

  if (firebase.apps.length === 0) {
    firebase.initializeApp(Config);
  }

  useEffect(() => {
    dispatch(
      login({
        ...(JSON.parse(localStorage.getItem("food-village")) || {}),
      })
    );
    if (user?.email) {
      history.replace("/admin/bookinglist");
    }
  }, []);

  useEffect(() => {
        if(user){
            dispatch(login({ ...user }));
            localStorage.setItem(
                         "food-village",
                        JSON.stringify({
                              ...user,
                        })
                );
        }

    if (user?.email) {
      history.replace("/admin/bookinglist");
    }
  }, [user]);
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      display: "popup",
    });

    await auth
      .signInWithPopup(provider)
      .then(function (result) {
        const newUser = result.user;
        localStorage.setItem(
          "food-village",
          JSON.stringify({
            name: newUser.displayName,
            email: newUser.email,
            image: newUser.photoURL,
            id: newUser.uid,
          })
        );
        setUser({
          name: newUser.displayName,
          email: newUser.email,
          image: newUser.photoURL,
          id: newUser.uid,
        });
      })
      .then(() => {
        history.push("/admin/bookinglist");
      })
      .catch(function (error) {
        alert(error.message);
        return;
      });
  };

  //handleSubmit.
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userDetails.email || !userDetails.password) {
      alert("Please Enter email and password correctly");
    }

    if (newUser) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
        .then((res) => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updateProfile({
              displayName: userDetails.Fname + " " + userDetails.Lname,
            })
            .then(() => {
              const { displayName, email } = firebase.auth().currentUser;
              setUser({ name: displayName, email });
              history.replace("/admin/bookinglist");
            })
            .catch((err) => alert(err.message));
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(userDetails.email, userDetails.password)
        .then((res) => {
          const { displayName, email } = res.user;
          const googleNewUser = { name: displayName, email: email };
          setUser(googleNewUser);
          history.replace("/admin/bookinglist");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  //handleChange.
  const handleChange = (e) => {
    let emailValid = true;
    if (e.target.name === "Fname") {
      emailValid = e.target.value;
    }
    if (e.target.name === "Lname") {
      emailValid = e.target.value;
    }
    if (e.target.name === "email") {
      emailValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const passwordValid = e.target.value.length >= 6;
      emailValid = passwordValid;
    }
    if (emailValid) {
      const newUserInfo = { ...userDetails };
      newUserInfo[e.target.name] = e.target.value;
      setUserDetails(newUserInfo);
    }
  };

  return (
    <>
      <Header />
      <div className="form_wrapper">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-6 offset-md-3 col-sm-12">
              <Form className="loginFrom" onSubmit={handleSubmit}>
                <h4>{newUser ? "Create an account" : "Log In"}</h4>
                {newUser && (
                  <Form.Group className="mt-4">
                    <Form.Control
                      required
                      onBlur={handleChange}
                      name="Fname"
                      className="formInput"
                      type="text"
                      placeholder="First Name"
                    />
                  </Form.Group>
                )}
                {newUser && (
                  <Form.Group className="mt-4">
                    <Form.Control
                      required
                      onBlur={handleChange}
                      name="Lname"
                      className="formInput"
                      type="text"
                      placeholder="Lest Name"
                    />
                  </Form.Group>
                )}
                <Form.Group className="mt-4">
                  <Form.Control
                    required
                    onBlur={handleChange}
                    name="email"
                    className="formInput"
                    type="email"
                    placeholder="Username Or Email"
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Control
                    required
                    onBlur={handleChange}
                    name="password"
                    className="formInput"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                {!newUser && (
                  <Form.Group className="forgot d-flex justify-content-between">
                    <Form.Check type="checkbox" label="Remember Me " />
                    <Link className="password">Forgot Password</Link>
                  </Form.Group>
                )}
                <div className="d-flex justify-content-center">
                  <input
                    required
                    className="logInBtn"
                    variant="primary"
                    type="submit"
                    value="Log In"
                  />
                </div>
                <div className="text-center">
                  <span>
                    {newUser
                      ? "You already have an account?"
                      : "Don’t have an account?"}
                    <Link
                      className="ml-1"
                      to="/login"
                      onClick={() => setNewUser(!newUser)}
                    >
                      {newUser ? "Log In" : "create new account"}
                    </Link>
                  </span>
                </div>
              </Form>

              <div className="formSocial">
                <div className="d-flex justify-content-center">
                  <span></span>
                  <h6>OR</h6>
                  <span></span>
                </div>
                <div className="fbToGoogle">
                
                  <button className="google btn" onClick={loginWithGoogle}>
                    <img
                      className="fbGoogleImg"
                      src={"https://i.ibb.co/yndt2Wp/Group-573.png"}
                      alt="google"
                    />
                    Continue with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

 
  );
}

export default Login;