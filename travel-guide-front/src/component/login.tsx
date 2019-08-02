import React from "react";
import { connect } from "react-redux";
import { setToken } from "../Actions/actions";
import { IGlobalState } from "../Reducers/reducers";
import { Link } from "react-router-dom";

interface IPropsGlobal {
  setTokenInterno: (t: string) => void;
}

const Login: React.FC<IPropsGlobal> = props => {
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };
  const getToken = () => {
    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: emailValue, password: passwordValue })
    })
      .then(res => res.text())
      .then(token => {
        console.log(token);
        //el token lo tengo y lo tengo que guardar en Redux
        props.setTokenInterno(token);
        // Aquí añadir la sesion storage

      });
  };
  const styleWhite = {
    color: 'white'
  };
  return (
    <div >

      <div className="card-panel teal lighten-2">
        <h5 style={styleWhite}>Introduce tus datos</h5>
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

      <div className="flex-container">
        <div>
          <a href=" javascript:getToken()" className="waves-effect waves-light btn">
            <i className="material-icons left">account_circle</i>Identificarse</a>
        </div>
        <div>
          <a href="#close" className="waves-effect waves-light btn">
            <i className="material-icons left">cancel</i>Cancelar</a>
        </div>
      </div>
    </div >
  );
};

// export default Login;

const mapDispatchToProps = { setTokenInterno: setToken };

export default connect(
  null,
  mapDispatchToProps
)(Login);
