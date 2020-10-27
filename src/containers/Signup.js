import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
import axios from "axios";
import config from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const options = [
  { value: 'Gold', label: 'Gold' },
  { value: 'Silver', label: 'Silver' },
  { value: 'Bronce', label: 'Bronce' },
];

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
      preferredUsername: "",
      errorMessage: "",
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
      comment: '',
      phone : '',
      address : '',
      name : '',
      selectedOption : ''

    };

    //this.validateEmail = this.validateEmail.bind(this);
  }

  componentDidMount() {
 
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

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 8 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleFbLogin = () => {
    this.props.userHasAuthenticated(true);
  };

  handleGoogleLogin = () => {
    this.props.userHasAuthenticated(true);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  // validateEmail = (event) => {
  //   if (this.state.email != null) {
  //     let authObject = { Username: this.state.email };
  //     try {
  //       let url = config.apiGateway.URL + "ValidateUser";
  //       axios.post(url, authObject).then((res) => {
  //         if (res.status == 200) {
  //           if (res.data) {
  //             this.setState({
  //               errorMessage: "User already exists",
  //             });
  //           }
  //         } else {
  //           console.log(res);
  //         }
  //         this.setState({ isLoading: false });
  //       });
  //     } catch (e) {
  //       alert(e.message);
  //     }
  //   }
  // };

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });
    this.setState({
      errorMessage: "",
    });

    let authObject = {
              type: "SignUp",
              Username: this.state.email,
              Password: this.state.password,
              ClientId: config.clientId,
              Name: this.state.name,
              Email:this.state.email,
              Address : this.state.address,
              Type : this.state.selectedOption.value,
              Data : this.state.comment,
              Phone : this.state.phone
    };

    try {
      let url = config.apiGateway.URL + "SignUp";

      // alert (JSON.stringify(authObject));
      axios.post(url, authObject).then((res) => {
        if (res.status == 200) {
          if (res.data.CodeDeliveryDetails == null) {
            this.setState({ errorMessage: res.data });
          } else {
            this.setState({
              newUser: res.data,
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

    this.setState({
      errorMessage: "",
    });

    this.setState({ isLoading: true });

    let authObject = {
      type: "confirmSignUp",
      ConfirmationCode: this.state.confirmationCode,
      Username: this.state.email,
    };

    try {
      let url = config.apiGateway.URL + "SignUp";

      // alert (JSON.stringify(authObject));
      axios.post(url, authObject).then((res) => {
        if (res.status == 200) {
          axios
            .post(config.apiGateway.URL + "SignIn", {
              type: "custom",
              Username: this.state.email,
              Password: this.state.password,
            })
            .then((res) => {
              if (res.status == 200) {
                this.props.history.push("/")
            //     localStorage.setItem("refresh_token", res.data.refreshToken);
            //     localStorage.setItem("access_token", res.data.accessToken);
            //     localStorage.setItem("id_token", res.data.idToken.jwtToken);
            //     localStorage.setItem("name", res.data.userData ? res.data.userData.Name: '');
            //     localStorage.setItem("type", res.data.userData ? res.data.userData.Type : '');
            //     this.props.userHasAuthenticated(true);
            //     if(res.data.userData.Type == 'Gold')
            //     this.props.history.push("/gold");
            // else if(res.data.userData.Type == 'Bronce'){
            //   this.props.history.push("/bronce")
            // }
            // else if (res.data.userData.Type == 'Silver'){
            //    this.props.history.push("/silver")
            // }
              } else {
                console.log(res);
                this.setState({ isLoading: false });
              }
            });
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
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
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

  handleTypeChange = selectedOption => {
    this.setState(
      { selectedOption }
    );
  };

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ToastContainer />
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="address" bsSize="large">
          <ControlLabel>Address</ControlLabel>
          <FormControl
            value={this.state.address}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="phone" bsSize="large">
          <ControlLabel>Phone No</ControlLabel>
          <FormControl
            value={this.state.phone}
            onChange={this.handleChange}
          />
        </FormGroup>
        <br/>
        <span>Type</span>
        <br/>
        <Select
        value={this.state.selectedOption}
        onChange={this.handleTypeChange}
        options={options}
      />
      <br/>
      <br/>
         <FormGroup controlId="comment" bsSize="large">
          <ControlLabel>Comments</ControlLabel>
          <FormControl
            value={this.state.comment}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
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
           // onBlur={this.validateEmail}
          />
        </FormGroup>
        <HelpBlock>{this.state.errorMessage}</HelpBlock>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
