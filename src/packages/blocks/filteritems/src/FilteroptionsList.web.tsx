// @ts-nocheck
import React, { Fragment } from "react";
import {
  Row,
  Col,
  TabPane,
  NavItem,
  NavLink,
  TabContent,
  Button,
  Nav,
  // Customizable Area Start
  // Customizable Area End
} from "reactstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { FaCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import map from "lodash/map";
import InputRange from "react-input-range";
import "../assets/css/filteroption.css";
import "../assets/css/inputrange.css";
import { BsArrowReturnRight } from "react-icons/bs";
import FilteroptionsListController, {
  Props,
} from "./FilteroptionsListController.web";
import classnames from "classnames";
// @ts-ignore
import content from "../../studio-store-ecommerce-components/src/content.js";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
// Customizable Area Start
// Customizable Area End
class Filteroptions extends FilteroptionsListController {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: "1",
      mobileOrTablet: false,
      // Customizable Area Start
      // Customizable Area End
    };
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    this.setState({ windowSize: window.innerWidth });
    window.addEventListener("resize", this.resizeWindow);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    const tabsName = [
      { name: content.category, index: "1" },
      { name: content.brands, index: "2" },
      { name: content.color, index: "3" },
      { name: content.size, index: "4" },
      { name: content.tag, index: "5" },
      { name: content.material, index: "6" },
      { name: content.kg, index: "7" },
      { name: content.price, index: "8" },
    ];
    return (
      <div className="yt-product-filter-wrap1">
        {this.state.mobileOrTablet && this.state.windowSize < 768
          ? this.props.mbOpenState && (
              <Fragment>
                {/* <h2 className="yt-filter-title mt-0 mb-3">Filter</h2> */}
                <div className="filter-close" onClick={this.props?.cancel}>
                  <img src={require("../assets/images/close-icn.png")} alt="" />
                </div>
                <div className="yt-main-filter-box bg-white radius-10">
                  {this.state.categoryList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">
                          {content.category}
                        </h4>

                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.categoryList?.map((cat, index) => (
                            <Fragment key={index}>
                              <li
                                key={index}
                                className={
                                  "pb-4 d-flex align-items-center justify-content-between"
                                }
                              >
                                <div
                                  className={classNames("yt-cat-name", {
                                    "mr-3": this.state.windowSize < 1280,
                                  })}
                                  style={cat.checked ? { color: "black" } : {}}
                                >
                                  {cat.attributes.name} {cat.checked}
                                </div>
                                <div className="yt-filter-checkbox-wrap">
                                  <input
                                    type="checkbox"
                                    onChange={() => {
                                      this.toggleCheckBox(cat.id, "category");
                                    }}
                                    checked={cat.checked}
                                  />
                                  <label
                                    className="yt-filter-label"
                                    htmlFor={cat.name}
                                  />
                                </div>
                              </li>
                              {cat.checked &&
                                cat?.attributes.sub_categories?.map(
                                  (subcat, index) => (
                                    <li
                                      key={index}
                                      className={
                                        "pb-4 d-flex align-items-center justify-content-between"
                                      }
                                    >
                                      <div
                                        className={classNames("yt-cat-name", {
                                          "mr-3": this.state.windowSize < 1280,
                                        })}
                                      >
                                        <BsArrowReturnRight />
                                        {subcat.name} {subcat.checked}
                                      </div>
                                      <div className="yt-filter-checkbox-wrap">
                                        <input
                                          type="checkbox"
                                          onChange={(e) => {
                                            this.toggleCheckBox(
                                              String(subcat.id),
                                              "sub_category"
                                            );
                                          }}
                                          name={subcat.name + index}
                                          checked={subcat.checked}
                                        />
                                      </div>
                                    </li>
                                  )
                                )}
                            </Fragment>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.brandList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">{content.brand}</h4>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.brandList?.map((cat, index) => (
                            <li
                              key={index}
                              className={
                                "pb-4 d-flex align-items-center justify-content-between"
                              }
                            >
                              <div
                                className={classNames("yt-cat-name", {
                                  "mr-3": this.state.windowSize < 1280,
                                })}
                              >
                                {cat.attributes.name}
                              </div>
                              <div className="yt-filter-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    this.toggleCheckBox(cat.id, "brand")
                                  }
                                  checked={cat.checked}
                                />
                                <label
                                  className="yt-filter-label"
                                  htmlFor={cat.attributes.name}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.colorList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">{content.color}</h4>
                        <div className="yt-filter-search-wrap pb-2 mb-3">
                          <AiOutlineSearch className="yt-search-icn" />
                          <input
                            type="text"
                            placeholder="Search Color"
                            className="yt-color-search-bar d-block py-3"
                            value={this.state.colorSearch}
                            onChange={this.onchange}
                          />
                        </div>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.colorList.map(
                            (color, index) =>
                              (this.state.colorSearch === ""
                                ? true
                                : color?.variant_propert_name
                                    ?.toLowerCase()
                                    .search(
                                      this.state?.colorSearch?.toLowerCase()
                                    ) > -1) && (
                                // ((color.variant_propert_name).search(this.state.colorSearch) > -1)
                                <li
                                  key={index}
                                  className={
                                    "pb-4 d-flex align-items-center justify-content-between"
                                  }
                                >
                                  <span>
                                    <div
                                      style={{ gap: "8px" }}
                                      className={classNames(
                                        "pr-2 d-flex align-items-center",
                                        { "mr-3": this.state.windowSize < 1280 }
                                      )}
                                    >
                                      <FaCircle
                                        color={
                                          typeof color.variant_propert_name ===
                                          "string"
                                            ? color.variant_propert_name
                                                .split(" ")
                                                .join("")
                                            : color.variant_propert_name
                                        }
                                        style={
                                          color.variant_propert_name.toLowerCase() ===
                                          "white"
                                            ? {
                                                borderWidth: "1px",
                                                borderColor: "silver",
                                                borderStyle: "solid",
                                                borderRadius: "50%",
                                              }
                                            : {}
                                        }
                                      />
                                      <span className="ml-3">
                                        {color.variant_propert_name}
                                      </span>
                                    </div>
                                  </span>
                                  <div className="yt-filter-checkbox-wrap">
                                    <input
                                      name={color.variant_propert_name + index}
                                      type="checkbox"
                                      onChange={() =>
                                        this.toggleCheckBox(
                                          color.variant_property_id,
                                          "color"
                                        )
                                      }
                                      checked={color.checked}
                                    />
                                    <label
                                      className="yt-filter-label"
                                      htmlFor={
                                        color.variant_propert_name + index
                                      }
                                    />
                                  </div>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.sizesList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">{content.size}</h4>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.sizesList?.map((cat, index) => (
                            <li
                              key={index}
                              className={
                                "pb-4 d-flex align-items-center justify-content-between"
                              }
                            >
                              <div
                                className={classNames("yt-cat-name", {
                                  "mr-3": this.state.windowSize < 1280,
                                })}
                              >
                                {cat.variant_propert_name}
                              </div>
                              <div className="yt-filter-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    this.toggleCheckBox(
                                      cat.variant_property_id,
                                      "size"
                                    )
                                  }
                                  checked={cat.checked}
                                />
                                <label
                                  className="yt-filter-label"
                                  htmlFor={cat.variant_propert_name}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.tagsList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">{content.tag}</h4>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.tagsList?.map((cat, index) => (
                            <li
                              key={index}
                              className={
                                "pb-4 d-flex align-items-center justify-content-between"
                              }
                            >
                              <div
                                className={classNames("yt-cat-name", {
                                  "mr-3": this.state.windowSize < 1280,
                                })}
                              >
                                {cat.attributes.name}
                              </div>
                              <div className="yt-filter-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    this.toggleCheckBox(cat.id, "tag")
                                  }
                                  checked={cat.checked}
                                />
                                <label
                                  className="yt-filter-label"
                                  htmlFor={cat.attributes.name}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.materaiList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">
                          {content.material}
                        </h4>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.materaiList?.map((cat, index) => (
                            <li
                              key={index}
                              className={
                                "pb-4 d-flex align-items-center justify-content-between"
                              }
                            >
                              <div
                                className={classNames("yt-cat-name", {
                                  "mr-3": this.state.windowSize < 1280,
                                })}
                              >
                                {cat.variant_propert_name}
                              </div>
                              <div className="yt-filter-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    this.toggleCheckBox(
                                      cat.variant_property_id,
                                      "material"
                                    )
                                  }
                                  checked={cat.checked}
                                />
                                <label
                                  className="yt-filter-label"
                                  htmlFor={cat.variant_propert_name}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.kgList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">{content.kg}</h4>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.kgList?.map((cat, index) => (
                            <li
                              key={index}
                              className={
                                "pb-4 d-flex align-items-center justify-content-between"
                              }
                            >
                              <div
                                className={classNames("yt-cat-name", {
                                  "mr-3": this.state.windowSize < 1280,
                                })}
                              >
                                {cat.variant_propert_name}
                              </div>
                              <div className="yt-filter-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    this.toggleCheckBox(
                                      cat.variant_property_id,
                                      "kg"
                                    )
                                  }
                                  checked={cat.checked}
                                />
                                <label
                                  className="yt-filter-label"
                                  htmlFor={cat.variant_propert_name}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  <Row>
                    <Col md={4} lg={12}>
                      <div className="yt-filter-inner-wrap p-4 yt-price-filter-wrap">
                        <h4 className="yt-box-title mt-0">{content.price}</h4>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="yt-min-price">
                            {/* @ts-ignore */}
                            <IoIosArrowRoundDown />{" "}
                            {
                              JSON.parse(localStorage.getItem("countryCode"))
                                ?.countryCode
                            }{" "}
                            {this.state?.value?.min}
                            {/* {configJSON.currency} 0 */}
                          </span>
                          <span className="yt-max-price">
                            {/* @ts-ignore */}
                            <IoIosArrowRoundUp />{" "}
                            {
                              JSON.parse(localStorage.getItem("countryCode"))
                                ?.countryCode
                            }{" "}
                            {this.state?.value?.max}
                            {/* {configJSON.currency} 10000 */}
                          </span>
                        </div>
                        <InputRange
                          maxValue={this.state?.maxPrice}
                          minValue={this.state?.minPrice}
                          step={20}
                          value={this.state.value}
                          onChange={(value) => {
                            this.setState({ value: value });
                          }}
                          onChangeComplete={(value) =>
                            this.toggleCheckBox(value, "price")
                          }
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "8px",
                            justifyContent: "space-between",
                          }}
                        >
                          <input
                            type="number"
                            className="filterpricerange"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            min="0"
                            placeholder="Min"
                            value={this.state?.givenMinValue}
                            title={"Enter Minimum Value"}
                            style={{
                              marginBottom: "10px",
                              marginTop: "10px",
                              width: "35%",
                              padding: "8px 8px",
                            }}
                            onChange={(e) => {
                              this.setState({
                                givenMinValue: e.target.value,
                                isGivenRangeSlected: true,
                              });
                            }}
                          />
                          <input
                            type="number"
                            className="filterpricerange"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            min="0"
                            placeholder="Max"
                            value={this.state?.givenMaxValue}
                            title={"Enter Maximum Value"}
                            style={{
                              marginBottom: "10px",
                              marginTop: "10px",
                              marginLeft: "1.6%",
                              width: "35%",
                              padding: "8px 8px",
                            }}
                            onChange={(e) => {
                              const maxV = parseInt(e.target.value);
                              this.setState({
                                givenMaxValue: maxV,
                                isGivenRangeSlected: true,
                              });
                            }}
                          />
                          {/* <div style={{ display: 'flex', flexDirection: 'row' }}> */}
                          <Button
                            className="button-apply"
                            disabled={
                              !this.state?.isGivenRangeSlected ? true : false
                            }
                            title={"Apply"}
                            onClick={() => {
                              let validData: boolean = false;
                              if (
                                this.state?.givenMaxValue <
                                this.state.givenMinValue
                              ) {
                                validData = true;
                                //@ts-ignore
                                window.notify([
                                  {
                                    type: "danger",
                                    message:
                                      "Maximum value should be greater than Minimum value",
                                  },
                                ]);
                              }
                              if (
                                this.state?.givenMaxValue ==
                                this.state.givenMinValue
                              ) {
                                validData = true;
                                //@ts-ignore
                                window.notify([
                                  {
                                    type: "danger",
                                    message:
                                      "Minimum and Maximum should not be same!",
                                  },
                                ]);
                              }
                              const dat = {
                                min:
                                  this.state?.givenMinValue &&
                                  this.state?.givenMinValue,
                                max:
                                  this.state?.givenMaxValue &&
                                  this.state?.givenMaxValue > 0
                                    ? this.state?.givenMaxValue
                                    : this.state.maxPrice,
                              };
                              this.setState({
                                value: dat,
                              });
                              if (!validData) {
                                setTimeout(() => {
                                  this.toggleCheckBox(dat, "price");
                                }, 300);
                              }
                            }}
                          >
                            {" "}
                            Apply{" "}
                          </Button>
                          {/* <Button style={{ background: 'none', border: 'none', color: 'black' }} title={"Clear"}
                        color='link' onClick={() => {
                          const dat = {
                            min: "",
                            max: ""
                          }
                          this.setState({
                            givenMaxValue: '',
                            givenMinValue: '',
                            value: dat
                          });
                          setTimeout(() => {
                            this.toggleCheckBox(dat, "price")
                          }, 300);
                        }}> <FaTimesCircle /> </Button> */}
                          {/* </div> */}
                        </div>
                      </div>
                    </Col>
                    <Col md={8} lg={12} className="">
                      <div className="yt-filter-inner-wrap p-4 yt-discount-wrapper">
                        <ul className="p-0 mb-0 mt-4 yt-ul-list-none">
                          <li
                            className={classNames(
                              "pb-4 d-flex align-items-center",
                              {
                                "justify-content-between":
                                  this.state.windowSize > 1280,
                              }
                            )}
                          >
                            <div
                              className={classNames(
                                "yt-size-name yt-color-black",
                                { "mr-3": this.state.windowSize < 1280 }
                              )}
                            >
                              Discounted Items
                            </div>
                            <div className="yt-filter-checkbox-wrap">
                              <input
                                name="discheck"
                                type="checkbox"
                                onChange={(e) => {
                                  this.toggleDiscounted(e);
                                }}
                                checked={this.state?.isDiscountChecked}
                              />
                              <label
                                className="yt-filter-label"
                                htmlFor={"discheck"}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Fragment>
            )
          : (this.state.windowSize >= 1280 || this.props.mbOpenState) && (
              <Fragment>
                {/* <h2 className="yt-filter-title mt-0 mb-3">Filter</h2> */}
                <div className="filter-close" onClick={this.props?.cancel}>
                  <img src={require("../assets/images/close-icn.png")} alt="" />
                </div>
                <div className="yt-main-filter-box bg-white radius-10">
                  {this.state.categoryList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">
                          {content.category}
                        </h4>

                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.categoryList?.map((cat, index) => (
                            <Fragment key={index}>
                              <li
                                key={index}
                                className={
                                  "pb-4 d-flex align-items-center justify-content-between"
                                }
                              >
                                <div
                                  className={classNames("yt-cat-name", {
                                    "mr-3": this.state.windowSize < 1280,
                                  })}
                                  style={cat.checked ? { color: "black" } : {}}
                                >
                                  {cat.attributes.name} {cat.checked}
                                </div>
                                <div className="yt-filter-checkbox-wrap">
                                  <input
                                    type="checkbox"
                                    onChange={() => {
                                      this.toggleCheckBox(cat.id, "category");
                                    }}
                                    checked={cat.checked}
                                  />
                                  <label
                                    className="yt-filter-label"
                                    htmlFor={cat.name}
                                  />
                                </div>
                              </li>
                              {cat.checked &&
                                cat?.attributes.sub_categories?.map(
                                  (subcat, index) => (
                                    <li
                                      key={index}
                                      className={
                                        "pb-4 d-flex align-items-center justify-content-between"
                                      }
                                    >
                                      <div
                                        className={classNames("yt-cat-name", {
                                          "mr-3": this.state.windowSize < 1280,
                                        })}
                                      >
                                        <BsArrowReturnRight />
                                        {subcat.name} {subcat.checked}
                                      </div>
                                      <div className="yt-filter-checkbox-wrap">
                                        <input
                                          type="checkbox"
                                          onChange={(e) => {
                                            this.toggleCheckBox(
                                              String(subcat.id),
                                              "sub_category"
                                            );
                                          }}
                                          name={subcat.name + index}
                                          checked={subcat.checked}
                                        />
                                      </div>
                                    </li>
                                  )
                                )}
                            </Fragment>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.brandList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">{content.brand}</h4>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.brandList?.map((cat, index) => (
                            <li
                              key={index}
                              className={
                                "pb-4 d-flex align-items-center justify-content-between"
                              }
                            >
                              <div
                                className={classNames("yt-cat-name", {
                                  "mr-3": this.state.windowSize < 1280,
                                })}
                              >
                                {cat.attributes.name}
                              </div>
                              <div className="yt-filter-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    this.toggleCheckBox(cat.id, "brand")
                                  }
                                  checked={cat.checked}
                                />
                                <label
                                  className="yt-filter-label"
                                  htmlFor={cat.attributes.name}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.colorList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">{content.color}</h4>
                        <div className="yt-filter-search-wrap pb-2 mb-3">
                          <AiOutlineSearch className="yt-search-icn" />
                          <input
                            type="text"
                            placeholder="Search Color"
                            className="yt-color-search-bar d-block py-3"
                            value={this.state.colorSearch}
                            onChange={this.onchange}
                          />
                        </div>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.colorList.map(
                            (color, index) =>
                              (this.state.colorSearch === ""
                                ? true
                                : color?.variant_propert_name
                                    ?.toLowerCase()
                                    .search(
                                      this.state?.colorSearch?.toLowerCase()
                                    ) > -1) && (
                                // ((color.variant_propert_name).search(this.state.colorSearch) > -1)
                                <li
                                  key={index}
                                  className={
                                    "pb-4 d-flex align-items-center justify-content-between"
                                  }
                                >
                                  <span>
                                    <div
                                      style={{ gap: "8px" }}
                                      className={classNames(
                                        "pr-2 d-flex align-items-center",
                                        { "mr-3": this.state.windowSize < 1280 }
                                      )}
                                    >
                                      <FaCircle
                                        color={
                                          typeof color.variant_propert_name ===
                                          "string"
                                            ? color.variant_propert_name
                                                .split(" ")
                                                .join("")
                                            : color.variant_propert_name
                                        }
                                        style={
                                          color.variant_propert_name.toLowerCase() ===
                                          "white"
                                            ? {
                                                borderWidth: "1px",
                                                borderColor: "silver",
                                                borderStyle: "solid",
                                                borderRadius: "50%",
                                              }
                                            : {}
                                        }
                                      />
                                      <span className="ml-3">
                                        {color.variant_propert_name}
                                      </span>
                                    </div>
                                  </span>
                                  <div className="yt-filter-checkbox-wrap">
                                    <input
                                      name={color.variant_propert_name + index}
                                      type="checkbox"
                                      onChange={() =>
                                        this.toggleCheckBox(
                                          color.variant_property_id,
                                          "color"
                                        )
                                      }
                                      checked={color.checked}
                                    />
                                    <label
                                      className="yt-filter-label"
                                      htmlFor={
                                        color.variant_propert_name + index
                                      }
                                    />
                                  </div>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.sizesList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">{content.size}</h4>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.sizesList?.map((cat, index) => (
                            <li
                              key={index}
                              className={
                                "pb-4 d-flex align-items-center justify-content-between"
                              }
                            >
                              <div
                                className={classNames("yt-cat-name", {
                                  "mr-3": this.state.windowSize < 1280,
                                })}
                              >
                                {cat.variant_propert_name}
                              </div>
                              <div className="yt-filter-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    this.toggleCheckBox(
                                      cat.variant_property_id,
                                      "size"
                                    )
                                  }
                                  checked={cat.checked}
                                />
                                <label
                                  className="yt-filter-label"
                                  htmlFor={cat.variant_propert_name}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.tagsList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">{content.tag}</h4>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.tagsList?.map((cat, index) => (
                            <li
                              key={index}
                              className={
                                "pb-4 d-flex align-items-center justify-content-between"
                              }
                            >
                              <div
                                className={classNames("yt-cat-name", {
                                  "mr-3": this.state.windowSize < 1280,
                                })}
                              >
                                {cat.attributes.name}
                              </div>
                              <div className="yt-filter-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    this.toggleCheckBox(cat.id, "tag")
                                  }
                                  checked={cat.checked}
                                />
                                <label
                                  className="yt-filter-label"
                                  htmlFor={cat.attributes.name}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.materaiList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">
                          {content.material}
                        </h4>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.materaiList?.map((cat, index) => (
                            <li
                              key={index}
                              className={
                                "pb-4 d-flex align-items-center justify-content-between"
                              }
                            >
                              <div
                                className={classNames("yt-cat-name", {
                                  "mr-3": this.state.windowSize < 1280,
                                })}
                              >
                                {cat.variant_propert_name}
                              </div>
                              <div className="yt-filter-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    this.toggleCheckBox(
                                      cat.variant_property_id,
                                      "material"
                                    )
                                  }
                                  checked={cat.checked}
                                />
                                <label
                                  className="yt-filter-label"
                                  htmlFor={cat.variant_propert_name}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  {this.state.kgList?.length > 0 && (
                    <Fragment>
                      <div className="yt-filter-inner-wrap p-4">
                        <h4 className="yt-box-title mt-0">{content.kg}</h4>
                        <ul className="p-0 m-0 yt-ul-list-none">
                          {this.state.kgList?.map((cat, index) => (
                            <li
                              key={index}
                              className={
                                "pb-4 d-flex align-items-center justify-content-between"
                              }
                            >
                              <div
                                className={classNames("yt-cat-name", {
                                  "mr-3": this.state.windowSize < 1280,
                                })}
                              >
                                {cat.variant_propert_name}
                              </div>
                              <div className="yt-filter-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    this.toggleCheckBox(
                                      cat.variant_property_id,
                                      "kg"
                                    )
                                  }
                                  checked={cat.checked}
                                />
                                <label
                                  className="yt-filter-label"
                                  htmlFor={cat.variant_propert_name}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="yt-filter-divider" />
                    </Fragment>
                  )}

                  <Row>
                    <Col xs={12}>
                      <div className="yt-filter-inner-wrap p-4 yt-price-filter-wrap">
                        <h4 className="yt-box-title mt-0">{content.price}</h4>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="yt-min-price">
                            {/* @ts-ignore */}
                            <IoIosArrowRoundDown />{" "}
                            {
                              JSON.parse(localStorage.getItem("countryCode"))
                                ?.countryCode
                            }{" "}
                            {this.state?.value?.min}
                            {/* {configJSON.currency} 0 */}
                          </span>
                          <span className="yt-max-price">
                            {/* @ts-ignore */}
                            <IoIosArrowRoundUp />{" "}
                            {
                              JSON.parse(localStorage.getItem("countryCode"))
                                ?.countryCode
                            }{" "}
                            {this.state?.value?.max}
                            {/* {configJSON.currency} 10000 */}
                          </span>
                        </div>
                        <InputRange
                          maxValue={this.state?.maxPrice}
                          minValue={this.state?.minPrice}
                          step={20}
                          value={this.state.value}
                          onChange={(value) => {
                            this.setState({ value: value });
                          }}
                          onChangeComplete={(value) =>
                            this.toggleCheckBox(value, "price")
                          }
                        />
                        <div
                          className="price-range-cls"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "8px",
                            justifyContent: "space-between",
                          }}
                        >
                          <input
                            type="number"
                            className="filterpricerange"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            min="0"
                            placeholder="Min"
                            value={this.state?.givenMinValue}
                            title={"Enter Minimum Value"}
                            style={{
                              marginBottom: "10px",
                              marginTop: "10px",
                              width: "35%",
                              padding: "8px 8px",
                            }}
                            onChange={(e) => {
                              this.setState({
                                givenMinValue: e.target.value,
                                isGivenRangeSlected: true,
                              });
                            }}
                          />
                          <input
                            type="number"
                            className="filterpricerange"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            min="0"
                            placeholder="Max"
                            value={this.state?.givenMaxValue}
                            title={"Enter Maximum Value"}
                            style={{
                              marginBottom: "10px",
                              marginTop: "10px",
                              marginLeft: "1.6%",
                              width: "35%",
                              padding: "8px 8px",
                            }}
                            onChange={(e) => {
                              const maxV = parseInt(e.target.value);
                              this.setState({
                                givenMaxValue: maxV,
                                isGivenRangeSlected: true,
                              });
                            }}
                          />
                          {/* <div style={{ display: 'flex', flexDirection: 'row' }}> */}
                          <Button
                            className="button-apply"
                            disabled={
                              !this.state?.isGivenRangeSlected ? true : false
                            }
                            title={"Apply"}
                            onClick={() => {
                              let validData: boolean = false;
                              if (
                                this.state?.givenMaxValue <
                                this.state.givenMinValue
                              ) {
                                validData = true;
                                //@ts-ignore
                                window.notify([
                                  {
                                    type: "danger",
                                    message:
                                      "Maximum value should be greater than Minimum value",
                                  },
                                ]);
                              }
                              if (
                                this.state?.givenMaxValue ==
                                this.state.givenMinValue
                              ) {
                                validData = true;
                                //@ts-ignore
                                window.notify([
                                  {
                                    type: "danger",
                                    message:
                                      "Minimum and Maximum should not be same!",
                                  },
                                ]);
                              }
                              const dat = {
                                min:
                                  this.state?.givenMinValue &&
                                  this.state?.givenMinValue,
                                max:
                                  this.state?.givenMaxValue &&
                                  this.state?.givenMaxValue > 0
                                    ? this.state?.givenMaxValue
                                    : this.state.maxPrice,
                              };
                              this.setState({
                                value: dat,
                              });
                              if (!validData) {
                                setTimeout(() => {
                                  this.toggleCheckBox(dat, "price");
                                }, 300);
                              }
                            }}
                          >
                            {" "}
                            Apply{" "}
                          </Button>
                          {/* <Button style={{ background: 'none', border: 'none', color: 'black' }} title={"Clear"}
                        color='link' onClick={() => {
                          const dat = {
                            min: "",
                            max: ""
                          }
                          this.setState({
                            givenMaxValue: '',
                            givenMinValue: '',
                            value: dat
                          });
                          setTimeout(() => {
                            this.toggleCheckBox(dat, "price")
                          }, 300);
                        }}> <FaTimesCircle /> </Button> */}
                          {/* </div> */}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} className="">
                      <div className="yt-filter-inner-wrap p-4 yt-discount-wrapper">
                        <h4 className="yt-box-title mt-0">{"Discounts"}</h4>
                        <ul className="p-0 mb-0 mt-4 yt-ul-list-none">
                          <li
                            className={classNames(
                              "pb-4 d-flex align-items-center",
                              {
                                "justify-content-between":
                                  this.state.windowSize > 1280,
                              }
                            )}
                          >
                            <div
                              className={classNames(
                                "yt-size-name yt-color-black",
                                { "mr-3": this.state.windowSize < 1280 }
                              )}
                            >
                              Discounted Items
                            </div>
                            <div className="yt-filter-checkbox-wrap">
                              <input
                                name="discheck"
                                type="checkbox"
                                onChange={(e) => {
                                  this.toggleDiscounted(e);
                                }}
                                checked={this.state?.isDiscountChecked}
                              />
                              <label
                                className="yt-filter-label"
                                htmlFor={"discheck"}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Fragment>
            )}
      </div>
    );
    // Customizable Area End
  }
}

export default withRouter(Filteroptions);
export { Filteroptions };
// Customizable Area Start
// Customizable Area End
