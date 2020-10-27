import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from "axios";
import config from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      confirmationCodeSent: false,
      deliveryEmail: "",
      passwordPolicy: Object.assign({}, props.passwordPolicy),
      passwordValidation: {
        hasUpperCase: "red",
        hasLowerCase: "red",
        hasNumeric: "red",
        hasSpecialCharacter: "red",
        hasCorrectLength: "red",
        isSuccess: false,
      },
    };
  }

   componentDidMount() {   
    //this.getPasswordPolicy();
  }

  validateForm() {
    return this.state.email.length > 0;
  }

   getPasswordPolicy() {
    let url = config.apiGateway.URL + "common/UserPoolData";
    axios.get(url)
      .then((res) => {
        if (res.status == 200) {
          if (res.data.UserPool.Policies.PasswordPolicy != null) {
            this.setState({
              passwordPolicy: res.data.UserPool.Policies.PasswordPolicy,
            });
          } else {
            //this.setState({loading : false});
            toast.error('Unable to load password policy');
          }
        } else {
          //this.setState({loading : false});
          toast.error('Unable to load password policy');
        }
      })
      .catch((err) => {
        ///this.setState({loading : false});
        toast.error('Unable to load password policy' + JSON.stringify(err));
      });
  }

  validateConfirmationForm() {
    return (
      this.state.confirmationCode.length > 0 &&
      this.state.password.length > 8 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    let authObject = { ClientId: config.clientId, Username: this.state.email };

    try {
      let url = config.apiGateway.URL + "ForgetPassword";
      axios.post(url, authObject).then((res) => {
        if (res.status == 200) {
          if (res.data.CodeDeliveryDetails == null) {
            this.setState({ errorMessage: "User not exists" });
          } else {
            this.setState({
              confirmationCodeSent: true,
              deliveryEmail: res.data.CodeDeliveryDetails.Destination,
            });
          }
        } else {
          console.log(res);
        }
        this.setState({ isLoading: false });
      });
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    let authObject = {
      ConfirmationCode: this.state.confirmationCode,
      Username: this.state.email,
      ClientId: config.clientId,
      Password: this.state.password,
    };

    try {
      let url = config.apiGateway.URL + "ResetPassword";
      axios.put(url, authObject).then((res) => {
        if (res.status == 200) {
          this.props.history.push("/");
        } else {
          console.log(res);
          this.setState({ isLoading: false });
        }
        this.setState({ isLoading: false });
      });
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  validatePassword = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });

    // this.setState((prevState) => ({
    //   passwordValidation: {
    //     ...prevState.passwordValidation,
    //     hasCorrectLength: 'red',
    //     hasLowerCase: 'red',
    //     hasNumeric: 'red',
    //     hasSpecialCharacter: 'red',
    //     hasUpperCase: 'red',
    //     isSuccess: false,
    //   },
    // }));

    // let password = event.target.value;
    // var anUpperCase = /[A-Z]/;
    // var aLowerCase = /[a-z]/;
    // var aNumber = /[0-9]/;
    // var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

    // if (password.length > this.state.passwordPolicy.MinimumLength) {
    //   this.setState((prevState) => ({
    //     passwordValidation: {
    //       ...prevState.passwordValidation,
    //       hasCorrectLength: 'green',
    //     },
    //   }));
    // }

    // var numUpper = 0;
    // var numLower = 0;
    // var numNums = 0;
    // var numSpecials = 0;

    // let passUpper = 0;
    // let passLower = 0;
    // let passNums = 0;
    // let passSpecials = 0;

    // for (var i = 0; i < password.length; i++) {
    //   if (anUpperCase.test(password[i])) numUpper++;
    //   else if (aLowerCase.test(password[i])) numLower++;
    //   else if (aNumber.test(password[i])) numNums++;
    //   else if (aSpecial.test(password[i])) numSpecials++;
    // }

    // if (numUpper >= 1) {
    //   this.setState((prevState) => ({
    //     passwordValidation: {
    //       ...prevState.passwordValidation,
    //       hasUpperCase: 'green',
    //     },
    //   }));
    // }

    // if (numLower >= 1) {
    //   this.setState((prevState) => ({
    //     passwordValidation: {
    //       ...prevState.passwordValidation,
    //       hasLowerCase: 'green',
    //     },
    //   }));
    // }

    // if (numNums >= 1) {
    //   this.setState((prevState) => ({
    //     passwordValidation: {
    //       ...prevState.passwordValidation,
    //       hasNumeric: 'green',
    //     },
    //   }));
    // }

    // if (numSpecials >= 1) {
    //   this.setState((prevState) => ({
    //     passwordValidation: {
    //       ...prevState.passwordValidation,
    //       hasSpecialCharacter: 'green',
    //     },
    //   }));
    // }

    // if (this.state.passwordPolicy.RequireUppercase) {
    //   if (numUpper >= 1) {
    //     passUpper = true;
    //   } else {
    //     passUpper = false;
    //   }
    // } else {
    //   passUpper = true;
    // }

    // if (this.state.passwordPolicy.RequireLowercase) {
    //   if (numLower >= 1) {
    //     passLower = true;
    //   } else {
    //     passLower = false;
    //   }
    // } else {
    //   passLower = true;
    // }

    // if (this.state.passwordPolicy.RequireNumbers) {
    //   if (numNums >= 1) {
    //     passNums = true;
    //   } else {
    //     passNums = false;
    //   }
    // } else {
    //   passNums = true;
    // }

    // if (this.state.passwordPolicy.RequireSymbols) {
    //   if (numSpecials >= 1) {
    //     passSpecials = true;
    //   } else {
    //     passSpecials = false;
    //   }
    // } else {
    //   passSpecials = true;
    // }

    // if (
    //   passUpper &&
    //   passLower &&
    //   passNums &&
    //   passSpecials &&
    //   password.length > this.state.passwordPolicy.MinimumLength
    // ) {
    //   this.setState((prevState) => ({
    //     passwordValidation: {
    //       ...prevState.passwordValidation,
    //       isSuccess: true,
    //     },
    //   }));
    // }
  };


  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <ToastContainer/>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>
            We have sent a password reset code by email to{" "}
            {this.state.deliveryEmail}. Enter it below to reset your password.
          </HelpBlock>
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.validatePassword}
            type="password"
          />
        </FormGroup>
        {/* <div>
                          <span style={{ display: 'block' }}>
                            Password Policy:
                            <ul>
                              {this.state.passwordPolicy.RequireUppercase ? (
                                <li
                                  style={{
                                    fontSize: '80%',
                                    color: this.state.passwordValidation
                                      .hasUpperCase,
                                  }}
                                >
                                  Should include atleast one upper case
                                  character
                                </li>
                              ) : null}
                              {this.state.passwordPolicy.RequireLowercase ? (
                                <li
                                  style={{
                                    fontSize: '80%',
                                    color: this.state.passwordValidation
                                      .hasLowerCase,
                                  }}
                                >
                                  Should include atleast one lower case
                                  character
                                </li>
                              ) : null}
                              {this.state.passwordPolicy.RequireNumbers ? (
                                <li
                                  style={{
                                    fontSize: '80%',
                                    color: this.state.passwordValidation
                                      .hasNumeric,
                                  }}
                                >
                                  Should include atlease one number
                                </li>
                              ) : null}
                              {this.state.passwordPolicy.RequireSymbols ? (
                                <li
                                  style={{
                                    fontSize: '80%',
                                    color: this.state.passwordValidation
                                      .hasSpecialCharacter,
                                  }}
                                >
                                  Should include atleast one special character
                                </li>
                              ) : null}
                              {this.state.passwordPolicy.MinimumLength > 0 ? (
                                <li
                                  style={{
                                    fontSize: '80%',
                                    color: this.state.passwordValidation
                                      .hasCorrectLength,
                                  }}
                                >
                                  Should include{' '}
                                  {this.state.passwordPolicy.MinimumLength}{' '}
                                  characters
                                </li>
                              ) : null}
                            </ul>
                          </span>
                        </div> */}
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Forgot your password?</h2>
        <h4>
          Enter your Email below and we will send a message to reset your
          password
        </h4>

        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <HelpBlock style={{ color: "red" }}>
          {this.state.errorMessage}
        </HelpBlock>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Reset my password"
          loadingText="reseting up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="ForgotPassword">
        {this.state.confirmationCodeSent
          ? this.renderConfirmationForm()
          : this.renderForm()}
      </div>
    );
  }
}
