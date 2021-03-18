//Imports
import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ReactLoading from "react-loading";
import MessageBox from "./MessageBox";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import { registerUser } from "../actions/userActions";

// Componente de Registro.
export default withRouter(function RegisterComponent(props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.auth);
  const { token, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(registerUser({ username, firstname, lastname, password }));
    }
  };

  useEffect(() => {
    if (token) {
      props.history.push("/home");
    }
  }, [token]);

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Inicio</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Registro</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row centered row-content">
        <div className="col-12 row centered">
          <h3>Registrarme</h3>
        </div>
        <div className="col-12 col-md-7">
          <Form model="register" onSubmit={submitHandler}>
            {password !== confirmPassword ? (
              confirmPassword.length > 0 ? (
                <MessageBox variant="danger">
                  Las contraseñas no coinciden
                </MessageBox>
              ) : null
            ) : confirmPassword.length > 0 ? (
              <MessageBox variant="success">
                Las contraseñas coinciden
              </MessageBox>
            ) : null}
            {loading && <ReactLoading type="spin" width={120}></ReactLoading>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}

            <div>
              <Row className="form-group">
                <Label htmlFor="username" md={12}>
                  Crea un usuario
                </Label>
                <Col md={12}>
                  <Input
                    className="form-control"
                    type="text"
                    id="username"
                    placeholder="Crea un nombre de usuario, sera el que uses para loggearte"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  ></Input>
                </Col>
              </Row>
            </div>
            <div>
              <Row className="form-group">
                <Label htmlFor="firstname" md={12}>
                  Nombre
                </Label>
                <Col md={12}>
                  <Input
                    className="form-control"
                    type="text"
                    id="firstname"
                    placeholder="Ingresa tu(s) nombre(s)"
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  ></Input>
                </Col>
              </Row>
            </div>
            <div>
              <Row className="form-group">
                <Label htmlFor="username" md={12}>
                  Apellidos
                </Label>
                <Col md={12}>
                  <Input
                    className="form-control"
                    type="text"
                    id="lastname"
                    placeholder="Ingresa tu(s) apellidos(s)"
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  ></Input>
                </Col>
              </Row>
            </div>
            <div>
              <Row className="form-group">
                <Label htmlFor="username" md={12}>
                  Contraseña
                </Label>
                <Col md={12}>
                  <Input
                    className="form-control"
                    type="password"
                    id="password"
                    placeholder="Crea una contraseña"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  ></Input>
                </Col>
              </Row>
            </div>
            <div>
              <Row className="form-group">
                <Label htmlFor="confirmPassowrd" md={12}>
                  Confirmar contraseña
                </Label>
                <Col md={12}>
                  <Input
                    className="form-control"
                    type="password"
                    id="confirmPassoword"
                    placeholder="Vuelve a ingresar tu contraseña"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Input>
                </Col>
              </Row>
            </div>
            <div>
              <Row className="form-group">
                <Label />
                <Col md={12}>
                  <Button color="warning" block type="submit">
                    Registrarme
                  </Button>
                </Col>
              </Row>
            </div>
            <div>
              <Label />
              <div>
                Ya tienes una cuenta? <Link to={`/signin`}>Iniciar sesión</Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
});
