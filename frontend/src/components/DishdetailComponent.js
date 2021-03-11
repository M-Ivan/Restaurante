//Import
import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  CardHeader,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

// Display Plato
function RenderDish({ dish, favorite, postFavorite }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card className="animated">
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardImgOverlay>
            <Button
              outline
              color="danger"
              onClick={() =>
                favorite
                  ? console.log("Already favorite")
                  : postFavorite(dish._id)
              }
            >
              {favorite ? (
                <span className="fa fa-heart"></span>
              ) : (
                <span className="fa fa-heart-o"></span>
              )}
            </Button>
          </CardImgOverlay>
          <CardHeader className="text-center" tag="h4">
            {dish.name}
          </CardHeader>
          <CardTitle tag="h6" className="mb-2">
            Estilo: {dish.label}
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2">
            Categoría: {dish.category}
          </CardSubtitle>
          <CardText>{dish.description}</CardText>
        </Card>
      </FadeTransform>
    </div>
  );
}

// Display de los comments
function RenderComments({ comments, postComment, dishId }) {
  if (comments != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
            {comments.map((comment) => {
              return (
                <Fade in key={comment._id}>
                  <li>
                    <p>{comment.comment}</p>
                    <p>{comment.rating} stars</p>
                    <p>
                      {comment.author.firstname} {comment.author.lastname} ,{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(comment.updatedAt)))}
                    </p>
                  </li>
                </Fade>
              );
            })}
          </Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  else return <div></div>;
}

// Modal de comentarios

const CommentForm = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmit = (values) => {
    toggleModal();
    props.postComment(props.dishId, values.rating, values.comment);
  };

  return (
    <div>
      <Button outline onClick={toggleModal}>
        <span className="fa fa-pencil fa-lg"></span> Comentar
      </Button>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Subir comentario</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Row className="form-group">
              <Col>
                <Label htmlFor="rating">Calificación</Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="comment">Comentario</Label>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  rows="6"
                  className="form-control"
                />
              </Col>
            </Row>
            <Button type="submit" className="bg-primary">
              Publicar
            </Button>
          </LocalForm>
        </ModalBody>
      </Modal>
    </div>
  );
};

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menú</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish
            dish={props.dish}
            favorite={props.favorite}
            postFavorite={props.postFavorite}
          />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish._id}
          />
        </div>
      </div>
    );
  else return <div></div>;
};

export default DishDetail;
