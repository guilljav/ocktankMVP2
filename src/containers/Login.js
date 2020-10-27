import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import axios from "axios";
import config from "../config";
import queryString from "qs";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  componentDidMount() {

  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });
    let url = "";

    let auth = {
      type: "custom",
      Username: this.state.email,
      Password: this.state.password
    };

    url = config.apiGateway.URL;

    try {
      axios.post(url + "SignIn", auth).then((res) => {
        if (res.status == 200) {
          if (res.data.code != null) {
            if (res.data.code == "NotAuthorizedException") {
              this.props.history.push("/unauthorized");
            } else {
              this.props.history.push("/unauthorized");
            }
          } else {
            localStorage.setItem("refreshtoken", res.data.refreshToken);
            localStorage.setItem("access_token", res.data.accessToken);
            localStorage.setItem("id_token", res.data.idToken.jwtToken);
            localStorage.setItem("name", res.data.userData ? res.data.userData.Name  : '');
            localStorage.setItem("type", res.data.userData ? res.data.userData.Type : '');
            this.props.userHasAuthenticated(true);
            if(res.data.userData.Type == 'Gold')
                this.props.history.push("/gold");
            else if(res.data.userData.Type == 'Bronce'){
              this.props.history.push("/bronce")
            }
            else if (res.data.userData.Type == 'Silver'){
               this.props.history.push("/silver")
            }
          }
        } else {
          this.props.history.push("/unauthorized");
        }
        this.setState({ isLoading: false });
      });
    } catch (e) {
      alert(e);
    }
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <div>
            <ul>
              <li>
                <Link to="/forgotpassword">Forgot your password?</Link>
              </li>
            </ul>
          </div>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}
