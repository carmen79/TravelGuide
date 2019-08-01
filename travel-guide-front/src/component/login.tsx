import React from "react";
// import { connect } from "react-redux";
// import { setToken } from "../actions";
// import { IGlobalState } from "../reducers";
// import { Link } from "react-router-dom";


const Login: React.FC<any> = props => {
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };
  const getToken = () => {
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email:emailValue, password: passwordValue })
    })
      .then(res => res.text())
      .then(token => {
        console.log(token);
        //el token lo tengo y lo tengo que guardar en Redux
        // props.setTokenInterno(token);

      });
  };

  return (
    <div className="container">

      <div className="card-panel teal lighten-2">
        <h5>Introduce tus datos</h5>
      </div>

      <div className="form-group">
        <div className="input-field col s12">
          <input id="email" className="validate" value={emailValue} type="text" onChange={updateEmail} />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field col s12">
          <input className="validate" id="password"
            value={passwordValue}
            type="password"
            onChange={updatePassword}
            data-testid="password_input"
          />
          <label htmlFor="password">Password</label>
        </div>
      </div>

      <div>
        <button className="waves-effect waves-light btn-small" onClick={getToken}>
          <i className="material-icons right">account_circle</i>
          Login
          </button>
      </div>
    </div >
  );
};

export default Login;

// const mapDispatchToProps = { setTokenInterno: setToken };

// export default connect(
//   null,
//   mapDispatchToProps
// )(Login);
