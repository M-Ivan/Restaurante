//imports
import React from "react";
import { Media, Breadcrumb, BreadcrumbItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

//Render de los favoritos
function RenderMenuItem({ dish, deleteFavorite }) {
  return (
    <Media className="favorites" tag="li">
      <Media left middle>
        <Link to={`/menu/${dish._id}`}>
          <Media
            object
            width={200}
            src={baseUrl + dish.image}
            alt={dish.name}
          />
        </Link>
      </Media>
      <Media body className="ml-5">
        <Link to={`/menu/${dish._id}`}>
          <Media heading>{dish.name}</Media>
        </Link>
        <p>{dish.description}</p>
        <Button outline color="danger" onClick={() => deleteFavorite(dish._id)}>
          <span className="fa fa-times"></span>
        </Button>
      </Media>
    </Media>
  );
}

//Componente de la pantalla de los favoritos
const Favorites = (props) => {
  if (props.favorites.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.favorites.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.favorites.errMess}</h4>
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
            <h4>No tienes favoritos</h4>
          </div>
        </div>
      </div>
    );
  }
};

export default Favorites;
