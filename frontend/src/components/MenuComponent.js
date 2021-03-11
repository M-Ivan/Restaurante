import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardText,
  CardHeader,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function RenderMenuItem(dish) {
  const [fullDisplay, setFullDisplay] = useState(false);
  return (
    <Card
      className="animated"
      onMouseEnter={() => setFullDisplay(true)}
      onMouseLeave={() => setFullDisplay(false)}
    >
      <Link to={`/menu/${dish.dish._id}`}>
        <CardImg
          top
          width="100%"
          height="100%"
          src={baseUrl + dish.dish.image}
          alt={dish.name}
        />
        <CardHeader className="text-center" tag="h4">
          {dish.dish.name}
        </CardHeader>
        <CardTitle tag="h6" className="mb-2">
          Estilo: {dish.dish.label}
        </CardTitle>{" "}
        <CardSubtitle tag="h6" className="mb-2">
          Categoria: {dish.dish.category}
        </CardSubtitle>
        {fullDisplay ? (
          <CardText className="text-muted">{dish.dish.description}</CardText>
        ) : (
          <hr /> && <CardText className="text-muted">Saber mas...</CardText>
        )}
      </Link>
    </Card>
  );
}

export default function Menu(props) {
  const menu = props.dishes.dishes.map((dish) => {
    return (
      <div key={dish._id} className="col-12 col-md-5 m-1 ">
        <RenderMenuItem dish={dish} />
      </div>
    );
  });

  if (props.dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.dishes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.dishes.errMess}</h4>
        </div>
      </div>
    );
  } else
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Inicio</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Menú</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menú</h3>
            <hr />
          </div>
        </div>
        <div className="row">{menu}</div>
      </div>
    );
}
