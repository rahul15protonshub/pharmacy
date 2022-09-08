// @ts-nocheck
import React from "react";
import CategoriesController, { Props } from "./CategoriesController.web";

//@ts-ignore
import "../assets/css/index.css";
import {
  Container,
  Button,
  NavItem,
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Carousel from "react-elastic-carousel";
import { useMediaQuery } from "react-responsive";
import { withRouter, RouteComponentProps } from "react-router-dom";
// Customizable Area End

const CategoryCarousel = (props: any) => {
  let carousel = React.createRef();
  let Breakpoints = [
    { width: 200, itemsToShow: 2, itemsToScroll: 2 },
    { width: 320, itemsToShow: 2, itemsToScroll: 2 },
    { width: 500, itemsToShow: 2, itemsToScroll: 1 },
    { width: 769, itemsToShow: 3, itemsToScroll: 2 },
    { width: 1000, itemsToShow: 6, itemsToScroll: 2 },
    { width: 1300, itemsToShow: 7, itemsToScroll: 3 },
  ];

  console.log(props);
  const isTabletMid = useMediaQuery({ query: "(max-width: 992px)" });
  const isSmallMobile = useMediaQuery({ query: "(max-width: 480px)" });
  return (
    <>
      {isSmallMobile || isTabletMid ? (
        <>
          <Carousel
            isRTL={false}
            pagination={false}
            showArrows={false}
            //@ts-ignore
            ref={carousel}
            breakPoints={Breakpoints}
            disableArrowsOnEnd
          >
            {props.children}
          </Carousel>
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};

class Categories extends CategoriesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    let carousel = React.createRef();
    let Breakpoints = [
      { width: 200, itemsToShow: 2, itemsToScroll: 2 },
      { width: 320, itemsToShow: 2, itemsToScroll: 2 },
      { width: 500, itemsToShow: 3, itemsToScroll: 1 },
      { width: 769, itemsToShow: 5, itemsToScroll: 2 },
      { width: 1000, itemsToShow: 6, itemsToScroll: 2 },
      { width: 1300, itemsToShow: 7, itemsToScroll: 3 },
    ];
    let BreakpointsForCollection = [
      { width: 1, itemsToShow: 2.5 },
      { width: 500, itemsToShow: 3.5 },
      { width: 1000, itemsToShow: 4 },
    ];
    return (
      <>
        <section className="collections-category">
          <div className="main-container">
            <div
              class="yt-produstslider-info d-flex justify-content-between
                 align-items-center"
            >
              <h2 className="category-title">{"CATEGORIES"}</h2>
              <div class="yt-comonent-link">
                <Button
                  color="link yt-component-more px-0"
                  onClick={() => {
                    localStorage.setItem("newest", "By Newest");
                    //@ts-ignore
                    this.props?.history?.push(
                      `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc`
                    );
                  }}
                >
                  View All
                </Button>
              </div>
            </div>
            <Container className="pt-3 category-1-container">
              <Row className="custom_slider">
                <CategoryCarousel>
                  {[1, 2, 3, 4].map((_data: any) => {
                    return (
                      <Col sm="1" md="3">
                        <Card inverse className="categories-card-1">
                          <CardImg
                            width="100%"
                            height="100%"
                            src={
                              "https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                            }
                          />
                          <CardImgOverlay className="d-flex flex-column justify-content-end p-0">
                            <div className="category-1-background">
                              Category {_data}
                            </div>
                          </CardImgOverlay>
                        </Card>
                      </Col>
                    );
                  })}
                </CategoryCarousel>
              </Row>
            </Container>
          </div>
        </section>
        <section className="collections-category">
          <div className="main-container">
            <div
              class="yt-produstslider-info d-flex justify-content-between
                 align-items-center"
            >
              <h2 className="category-title-3">{"CATEGORIES"}</h2>
              <span style={{ border: "1px solid black", width: "75%" }} />
              <div class="yt-comonent-link">
                <Button
                  color="link yt-component-more px-0"
                  onClick={() => {
                    localStorage.setItem("newest", "By Newest");
                    //@ts-ignore
                    this.props?.history?.push(
                      `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc`
                    );
                  }}
                >
                  View All
                </Button>
              </div>
            </div>
            <Container className="pt-3">
              <Row>
                {[1, 2, 3, 4, 5, 6].map((_data: any) => {
                  return (
                    <>
                      <Col sm="6" md="2">
                        <Card className="categories-card-3 border-0">
                          <CardImg
                            width="100%"
                            height="80%"
                            src={
                              "https://images.unsplash.com/photo-1556910633-5099dc3971e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2825&q=80"
                            }
                          />
                          <CardText className="text-center pt-2 category-3-text">
                            Category {_data}
                          </CardText>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Container>
          </div>
        </section>
        <section
          className="collections-category"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <div className="main-container">
            <Container className="pt-3">
              <Row>
                <Col
                  md="4"
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <span className=" category-title-2 text align-self-center">
                    CATEGORIES
                  </span>
                  <div class="yt-comonent-link">
                    <Button
                      color="link yt-component-more px-0"
                      onClick={() => {
                        localStorage.setItem("newest", "By Newest");
                        //@ts-ignore
                        this.props?.history?.push(
                          `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc`
                        );
                      }}
                    >
                      View All
                    </Button>
                  </div>
                </Col>
                {[1, 2, 3, 4].map((_data: any) => {
                  return (
                    <>
                      <Col sm="6" md="2">
                        <Card inverse className="categories-card-4 border-0">
                          <CardImg
                            width="100%"
                            height="100%"
                            src={
                              "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            }
                          />
                          <CardImgOverlay className="d-flex flex-column justify-content-center p-0">
                            <div className="text align-self-center category-4-text">
                              <span>Category {_data}</span>
                            </div>
                          </CardImgOverlay>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Container>
          </div>
        </section>
      </>
    );
    // Customizable Area End
  }
}
interface CategoriesProps extends RouteComponentProps {
  collection: any[];
  addToCart: Function;
  createWishlist: Function;
  deleteWishlist: Function;
  onViewMore: Function;
}
export const CategoryTemplateOne: any = withRouter((props: CategoriesProps) => {
  const { collection, onViewMore, history } = props;
  const slicedProducts: any[] = collection.slice(0, 4);
  const defaultImage: any =
    "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

  return (
    <section className="collections-category">
      <Container>
        <div
          class="yt-produstslider-info d-flex justify-content-between
           align-items-center"
        >
          <h2 className="category-title">{"CATEGORIES"}</h2>
          <div class="yt-comonent-link">
            <Button
              color="link yt-component-more px-0"
              onClick={() => {
                localStorage.setItem("newest", "By Newest");
                onViewMore();
              }}
            >
              View All
            </Button>
          </div>
        </div>
        <Row className="custom_slider category-1-container">
          <CategoryCarousel>
            {slicedProducts.map((category: any) => {
              return (
                <Col sm="1" md="3">
                  <Card
                    inverse
                    className="categories-card-1"
                    onClick={() => {
                      localStorage.setItem("category", category.id);
                      //@ts-ignore
                      history.push(
                        `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${
                          category.id
                        }`
                      );
                    }}
                  >
                    <CardImg
                      width="100%"
                      height="100%"
                      src={
                        category.attributes.product_image.url || defaultImage
                      }
                    />
                    <CardImgOverlay className="d-flex flex-column justify-content-end p-0">
                      <div className="category-1-background">
                        {category.attributes.name}
                      </div>
                    </CardImgOverlay>
                  </Card>
                </Col>
              );
            })}
          </CategoryCarousel>
        </Row>
      </Container>
    </section>
  );
});
export const CategoryTemplateTwo: any = withRouter((props: CategoriesProps) => {
  const { collection, onViewMore, history } = props;
  const slicedProducts: any[] = collection.slice(0, 4);
  const defaultImage: any =
    "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

  return (
    <section className="collections-category">
      <Container>
        <div
          class="yt-produstslider-info d-flex justify-content-between
         align-items-center"
        >
          <h2 className="category-title-2">{"CATEGORIES"}</h2>
          <div class="yt-comonent-link">
            <Button
              color="link yt-component-more px-0"
              onClick={() => {
                localStorage.setItem("newest", "By Newest");
                onViewMore();
              }}
            >
              View All
            </Button>
          </div>
        </div>
        <Row>
          {slicedProducts.map((category: any) => {
            return (
              <>
                <Col sm="1" md="3">
                  <Card
                    className="categories-card-2 border-0"
                    onClick={() => {
                      localStorage.setItem("category", category.id);
                      //@ts-ignore
                      history.push(
                        `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${
                          category.id
                        }`
                      );
                    }}
                  >
                    <div className="card-img-parent">
                      <CardImg
                        width="100%"
                        height="100%"
                        src={
                          category.attributes.product_image.url || defaultImage
                        }
                      />
                    </div>
                    <CardText className="text-center pt-2 category-2-text">
                      {category.attributes.name}
                    </CardText>
                  </Card>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </section>
  );
});
export const CategoryTemplateThree: any = withRouter(
  (props: CategoriesProps) => {
    const { collection, onViewMore, history } = props;
    const slicedProducts: any[] = collection.slice(0, 6);
    const defaultImage: any =
      "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

    return (
      <section className="collections-category">
        <Container>
          <div
            class="yt-produstslider-info d-flex justify-content-between
         align-items-center"
          >
            <h2 className="category-title-3">{"CATEGORIES"}</h2>
            <span style={{ border: "1px solid black", width: "75%" }} />
            <div class="yt-comonent-link">
              <Button
                color="link yt-component-more px-0"
                onClick={() => {
                  localStorage.setItem("newest", "By Newest");
                  onViewMore();
                }}
              >
                View All
              </Button>
            </div>
          </div>
          <Row>
            {slicedProducts.map((category: any) => {
              return (
                <>
                  <Col sm="6" md="2">
                    <Card
                      className="categories-card-3 border-0"
                      onClick={() => {
                        localStorage.setItem("category", category.id);
                        //@ts-ignore
                        history.push(
                          `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${
                            category.id
                          }`
                        );
                      }}
                    >
                      <CardImg
                        width="100%"
                        height="80%"
                        src={
                          category.attributes.product_image.url || defaultImage
                        }
                      />
                      <CardText className="text-center pt-2 category-3-text">
                        {category.attributes.name}
                      </CardText>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Container>
      </section>
    );
  }
);
export const CategoryTemplateFour: any = withRouter(
  (props: CategoriesProps) => {
    const { collection, onViewMore, history } = props;
    const slicedProducts: any[] = collection.slice(0, 4);
    const defaultImage: any =
      "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

    return (
      <section
        className="collections-category"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <Container>
          <Row>
            <Col
              md="4"
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <span className=" category-title-2 text align-self-center">
                CATEGORIES
              </span>
              <div class="yt-comonent-link">
                <Button
                  color="link yt-component-more px-0"
                  onClick={() => {
                    localStorage.setItem("newest", "By Newest");
                    onViewMore();
                  }}
                >
                  View All
                </Button>
              </div>
            </Col>
            {slicedProducts.map((category: any) => {
              return (
                <>
                  <Col sm="6" md="2">
                    <Card
                      inverse
                      className="categories-card-4 border-0"
                      onClick={() => {
                        localStorage.setItem("category", category.id);
                        history.push(
                          `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${
                            category.id
                          }`
                        );
                      }}
                    >
                      <CardImg
                        width="100%"
                        height="100%"
                        src={
                          category.attributes.product_image.url || defaultImage
                        }
                      />
                      <CardImgOverlay className="d-flex flex-column justify-content-center p-0">
                        <div className="text align-self-center category-4-text">
                          <span>{category.attributes.name}</span>
                        </div>
                      </CardImgOverlay>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Container>
      </section>
    );
  }
);

//@ts-ignore
export default Categories;
