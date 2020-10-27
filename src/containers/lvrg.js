import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import queryString from "qs";

export default class Lvrg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    //alert(this.props.location.search);
    let accessString = this.props.location.search;
    let params = new URLSearchParams(accessString);
    let code = params.get("code");
    if (code != null) this.getToken(code);
  }

  getToken(accesscode) {
    const options = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    let authdata = {
      grant_type: "authorization_code",
      client_id: config.lvrgClientId,
      code: accesscode,
      redirect_uri: config.lvrgCallBackURL,
    };

    axios
      .post(
        config.lvrgDomain + "oauth2/token",
        queryString.stringify(authdata),
        options
      )
      .then(
        (response) => {
          localStorage.setItem("refreshtoken", response.data.refresh_token);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("id_token", response.data.id_token);
          this.props.userHasAuthenticated(true);
          this.props.userHasSelectedRole(true);
          this.props.selectedApp("lvrg");
          this.props.history.push("/home");
        },
        (error) => {
          alert("errr : " + JSON.stringify(error));
          this.props.history.push("/unauthorized");
        }
      );
  }

  render() {
    return <p>Wait for third party authentication</p>;
  }
}
