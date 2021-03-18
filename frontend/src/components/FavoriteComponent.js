//imports
import React from "react";
import { Media, Breadcrumb, BreadcrumbItem, Button, Fade } from "reactstrap";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

import MessageBox from "./MessageBox";

//Render de los favoritos
function RenderMenuItem({ dish, deleteFavorite }) {
  return (
    <div>
      <Fade in key={dish._id}>
        <Media className="favorites" tag="li">
          <Media left middle>
            <Link to={`/${dish._id}`}>
              <Media
                className="favorites"
                object
                width={200}
                src={dish.image}
                alt={dish.name}
              />
            </Link>
            <p className="favorites-price">$: {dish.price}</p>
          </Media>
          <Media body className="ml-5">
            <Link to={`/${dish._id}`}>
              <Media heading>{dish.name}</Media>
            </Link>
            <p>{dish.description}</p>
            <Button
              outline
              color="danger"
              onClick={() => deleteFavorite(dish._id)}
            >
              <span className="fa fa-trash"></span>
            </Button>
          </Media>
        </Media>
        <hr />
      </Fade>
    </div>
  );
}

//Componente de la pantalla de los favoritos
const Favorites = (props) => {
  if (props.favorites.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <ReactLoading type="spin" width={60} color="#2c82d3"></ReactLoading>{" "}
        </div>
      </div>
    );
  } else if (props.favorites.errMess) {
    return (
      <div className="container">
        <div className="row">
          <MessageBox variant="danger">{props.favorites.errMess}</MessageBox>
        </div>
      </div>
    );
  } else if (props.favorites.favorites) {
    const favorites = props.favorites.favorites.dishes.map((dish) => {
      return (
        <div key={dish._id} className="col-12 mt-5">
          <RenderMenuItem dish={dish} deleteFavorite={props.deleteFavorite} />
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Inicio</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Favoritos</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Mis favoritos</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <Media list>
            {favorites.length !== 0 ? favorites : <h4>No tenes favoritos</h4>}
          </Media>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Inicio</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Mis Favoritos</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Mis Favoritos</h3>
            <hr />
            <Fade in>
              <h4>No tienes favoritos</h4>
            </Fade>
          </div>
        </div>
      </div>
    );
  }
};

export default Favorites;
