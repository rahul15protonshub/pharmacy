import React, { useEffect, useState, Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { FaChevronRight, FaChevronDown, FaRegHeart } from "react-icons/fa";
import { AiFillCaretRight } from "react-icons/ai";
import { RiHeadphoneLine } from "react-icons/ri";
import { withRouter } from "react-router-dom";
//@ts-ignore
import classnames from "classnames";
//@ts-ignore
import SearchData from "./SearchData";
import HeaderController, { Props } from "./HeaderController.Web";
import "./css/index.scoped.css";
// @ts-ignore
import content from "../content.js";
// import { _ } from '../../../framework/src/IBlock';

//@ts-ignore
import isEmpty from 'lodash/isEmpty';
const img=require('./images/user.png')


const MobileSideNav: any = withRouter((props: any) => {
  const isOpen = props.isOpen;
  const toggle = props.toggle;
  const setShowLogout = props.setShowLogout;
  const [showShopMenu, setShowShopMenu] = useState(false);
  const currentPageActive = props.currentPageActive;
  const category = props.category;

  const routeToAll = (value: any) => {
    if (value !== undefined) {
      let path = "/" + value;
      props.history.push(path);
    } else {
      let path = "/";
      props.history.push(path);
    }
  };

  const isLoggedIn = props.isLoggedIn;

  return (
    <div
      className={isOpen ? "yt-only-mobile-vw tr" : "yt-only-mobile-vw "}
      style={{ cursor: "default" }}
    >
      <div className="yt-mobile-side-nav-wrap">
        <div className="yt-mobile-side-inner-content">
          <div className="yt-inner-cnt-logo">
            <div className="logobox-mb">
              <img
                src={
                  props.themData && props.themData.commonLogoSrc
                    ? props.themData.commonLogoSrc
                    : require("./images/Logo@3x.png")
                }
                className="logoimage"
                alt="studio"
                onClick={() => {
                  props?.history?.push("/home-page");
                  toggle();
                }}
                style={{ cursor: "pointer" }}
              />
              <h3>
                {JSON.parse(localStorage.getItem("appThemData") ?? "{}")
                  ?.ExtraFields?.heading
                  ? JSON.parse(localStorage.getItem("appThemData") ?? "{}")
                      ?.ExtraFields?.heading
                  : "Builder Fan Club"}
              </h3>
            </div>
          </div>
          <div className="yt-inner-cnt">
            {!isLoggedIn ? (
              <div
                className="yt-mb-user-profile d-flex"
                // onClick={() => {
                //  console.log(props)
                //  window.location.hrefy
                //   toggle();
                // }}
                onClick={() => {
                  if (
                    !isEmpty(localStorage.getItem("token")) &&
                    !isEmpty(localStorage.getItem("guestUUID")) &&
                    isEmpty(localStorage.getItem("userData"))
                  ) {
                    props.history.push({
                      pathname: "/",
                      state: { calledFrom: "cart", redirect: "wishlist" },
                    });
                    toggle();
                  } else {
                    //@ts-ignore
                    this.props?.history?.push({
                      pathname: localStorage.getItem("token")
                        ? "/home-page"
                        : "/",
                    });
                    toggle();
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="yt-mb-nav-login-btn">
                  {content.loginNSignup}
                </div>
              </div>
            ) : (
              <div
                className="yt-mb-user-profile d-flex"
                onClick={() => {
                  // history.push('/profile');
                  toggle();
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="yt-header-user-img" />
                <div
                  className="yt-head-user-det"
                  onClick={() => {
                    props?.history?.push({
                      pathname: "/profilebio",
                      state: { activeTab: "profile" },
                    }),
                      toggle;
                  }}
                >
                  <div className="yt-head-name">
                    {JSON.parse(localStorage.getItem("userData") ?? "{}").name}
                  </div>
                  <div className="yt-head-email">
                    {JSON.parse(localStorage.getItem("userData") ?? "{}").email}
                  </div>
                </div>
              </div>
            )}
            <div className="yt-mb-innet-search">
              <div className="yt-mb-side-srch header-search-field-wrap">
                {/* search code */}
              </div>
            </div>
          </div>
          <div className="yt-mobile-nav-content">
            <Navbar color="light" light expand="lg">
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive === "home",
                      })}
                      onClick={() => {
                        // routeToAll("/home-page");
                        //@ts-ignore
                        if (localStorage.getItem("token")) {
                          props?.history?.push("/home-page");
                          toggle();
                        } else {
                          //@ts-ignore
                          window.notify([
                            { type: "danger", message: "Please Login" },
                          ]);
                          toggle();
                        }
                      }}
                    >
                      {content.home}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive === "shop",
                      })}
                      onClick={() => {
                        // routeToAll("/home-page");
                        //@ts-ignore
                        if (localStorage.getItem("token")) {
                          localStorage.setItem("newest", "By Popularity");

                          const route = "../";
                          //@ts-ignore
                          props.history.location.pathname.split("/").join(",")
                            .length < 1
                            ? props.history.push(
                                `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=sold&sort[direction]=desc`
                              )
                            : props.history.push(
                                `./${route.repeat(
                                  props.history.location.pathname
                                    .split("/")
                                    .join(",").length - 1
                                )}Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=sold&sort[direction]=desc`
                              );
                          toggle();
                        } else {
                          //@ts-ignore
                          window.notify([
                            { type: "danger", message: "Please Login" },
                          ]);
                          toggle();
                        }
                      }}
                    >
                      {content.shop}
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive === 'shop',
                      })}
                      onClick={() => {
                        routeToAll('shop?page=1&per_page=15');
                        // window.location.assign("/shop?page=1&per_page=15");
                      }}
                    >
                      {content.market}
                    </NavLink>
                  </NavItem> */}

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive == "aboutus",
                      })}
                      onClick={() => {
                        //@ts-ignore
                        if (localStorage.getItem("token")) {
                          toggle();

                          //@ts-ignore
                          localStorage.setItem("newest", "By Newest");
                          const route = "../";
                          //@ts-ignore
                          props.history.location.pathname.split("/").join(",")
                            .length < 1
                            ? props.history.push(
                                `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true`
                              )
                            : props.history.push(
                                `./${route.repeat(
                                  props.history.location.pathname
                                    .split("/")
                                    .join(",").length - 1
                                )}Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true`
                              );
                        } else {
                          //@ts-ignore
                          window.notify([
                            { type: "danger", message: "Please Login" },
                          ]);
                        }
                      }}
                    >
                      {content.newArrivals}
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive == "aboutus",
                      })}
                      onClick={() => {
                        // props?.history?.push('/aboutus')
                        routeToAll("aboutus");
                        toggle();
                      }}
                    >
                      {content.aboutUs}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive === "contactus",
                      })}
                      onClick={() => {
                        // routeToAll('contact-us');
                        //@ts-ignore
                        if (localStorage.getItem("token")) {
                          props?.history?.push("/contact-us");
                          toggle();
                        } else {
                          //@ts-ignore
                          window.notify([
                            { type: "danger", message: "Please Login" },
                          ]);
                          toggle();
                        }
                      }}
                    >
                      {content.contactUs}
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
          {isLoggedIn ? (
            <div
              className="yt-mobile-nav-content"
              style={{ cursor: "default" }}
            >
              <Navbar color="light" light expand="lg">
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: "/profilebio",

                            state: { activeTab: "wishlist" },
                          });
                          toggle();
                        }}
                      >
                        {content.wishlist}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: "/profilebio",

                            state: { activeTab: "myorder" },
                          });
                          toggle();
                        }}
                      >
                        {content.myOrders}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: "/profilebio",

                            state: { activeTab: "saveaddresses" },
                          });
                          toggle();
                        }}
                      >
                        {content.savedAddresses}
                      </NavLink>
                    </NavItem>
                    {props?.showConnectedAccounts && (
                      <NavItem>
                        <NavLink
                          onClick={() => {
                            props?.history?.push({
                              pathname: "/profilebio",

                              state: { activeTab: "connectaccount" },
                            });
                            toggle();
                          }}
                        >
                          {content.connectedAccounts}
                        </NavLink>
                      </NavItem>
                    )}
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: "/profilebio",

                            state: { activeTab: "helpCenter" },
                          });
                          toggle();
                        }}
                      >
                        {content.helpCenters}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: "/profilebio",

                            state: { activeTab: "notifications" },
                          });
                          toggle();
                        }}
                      >
                        {content.notification}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: "/profilebio",

                            state: { activeTab: "logout" },
                          });
                          toggle();
                        }}
                      >
                        {content.logout}
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          ) : (
            <div
              className="yt-mobile-nav-content"
              style={{ cursor: "default" }}
            >
              <Navbar color="light" light expand="md">
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          // history.push('/help-center');
                          toggle();
                        }}
                      >
                        {content.helpCenters}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          // history.push('/faq');
                          toggle();
                        }}
                      >
                        {content.faqs}
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          )}
        </div>
        <div className={"h-100"} onClick={toggle} />
      </div>
    </div>
  );
});

