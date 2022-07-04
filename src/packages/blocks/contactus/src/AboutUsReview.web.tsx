import React, { useState, Fragment } from "react";
import { Container } from "reactstrap";
// @ts-ignore
import map from "lodash/map";
import { userProfileIcon } from "./assets";
import "../assets/css/reviews.css";
// Customizable Area Start
// Customizable Area End

function Item(props: any) {
  // Customizable Area Start
  return props.isLastItem ? (
    <div className="yt-review-item d-flex" style={{ marginBottom: "unset" }}>
      <img
        src={props.imageUrl ? props.imageUrl : userProfileIcon}
        alt="Profile Image"
        className="profile-image"
        width="62"
        height="62"
      />
      <div
        className="text-content-block"
        style={{ borderBottom: "unset", paddingBottom: "unset" }}
      >
        <div className="item-name">{props.name}</div>
        <div className="item-comment">{props.comment}</div>
      </div>
    </div>
  ) : (
    <div className="yt-review-item d-flex">
      <img
        src={
          props.imageUrl ? props.imageUrl : userProfileIcon
          // require('./images/profile-image.png')
        }
        alt="Profile Image"
        className="profile-image"
        width="62"
        height="62"
      />
      <div className="text-content-block">
        <div className="item-name">{props.name}</div>
        <div className="item-comment">{props.comment}</div>
      </div>
    </div>
  );
  // Customizable Area End
}

function AboutUsReviews(props: any) {
  // Customizable Area Start
  const [limit, setLimit] = useState(5);
  const itemsCollections = [
    {
      name: "Rameshwar Maheta",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "Rameshwar Maheta",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "Rameshwar Maheta",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "Rameshwar Maheta",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "Rameshwar Maheta",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "Rameshwar Maheta",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "Rameshwar Maheta",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "Rameshwar Maheta",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "Rameshwar Maheta",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: "Rameshwar Maheta",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    // Customizable Area End
  ];

  return (
    // Customizable Area End
    <section className="yt-review-main-wrapper">
      <Container>
        <div className="yt-inner-wrap">
          <h2 className="yt-section-title mt-0 mb-0">What our Customer say</h2>
          <div
            className="yt-inner-content bg-white border-radius-10"
            style={{ marginBottom: "30px" }}
          >
            <Fragment>
              {map(props?.feedbackData, (item: any, index: any) => {
                return (
                  <Item
                    key={index}
                    name={item.customer_name}
                    comment={item.description}
                    isLastItem={index + 1 === itemsCollections.length}
                    imageUrl={item.profile_image}
                  />
                );
              })}
            </Fragment>
          </div>
        </div>
      </Container>
    </section>
    // Customizable Area End
  );
}

export default AboutUsReviews;
// Customizable Area Start
// Customizable Area End
