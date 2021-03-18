// Import
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import MessageBox from "../components/MessageBox";
import { withRouter } from "react-router";
import placeholder from "../shared/uploadImage.png";
import {
  Button,
  Input,
  Label,
  Form,
  Card,
  CardImg,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { fetchDishes, updateDish } from "../actions/dishActions";
import { UPDATE_DISH_RESET } from "../constants/dishConstants";
import ReactLoading from "react-loading";

// Rfc de la screen completa.
export default withRouter(function DishEditScreen(props) {
  const dishId = props.match.params.dishId;
  const [name, setName] = useState("Plato");
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("/assets/images/uploadImage.png");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [{ alt, src }, setPreview] = useState({
    src: placeholder,
    alt: "Subir imagen",
  });

  const auth = useSelector((state) => state.auth);
  const { admin, isAuthenticated } = auth;

  const dishList = useSelector((state) => state.dishList);
  const { loading, error } = dishList;
  const dish = dishList.dishes;

  const dishUpdate = useSelector((state) => state.dishUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = dishUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    // Verifica si el usiario es admin
    if (!isAuthenticated || !admin) {
      props.history.push("/home");
    }
    //Hace refresh al menú
    if (successUpdate) {
      props.history.push("/menu");
      dispatch(fetchDishes());
    }
    if (!dish || dish._id !== dishId || successUpdate) {
      dispatch({ type: UPDATE_DISH_RESET });
    } else {
      setName(dish.name);
      setPrice(dish.price);
      setImage(dish.image);
      setLabel(dish.label);
      setCategory(dish.category);
      setDescription(dish.description);
      setFeatured(dish.featured);
    }
  }, [dish, dispatch, dishId, successUpdate, props.history]);

  // Manda el put al servidor cuando se confirman los valores
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDish({
        _id: dishId,
        name,
        label,
        price,
        image,
        category,
        description,
        featured,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const bearer = "Bearer " + localStorage.getItem("token");

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview({
        // Ubica la imagen en la preview
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: bearer,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  // Render / return
  return (
    <div>
      <div className="row row-content">
        <Form className="col-6" onSubmit={submitHandler}>
          <div>
            <h1>Editar plato: {name}</h1>
          </div>
          {loadingUpdate && (
            <ReactLoading type="spin" width={60} color="#2c82d3"></ReactLoading>
          )}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
          {loading ? (
            <ReactLoading type="spin" width={60} color="#2c82d3"></ReactLoading>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div>
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ingresa el Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Input>{" "}
              </div>
              <div>
                <Label htmlFor="name">Estilo</Label>
                <Input
                  id="label"
                  type="text"
                  placeholder="Picante, italiana, etc."
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                ></Input>
              </div>

              <div>
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Ingresa el precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Input>
              </div>
              <div>
                <Label htmlFor="image">Imagen</Label>
                <Input
                  id="image"
                  disabled
                  placeholder="JPG, PNG, JPEG."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Input>
              </div>
              <div>
                <Label htmlFor="imageFile">
                  Se recomiendan imagenes de 700x500px, se pueden redimensionar{" "}
                  <a href="https://www.resizepixel.com/">aquí</a>
                </Label>
                <Input
                  type="file"
                  id="imageFile"
                  label="Elegir"
                  onChange={uploadFileHandler}
                ></Input>
                {loadingUpload && (
                  <ReactLoading type="spin" width={120}></ReactLoading>
                )}
                {errorUpload && (
                  <MessageBox variant="danger">{errorUpload}</MessageBox>
                )}
              </div>
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Input
                  id="category"
                  type="text"
                  placeholder="Bebidas, Principales, Postres, etc."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Input>
              </div>
              <div className="container">
                <Input
                  id="featured"
                  type="checkbox"
                  name="featured"
                  value={featured}
                  onChange={() => setFeatured(!featured)}
                />
                <Label check htmlFor="featured">
                  Promocionado
                </Label>
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <textarea
                  className="form-control"
                  id="description"
                  type="text"
                  placeholder="Escribe una breve descripción.."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <Label></Label>
                <Button
                  className="col-3 md-2 m-1"
                  color="success"
                  type="submit"
                >
                  Actualizar
                </Button>
              </div>
            </div>
          )}
        </Form>
        {name !== "" ? (
          <Card className="col-5 md-4 m-2">
            {image !== "" ? (
              <CardImg top width="300px" src={src} />
            ) : (
              <CardImg top width="100%" src={placeholder} alt={name} />
            )}
            <CardHeader className="text-center" tag="h4">
              {name}
            </CardHeader>
            <CardTitle tag="h6" className="mb-2">
              Estilo: {label}
            </CardTitle>{" "}
            <CardSubtitle tag="h6" className="mb-2">
              Categoria: {category}
            </CardSubtitle>
            <CardText className="text-muted">{description}</CardText>
          </Card>
        ) : null}
      </div>
    </div>
  );
});
