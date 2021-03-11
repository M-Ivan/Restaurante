//imports
import React from "react";
import { Card, CardImg, CardText, CardTitle, CardHeader } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";
import { Link } from "react-router-dom";

//Card basica de la HomeScreen
function RenderCard({ item, isLoading, errMess }) {
  if (item) {
    if (isLoading) {
      return <Loading />;
    } else if (errMess) {
      return <h4>{errMess}</h4>;
    } else
      return (
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
        >
          <Card className="animated">
            <CardImg src={baseUrl + item.image} alt={item.name} />
            <CardHeader tag="h4">{item.name}</CardHeader>
            {item.designation ? (
              <CardTitle tag="h6">{item.designation}</CardTitle>
            ) : null}
            {item.label ? <CardTitle tag="h6">{item.label}</CardTitle> : null}
            <CardText className="text-muted">{item.description}</CardText>
          </Card>
        </FadeTransform>
      );
  } else {
    return null;
  }
}

export default function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          {props.dish ? (
            <Link className="link" to={`/menu/${props.dish._id}`}>
              <RenderCard
                item={props.dish}
                isLoading={props.dishesLoading}
                errMess={props.dishesErrMess}
              />
            </Link>
          ) : null}
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promosLoading}
            errMess={props.promosErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <Link to="/aboutus" className="link">
            <RenderCard
              item={props.leader}
              isLoading={props.leaderLoading}
              errMess={props.leaderErrMess}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
