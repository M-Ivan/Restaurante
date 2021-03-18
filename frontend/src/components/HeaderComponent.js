// imports
import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import ReactLoading from "react-loading";

// Rcc del Header.
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  //Maneja el evento login
  handleLogin(event) {
    this.toggleModal();
    this.props.loginUser({
      username: this.username.value,
      password: this.password.value,
    });
    event.preventDefault();
  }

  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="lg">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/logo.png"
                height="40"
                width="40"
                alt="Reactstaurante"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Inicio
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span> Menú
                  </NavLink>
                </NavItem>
                <NavItem>
                  {this.props.auth.isAuthenticated ? (
                    <NavLink className="nav-link" to="/favorites">
                      <span className="fa fa-heart fa-lg"></span> Favoritos
                    </NavLink>
                  ) : null}
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg"></span> Quienes somos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg"></span> Contacto
                  </NavLink>
                </NavItem>
                {this.props.auth.isAuthenticated && this.props.auth.admin ? (
                  <NavItem>
                    <NavLink className="nav-link" to="/dishlist">
                      <span className="fa fa-cog fa-lg success"></span>{" "}
                      Configuración
                    </NavLink>
                  </NavItem>
                ) : null}
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {!this.props.auth.isAuthenticated ? (
                    <Button
                      className="login"
                      color="success"
                      onClick={this.toggleModal}
                    >
                      <span className="fa fa-sign-in fa-lg"></span> Iniciar
                      Sesión
                      {this.props.auth.isFetching ? (
                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                      ) : null}
                    </Button>
                  ) : (
                    <div>
                      {this.props.auth.user !== null || undefined ? (
                        <div className="navbar-text mr-3">
                          {this.props.auth.user.username}
                        </div>
                      ) : this.props.auth.isLoading ? (
                        <ReactLoading
                          type="spin"
                          width={60}
                          color="#2c82d3"
                        ></ReactLoading>
                      ) : null}
                      <Button
                        className="logout"
                        outline
                        color="danger"
                        onClick={this.handleLogout}
                      >
                        <span className="fa fa-sign-out fa-lg"></span> Cerrar
                        Sesión
                        {this.props.auth.isFetching ? (
                          <span className="fa fa-spinner fa-pulse fa-fw"></span>
                        ) : null}
                      </Button>
                    </div>
                  )}
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Reactstaurante</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Iniciar Sesión</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Usuario</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={(input) => (this.remember = input)}
                  />
                  Recordar
                </Label>
              </FormGroup>
              <br />
              <Button
                block
                className="primary"
                color="info"
                type="submit"
                value="submit"
              >
                Iniciar Sesión
              </Button>
              <Label>
                No tenes cuenta?{" "}
                <Link to="/register" onClick={this.toggleModal}>
                  Registrarme
                </Link>
              </Label>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
