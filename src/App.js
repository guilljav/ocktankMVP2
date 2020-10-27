import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";
import Logo from './logo.ico';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      isRoleSelected: false,
      selectedRole: "",
    };
  }

  async componentDidMount() {
    
    try {
      await Auth.currentAuthenticatedUser();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "not authenticated") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  userHasSelectedRole = (roleSelected) => {
    this.setState({ isRoleSelected: roleSelected });
  };

  selectedRole = (app) => {
    this.setState({ selectedRole: app });
  };

  handleLogout = async (event) => {
    await Auth.signOut();

    this.userHasAuthenticated(false);
    this.userHasSelectedRole(false);
    this.selectedRole("");

    this.props.history.push("/");
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      userHasSelectedRole: this.userHasSelectedRole,
      selectedRole: this.selectedRole,
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App container">
          <Navbar fluid collapseOnSelect className="bg-primary-gradient">
            <Navbar.Header>
              <Navbar.Brand href="/">
              <img
                src={Logo}
                width="100"
                height="100"
                className="d-inline-block align-top"
                alt="logo"
              />
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              
                <Nav pullRight>
                  {this.state.isAuthenticated ? (
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                  ) : (
                    <Fragment>
                      <LinkContainer
                        to={{
                          pathname: "/signup"
                        }}
                      >
                        <NavItem>Signup</NavItem>
                      </LinkContainer>
                      <LinkContainer
                        to={{
                          pathname: "/"
                        }}
                      >
                        <NavItem>Login</NavItem>
                      </LinkContainer>
                    </Fragment>
                  )}
                </Nav>
             
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(App);
