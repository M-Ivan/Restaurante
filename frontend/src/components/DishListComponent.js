import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Button, Media } from "reactstrap";
import { createDish, deleteDish } from "../actions/dishActions";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import {
  CREATE_DISH_RESET,
  DELETE_DISH_RESET,
} from "../constants/dishConstants";
import { baseUrl } from "../shared/baseUrl";

export default withRouter(function DishListScreen(props) {
  const dishes = useSelector((state) => state.dishes);
  const { isLoading, errMess } = dishes;

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, admin } = auth;

  const dispatch = useDispatch();

  const dishCreate = useSelector((state) => state.dishCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    dish: createdDish,
  } = dishCreate;

  const dishDelete = useSelector((state) => state.dishDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = dishDelete;

  useEffect(() => {
    if (!isAuthenticated || !admin) {
      props.history.push("/home");
    }
    if (successCreate) {
      dispatch({ type: CREATE_DISH_RESET });
      props.history.push(`/dishlist/${createdDish._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: DELETE_DISH_RESET });
    }
  }, [createdDish, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (dish) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteDish(dish._id));
      props.history.push("/dishlist");
    }
  };
  const createHandler = () => {
    dispatch(createDish());
  };
  return (
    <div className="container">
      <div className="row">
        <div>
          <h1>Platos</h1>
          <Button type="button" color="success" onClick={createHandler}>
            Agregar al Menú
          </Button>
        </div>

        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {isLoading ? (
          <LoadingBox></LoadingBox>
        ) : errMess ? (
          <MessageBox variant="danger">{errMess}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              {dishes.dishes.length === 0 ? (
                <MessageBox className="col-12" variant="danger">
                  No hay items
                </MessageBox>
              ) : (
                <tr>
                  <th>#</th>
                  <th></th>
                  <th>PLATO</th>
                  <th>ESTILO</th>
                  <th>PRECIO</th>
                  <th>CATEGORÍA</th>
                  <th>ACCIONES</th>
                </tr>
              )}
            </thead>
            <tbody>
              {dishes.dishes.map((dish) => (
                <tr key={dish._id}>
                  <td>
                    <strong>#{dish._id}</strong>
                  </td>
                  <Link to={`/menu/${dish._id}`}>
                    <Media
                      object
                      width={50}
                      src={baseUrl + dish.image}
                      alt={dish.name}
                    />
                  </Link>
                  <td>
                    {dish.featured ? (
                      <i className="featured fa fa-star"></i>
                    ) : (
                      <i className="featured fa fa-star-o"></i>
                    )}{" "}
                    {dish.name}
                  </td>
                  <td>{dish.label}</td>
                  <td>${dish.price}</td>
                  <td>{dish.category}</td>
                  <td>
                    <Button
                      type="button"
                      color="info"
                      className="small"
                      onClick={() =>
                        props.history.push(`/dishlist/${dish._id}/edit`)
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      color="danger"
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(dish)}
                    >
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
});