/// screen
class AppHeaderScreen extends HeaderController {
  myRef: React.RefObject<any>;
  constructor(props: Props) {
    super(props);

    this.myRef = React.createRef<any>();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setSearchDropDown = this.setSearchDropDown.bind(this);
    this.activeTabToggle = this.activeTabToggle.bind(this);
  }

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside, false);
    this.getAllWishlist();
    const themData = JSON.parse(localStorage.getItem("appThemData") ?? "{}");
    this.setState({ themData });
    const users = await JSON.parse(localStorage.getItem("userData") ?? "{}");
    const profileimage = await localStorage.getItem("profileImage");
    if (!isEmpty(users)) {
      this.setState({
        isLoggedIn: true,
        // user: user?.attributes,
        user: localStorage.getItem("userData"),
        userProfileImg: localStorage.getItem("profileImage"),
      });
    } else {
      this.setState({ isLoggedIn: false, user: {} });
    }

    this.getRecentSearch();
    this.getCategoryList();
  }

  async componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside, false);
  }

  handleClickOutside(event: any) {
    if (this.myRef && !this.myRef.current.contains(event.target)) {
      this.setSearchDropDown(false);
      this.setState({
        searchQuery: "",
      });
    }
  }
  setSearchDropDown(value: any) {
    this.setState({ SearchDropDown: value });
  }

  activeTabToggle = (tab: any) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  // const node = this.myRef.current
  render() {
    return (
      <header className="yt-main-header">
        <div className="topbar d-none">
          <Container>
            <span className="yt-header-top-message">
              {content.welcomeToStore}
            </span>
          </Container>
        </div>
        <div className="logocontainer">
          <div style={{ width: "93%", margin: "0 auto" }}>
            <Row className="align-items-center">
              <Col xs={1} className="yt-head-col">
                <Link to={localStorage.getItem("token") ? "/home-page" : "/"}>
                  <div className="d-flex align-items-center" onClick={()=>this.props.history.pathname=='/home-page'?window.location.reload():""}>
                    <div className="logobox">
                      <img
                        src={
                          JSON.parse(
                            localStorage.getItem("appThemData") ?? "{}"
                          )?.commonLogoSrc
                            ? JSON.parse(
                                localStorage.getItem("appThemData") ?? "{}"
                              )?.commonLogoSrc
                            : require("./images/logo.svg")
                        }
                        className="logoimage"
                        alt="studio store"
                      />
                    </div>
                  </div>
                </Link>
              </Col>

              <Col xs={1} md={3} lg={1} className="yt-head-col logo-txt">
                <Link to={localStorage.getItem("token") ? "/home-page" : "/"}>
                  <div onClick={()=>this.props.history.pathname=='/home-page'?window.location.reload():""}>
                    <span>
                      {JSON.parse(localStorage.getItem("appThemData") ?? "{}")
                        ?.ExtraFields?.heading
                        ? JSON.parse(
                            localStorage.getItem("appThemData") ?? "{}"
                          )?.ExtraFields?.heading
                        : "Builder Fan Club"}
                    </span>
                  </div>
                </Link>
              </Col>
              <div className="col-auto mobile">
                <div className="menucontainer yt-main-menu">
                  <Container>
                    <Navbar color="light" light expand="lg">
                      <Nav className="mr-auto" navbar style={{ gap: "24px" }}>
                        <NavItem>
                          <NavLink
                            // className={classnames({
                            //   active: this.state.activeTab === '0',
                            // })}
                            onClick={() => {
                              //@ts-ignore
                              this.activeTabToggle("0");
                              if (localStorage.getItem("token")) {
                                localStorage.setItem("newest", "By Popularity");

                                const route = "../";
                                //@ts-ignore
                                this.props.history.location.pathname
                                  .split("/")
                                  .join(",").length < 1
                                  ? this.props.history.push(
                                      `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=sold&sort[direction]=desc`
                                    )
                                  : this.props.history.push(
                                      `./${route.repeat(
                                        this.props.history.location.pathname
                                          .split("/")
                                          .join(",").length - 1
                                      )}Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=sold&sort[direction]=desc`
                                    );
                              } else {
                                //@ts-ignore
                                window.notify([
                                  { type: "danger", message: "Please Login" },
                                ]);
                              }
                            }}
                          >
                            {content.shop}
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            // className={classnames({
                            //   active: this.state.activeTab === '1',
                            // })}
                            onClick={() => {
                              //@ts-ignore
                              this.activeTabToggle("1");
                              if (localStorage.getItem("token")) {
                                localStorage.setItem("newest", "By Newest");

                                const route = "../";
                                //@ts-ignore
                                this.props.history.location.pathname
                                  .split("/")
                                  .join(",").length < 1
                                  ? this.props.history.push(
                                      `./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true`
                                    )
                                  : this.props.history.push(
                                      `./${route.repeat(
                                        this.props.history.location.pathname
                                          .split("/")
                                          .join(",").length - 1
                                      )}Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true`
                                    );
                              } else {
                                //@ts-ignore
                                window.notify([
                                  { type: "danger", message: "Please Login" },
                                ]);
                              }
                            }}
                          >
                            {content.newArrivals}
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Navbar>
                  </Container>
                </div>
              </div>
              <div className="col-4 yt-head-hide-srch-col">
                <div
                  className="searchcontainer py-2 header-search-field-wrap"
                  ref={this.myRef}
                >
                  <input
                    type="text"
                    placeholder={"Search"}
                    className="searchinput"
                    onClick={() => this.setSearchDropDown(true)}
                    value={this.state.searchQuery}
                    onChange={(e) => {
                      this.setState({
                        searchQuery: e.target.value,
                      });
                      setTimeout(() => {
                        this.state.searchQuery != "" && this.getLiveSearch();
                      }, 300);
                    }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter" && this.state.searchQuery != "") {
                        this.search();
                        this.setSearchDropDown(false);
                      } else {
                        this.quickSearch();
                      }
                    }}
                    onFocus={() => {
                      this.setSearchDropDown(true);
                      this.getRecentSearch();
                    }}
                  />

                  <img
                    src={require("./images/magnifying-glass@3x.png")}
                    alt="search"
                    className="searchicon w3-ripple w3-hover-opacity"
                    onClick={() => {
                      this.state.searchQuery != "" &&
                        (this.search(), this.setSearchDropDown(false));
                    }}
                  />
                  {this.state.SearchDropDown && this.state.searchQuery != "" && (
                    <SearchData
                      hideSearch={() => {
                        this.setState({
                          searchQuery: "",
                        });
                        this.setSearchDropDown(false);
                      }}
                      results={this.state.quickResults}
                      isQuickResults={true}
                    />
                  )}
                  {this.state.SearchDropDown &&
                    this.state.searchQuery == "" &&
                    Array.isArray(this.state.recentSearches) &&
                    this.state.recentSearches.length > 0 && (
                      <SearchData
                        hideSearch={() => {
                          this.setState({
                            searchQuery: "",
                          });
                          this.setSearchDropDown(false);
                        }}
                        results={this.state.recentSearches}
                      />
                    )}
                </div>
              </div>
              <Col xs={3} style={{ flex: "1" }} className="yt-head-col">
                <div
                  className="cartcontainer py-2"
                  style={{
                    flexWrap: localStorage.getItem("userData")
                      ? "unset"
                      : "wrap",
                  }}
                >
                  <div className="d-flex">
                    <span className="d-inline-block yt-cart-icn-mainwp">
                      <svg
                        className="favoriteicon w3-ripple"
                        onClick={() => {
                          if (
                            !isEmpty(localStorage.getItem("token")) &&
                            !isEmpty(localStorage.getItem("guestUUID")) &&
                            isEmpty(localStorage.getItem("userData"))
                          ) {
                            // this.props.history.push("/")
                            this.props.history.push({
                              pathname: "/",
                              state: {
                                calledFrom: "cart",
                                redirect: "wishlist",
                              },
                            });
                          } else {
                            this.props.history.push({
                              pathname: "/profilebio",
                              state: { activeTab: "wishlist" },
                            });
                          }
                        }}
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                        fill="#fff"
                        stroke="currentcolor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      {/* <FaRegHeart
        className="favoriteicon w3-ripple"
        onClick={() => {
          if (!isEmpty(localStorage.getItem("token")) && !isEmpty(localStorage.getItem("guestUUID")) && isEmpty(localStorage.getItem("userData"))) {
            // this.props.history.push("/")
            this.props.history.push({ pathname: "/", state: { "calledFrom": "cart", "redirect": "wishlist" } });
          } else {
            this.props.history.push({
              pathname: "/profilebio",
              state: { activeTab: "wishlist" }
            })
          }
        }}
      /> */}
                      {parseInt(this.state.wishlistLength) > 0 && (
                        <span className="w3-green cart-notify wishlist">
                          {/* @ts-ignore */}

                          {parseInt(this.state.wishlistLength) > 9
                            ? "9+"
                            : this.state.wishlistLength}
                        </span>
                      )}
                    </span>
                    <span className="d-inline-block yt-cart-icn-mainwp">
                      <svg
                        width="24"
                        height="24"
                        onClick={() => {
                          localStorage.removeItem("buyNow");
                          //@ts-ignore
                          if (localStorage.getItem("token")) {
                            this.routeToAll("cart");
                          } else {
                            //@ts-ignore
                            window.notify([
                              { type: "danger", message: "Please Login" },
                            ]);
                          }
                        }}
                        className="carticon w3-ripple"
                        viewBox="0 0 24 24"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 19.125H15.921C16.6526 19.1251 17.2776 18.5973 17.4 17.876L20.037 2.37599C20.1599 1.65508 20.7847 1.12783 21.516 1.12799H22.5"
                          stroke="currentcolor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.875 21.375C8.08211 21.375 8.25 21.5429 8.25 21.75C8.25 21.9571 8.08211 22.125 7.875 22.125C7.66789 22.125 7.5 21.9571 7.5 21.75C7.5 21.5429 7.66789 21.375 7.875 21.375"
                          stroke="currentcolor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15.375 21.375C15.5821 21.375 15.75 21.5429 15.75 21.75C15.75 21.9571 15.5821 22.125 15.375 22.125C15.1679 22.125 15 21.9571 15 21.75C15 21.5429 15.1679 21.375 15.375 21.375"
                          stroke="currentcolor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17.9531 14.625H5.88206C4.50573 14.6248 3.30605 13.6882 2.97206 12.353L1.52206 6.55297C1.46599 6.32884 1.51636 6.09137 1.65858 5.90929C1.80081 5.72721 2.01902 5.62084 2.25006 5.62097H19.4841"
                          stroke="currentcolor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {parseInt(this.state.cartLength) > 0 && (
                        <span className={"w3-green cart-notify"}>
                          {/* @ts-ignore */}
                          {parseInt(this.state.cartLength) > 9
                            ? "9+"
                            : this.state.cartLength}
                        </span>
                      )}
                    </span>
                  </div>
                  {!this.state.isLoggedIn &&
                  isEmpty(
                    JSON.parse(localStorage.getItem("userData") ?? "{}")
                  ) ? (
                    <>
                      <Button
                        className="loginbutton header-log-btn w3-ripple ml-2"
                        onClick={() => {
                          if (
                            !isEmpty(localStorage.getItem("token")) &&
                            !isEmpty(localStorage.getItem("guestUUID")) &&
                            isEmpty(localStorage.getItem("userData"))
                          ) {
                            this.props.history.push({
                              pathname: "/",
                              state: {
                                calledFrom: "cart",
                                redirect: "wishlist",
                              },
                            });
                          } else {
                            //@ts-ignore
                            this.props?.history?.push({
                              pathname: localStorage.getItem("token")
                                ? "/home-page"
                                : "/",
                            });
                          }
                        }}
                      >
                        <span className="desktopContent">
                          {content.loginNSignup}
                        </span>
                        <span className="mobileContent">{content.login}</span>
                      </Button>
                      <img
                        src={require("./images/menuicon.png")}
                        alt="search"
                        className="menuicon d-lg-none w3-ripple"
                        onClick={() => this.showToggleMenu()}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className="userbox w3-ripple d-flex align-items-center"
                        onClick={() =>
                          this.props.history.push({
                            pathname: "/profilebio",
                            state: { activeTab: "profile" },
                          })
                        }
                      >
                        <span>
                          <img
                            // src={this.state.userProfileImg && this.state.userProfileImg && this.state.userProfileImg !== 'null' ? this.state.userProfileImg : require('./images/user.png')}
                            src={
                              this.state.userProfileImg != null
                                ? img
                                : this.state.userProfileImg
                            }
                            alt="user"
                            className="usericon"
                          />
                        </span>
                        {/* <span className="uname">{name.split(' ')[0]}</span> */}
                        {/* <span className="uname">{this.state?.user?.name?.split(' ')[0]}</span> */}
                        <span className="uname">
                          {
                            JSON.parse(
                              localStorage.getItem("userData") ?? "{}"
                            )?.name?.split(" ")[0]
                          }
                        </span>
                        {/* <span className="uname">Shubham</span> */}

                        <AiFillCaretRight
                          style={{ marginLeft: "10px", color: "#8b8f95" }}
                        />
                      </div>
                      <img
                        src={require("./images/menuicon.png")}
                        alt="search"
                        className="menuicon d-lg-none w3-ripple"
                        onClick={() => this.showToggleMenu()}
                      />
                    </>
                  )}
                </div>
              </Col>
            </Row>
            <div className=" yt-head-mb-search-panel">
              {this.state.SearchDropDown && this.state.searchQuery != "" && (
                <SearchData
                  hideSearch={() => {
                    this.setState({
                      searchQuery: "",
                    });
                    this.setSearchDropDown(false);
                  }}
                  results={this.state.quickResults}
                  isQuickResults={true}
                  isMobile={true}
                >
                  <div className="yt-mb-header-search-bar-wrap">
                    <input
                      type="text"
                      placeholder="Search ..."
                      className=""
                      onClick={() => this.setSearchDropDown(true)}
                      value={this.state.searchQuery}
                      onChange={(e) => {
                        this.setState({
                          searchQuery: e.target.value,
                        });
                        setTimeout(() => {
                          this.state.searchQuery != "" && this.getLiveSearch();
                        }, 300);
                      }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          this.search();
                          this.setSearchDropDown(false);
                        } else {
                          this.quickSearch();
                        }
                      }}
                      onFocus={() => {
                        this.setSearchDropDown(true);
                        this.getRecentSearch();
                      }}
                    />
                  </div>
                </SearchData>
              )}
              {this.state.SearchDropDown && this.state.searchQuery == "" && (
                <SearchData
                  hideSearch={() => {
                    this.setState({
                      searchQuery: "",
                    });
                    this.setSearchDropDown(false);
                  }}
                  results={this.state.recentSearches}
                  isMobile={true}
                >
                  <div className="yt-mb-header-search-bar-wrap">
                    <input
                      type="text"
                      placeholder="Search ..."
                      className=""
                      onClick={() => this.setSearchDropDown(true)}
                      value={this.state.searchQuery}
                      onChange={(e) => {
                        this.setState({
                          searchQuery: e.target.value,
                        });
                        setTimeout(() => {
                          this.state.searchQuery != "" && this.getLiveSearch();
                        }, 300);
                      }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          this.search();
                          this.setSearchDropDown(false);
                        } else {
                          this.quickSearch();
                        }
                      }}
                      onFocus={() => {
                        this.setSearchDropDown(true);
                        this.getRecentSearch();
                      }}
                      autoFocus={true}
                    />
                  </div>
                </SearchData>
              )}
            </div>
          </div>
        </div>

        {this.state.collectionCategory && (
          <MobileSideNav
            themData={this.state.themData}
            isOpen={this.state.isOpen}
            toggle={() => this.showToggleMenu()}
            setShowLogout={this.setShowLogout}
            currentPageActive={this.state.currentPageActive}
            category={this.state.category}
            history={this.props.history}
            isLoggedIn={this.state.isLoggedIn}
            searchQuery={this.state.searchQuery}
            SearchDropDown={this.state.SearchDropDown}
            quickResults={this.state.quickResults}
            setSearchDropDown={this.setSearchDropDown}
            search={this.search}
            quickSearch={this.quickSearch}
            getRecentSearch={this.getRecentSearch}
            collectionCategory={
              this.state.collectionCategory && this.state.collectionCategory
            }
            showConnectedAccounts={this.state.isConnectedAccountsShow}
          />
        )}
      </header>
    );
  }
}
// @ts-ignore
export default withRouter(AppHeaderScreen);
// export default  withRouter(App)
