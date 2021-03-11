import React from "react";
import { Card, CardImg, CardText, CardTitle, CardHeader } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";

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

function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMess={props.dishesErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promosLoading}
            errMess={props.promosErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.leader}
            isLoading={props.leaderLoading}
            errMess={props.leaderErrMess}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
