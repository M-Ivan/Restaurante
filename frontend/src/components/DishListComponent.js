import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Button, Media } from "reactstrap";
import { createDish, deleteDish, listDishes } from "../actions/dishActions";
import ReactLoading from "react-loading";
import MessageBox from "../components/MessageBox";

import {
  CREATE_DISH_RESET,
  DELETE_DISH_RESET,
} from "../constants/dishConstants";

export default withRouter(function DishListScreen(props) {
  const dishList = useSelector((state) => state.dishList);
  const { loading, error, dishes } = dishList;

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
      dispatch(listDishes());
    }
    dispatch(listDishes());
  }, [successDelete, successCreate, createdDish, props.history, dispatch]);

  const deleteHandler = (dish) => {
    if (window.confirm("Seguro que querés eliminar?")) {
      dispatch(deleteDish(dish._id));
    }
  };
  const createHandler = () => {
    dispatch(createDish());
  };
  return (
    <div className="container">
      <div className="row">
        <h1>Platos:</h1>
      </div>{" "}
      <div className="row">
        <Button type="button" color="success" onClick={createHandler}>
          Agregar un plato
        </Button>
      </div>
      {loadingDelete && (
        <ReactLoading type="spin" width={60} color="#2c82d3"></ReactLoading>
      )}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && (
        <ReactLoading type="spin" width={60} color="#2c82d3"></ReactLoading>
      )}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <ReactLoading type="spin" width={60} color="#2c82d3"></ReactLoading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            {dishes.length === 0 ? (
              <MessageBox className="col-12" variant="info">
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
            {dishes.map((dish) => (
              <tr key={dish._id}>
                <td>
                  <strong>#{dish._id}</strong>
                </td>
                <Link to={`/menu/${dish._id}`}>
                  <Media object width={50} src={dish.image} alt={dish.name} />
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
                <td className="price">${dish.price}</td>
                <td>{dish.category}</td>
                <td>
                  <Button
                    type="button"
                    color="info"
                    className="small mr-1"
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
  );
});
