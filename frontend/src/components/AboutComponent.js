// Imports
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Media,
} from "reactstrap";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { Fade, Stagger } from "react-animation-components";

//Display leader
function RenderLeader({ leader }) {
  return (
    <div>
      <Media className="leaders" tag="li">
        <Media left middle>
          <Media object width={150} src={leader.image} alt={leader.name} />
        </Media>
        <Media body className="ml-5">
          <Media heading>{leader.name}</Media>
          <p>{leader.designation}</p>
          <p>{leader.description}</p>
        </Media>
      </Media>
      <hr />
    </div>
  );
}

function LeaderList(props) {
  const leaders = props.leaders.leaders.map((leader) => {
    return (
      <Fade in key={leader._id}>
        <div className="col-12 mt-2">
          <RenderLeader leader={leader} />
        </div>
      </Fade>
    );
  });

  //Handle Loading
  if (props.leaders.isLoading) {
    return <ReactLoading type="spin" width={60} color="#2c82d3"></ReactLoading>;
  } else if (props.leaders.errMess) {
    return (
      <div className="col-12">
        <h4>{props.leaders.errMess}</h4>
      </div>
    );
  } else {
    return (
      <Media list>
        <Stagger in>{leaders}</Stagger>
      </Media>
    );
  }
}

// Rfc de AboutUs
export default function About(props) {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Inicio</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Quienes somos</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Quienes somos</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12 col-md-6">
          <h2>Nuestra Historia</h2>
          <p>
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
            de las industrias desde el año 1500, cuando un impresor (N. del T.
            persona que se dedica a la imprenta) desconocido usó una galería de
            textos y los mezcló de tal manera que logró hacer un libro de textos
            especimen. No sólo sobrevivió 500 años,
          </p>
        </div>
        <div className="col-12 col-md-5">
          <Card>
            <CardHeader className="bg-primary text-white">
              Hechos a Destacar
            </CardHeader>
            <CardBody>
              <dl className="row p-1">
                <dt className="col-6">Comenzamos</dt>
                <dd className="col-6">3 Feb. 2013</dd>
                <dt className="col-6">Accionista Principal</dt>
                <dd className="col-6">HK Fine Foods Inc.</dd>
                <dt className="col-6">Ingresos Brutos del último año</dt>
                <dd className="col-6">$1,250,375</dd>
                <dt className="col-6">Empleados</dt>
                <dd className="col-6">40</dd>
              </dl>
            </CardBody>
          </Card>
        </div>
        <div className="col-12">
          <Card>
            <CardBody className="bg-faded">
              <blockquote className="blockquote">
                <p className="mb-0">
                  You better cut the pizza in four pieces because I'm not hungry
                  enough to eat six.
                </p>
                <footer className="blockquote-footer">
                  Yogi Berra,
                  <cite title="Source Title">
                    The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion Books,
                    2014
                  </cite>
                </footer>
              </blockquote>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h2>Principales Referentes</h2>
          <hr />
        </div>
        <LeaderList leaders={props.leaders} />
      </div>
    </div>
  );
}
