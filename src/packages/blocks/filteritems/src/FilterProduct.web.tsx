// @ts-nocheck
import React, { Fragment } from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  // Customizable Area Start
  // Customizable Area End
} from "reactstrap";
import { BsFilterLeft, BsFunnel } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { withRouter } from "react-router-dom";
//@ts-ignore
import content from "../../studio-store-ecommerce-components/src/content";
import Loader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader.web";
import FilterProductController, { Props } from "./FilterProductController.web";
export const configJSON = require("./config");
import ProductListCard from "../../studio-store-ecommerce-components/src/ProductCard/productListCard";
import PageLoadingBlock from "./noProductFound.web";
import "../assets/css/index.scoped.css";
import ProductBox from "../../dashboard/src/components/ProductBox";
// Customizable Area Start
// Customizable Area End

class FilterProduct extends FilterProductController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  toggle = (event) => {
    localStorage.removeItem("newest");  
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.currentTarget.textContent
        ? event.currentTarget.textContent
        : this.state.value,
      // Customizable Area Start
      // Customizable Area End
    });
  };

  pager(totalPages, currentPage) {
    let pagination = [];

    for (let i = 1; i <= totalPages; ) {
      if (
        i <= 3 || //the first three pages
        i >= totalPages - 2 || //the last three pages
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        //the currentPage, the page before and after
        pagination.push(
          <div
            onClick={() => {
              this.getCurrentPage(i - 1);
            }}
            className={currentPage == i ? "active" : ""}
          >
            {i}
          </div>
        );
        i++;
      } else {
        //any other page should be represented by ...
        pagination.push(<div>...</div>);
        //jump to the next page to be linked in the navigation
        i = i < currentPage ? currentPage - 1 : totalPages - 2;
      }
    }
    return pagination;
  }

  render() {
    // Customizable Area Start
    return (
      <div>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <div className="filtertop">
          <Row>
            <Col>
              <div className="filter_abayas">
                <div className="align-items-center d-flex">
                  {/* <Col>
                    <div className="abayas yt-shop-category-name">
                      {content.products}
                    </div>
                  </Col> */}
                  <div className="align-item-center responsive-css d-flex">
                    <div className="yt-sp-mb-filter-wrapper align-self-center">
                      <div
                        className="d-flex align-items-center"
                        style={{ border: "1px solid grey", padding: "4px 8px" }}
                        onClick={this.props?.openFilter}
                      >
                        <div className="yt-sp-recmnd-icn">
                          <BsFunnel />
                        </div>
                        <div className="yt-recmnd-mb-txt">{content.filter}</div>
                      </div>
                    </div>
                    <div
                      style={{ flex: 1 }}
                      className="desktopSelectedfilter selectedprops yt-selected-filter-wrap"
                    >
                      <div className="yt-filter-selected d-flex align-items-center flex-wrap">
                        {this.state.searchQuery &&
                          this.state.searchQuery != "" && (
                            <span className="yt-flt-tag">
                              {
                                this.state.searchQuery
                                  .split("=")
                                  .join(",")
                                  .split("&")[1]
                                  .split(",")[1]
                              }
                              <RiCloseLine
                                className="yt-close-icn"
                                onClick={() => this.removeSearchQuery()}
                              />
                            </span>
                          )}
                        {this.state.filterData.category?.map(
                          (data, index) =>
                            data.checked && (
                              <span className="yt-flt-tag" key={index}>
                                {data.attributes.name}
                                <RiCloseLine
                                  className="yt-close-icn"
                                  onClick={() => {
                                    localStorage.removeItem("subCategory");
                                    this.removeFilter(
                                      data.attributes,
                                      "category",
                                      data.attributes.id
                                    );
                                  }}
                                />
                              </span>
                            )
                        )}

                        {this.state.filterData.brand?.map(
                          (data, index) =>
                            data.checked && (
                              <span className="yt-flt-tag" key={index}>
                                {data.attributes.name}
                                <RiCloseLine
                                  className="yt-close-icn"
                                  onClick={() =>
                                    this.removeFilter(
                                      data.attributes,
                                      "brand",
                                      data.attributes.id
                                    )
                                  }
                                />
                              </span>
                            )
                        )}
                        {(this.state.filterData.category?.filter(
                          (i) => i.checked
                        ).length > 0 ||
                          this.state.filterData.brand?.filter((i) => i.checked)
                            .length > 0) && (
                          <span
                            className="yt-clear-all"
                            onClick={() => {
                              window.location = "/Filteroptions";
                              localStorage.removeItem("searchQuery");
                              localStorage.removeItem("category");
                              localStorage.removeItem("subCategory");
                              this.setState({
                                searchQuery: "",
                                filterProducList: [],
                              });
                            }}
                            style={{ cursor: "default" }}
                          >
                            {content.clearAll}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      style={{ alignItems: "center" }}
                      className="recomdrop yt-recommend-inner d-flex"
                    >
                      <span className="all-prod-sort-tag-name">
                        {content.sort}:
                      </span>
                      <Dropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                        size="sm"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded={this.state.dropdownOpen}
                      >
                        <DropdownToggle
                          caret
                          className="yt-product-page-recommend-btn"
                          style={{ display: "flex", minWidth: "12 rem " }}
                        >
                          {/* <div className="yt-sp-mb-recomment-wrap">
                                <div className="d-flex align-items-center">
                                  <div className="yt-sp-recmnd-icn">
                                    <BsFilterLeft />
                                  </div>
                                  <div className="yt-recmnd-mb-txt">
                                    {content.responsiveSort}
                                  </div>
                                </div>
                              </div> */}
                          <span className="selected-sort-name">
                            {this.state.value}
                          </span>
                        </DropdownToggle>
                        <DropdownMenu className="yt-recommend-wrapper">
                          {this.state.sortMenu.map((e, index) => {
                            return (
                              <DropdownItem
                                key={index}
                                className={
                                  this.state.order_by + this.state.sort_by ==
                                  e.order_by + e.direction
                                    ? "current-active-filter active"
                                    : null
                                }
                                key={e.label}
                                onClick={() => {
                                  this.addSortBy(index);
                                }}
                              >
                                {e.label}
                              </DropdownItem>
                            );
                          })}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mobileSelectedfilter selectedprops yt-selected-filter-wrap">
                <Row>
                  <Col md={9}>
                    <div
                      style={{ marginLeft: "24px" }}
                      className="yt-filter-selected d-flex align-items-center flex-wrap"
                    >
                      {this.state.searchQuery && this.state.searchQuery != "" && (
                        <span className="yt-flt-tag">
                          {
                            this.state.searchQuery
                              .split("=")
                              .join(",")
                              .split("&")[1]
                              .split(",")[1]
                          }
                          <RiCloseLine
                            className="yt-close-icn"
                            onClick={() => this.removeSearchQuery()}
                          />
                        </span>
                      )}
                      {this.state.filterData.category?.map(
                        (data, index) =>
                          data.checked && (
                            <span className="yt-flt-tag" key={index}>
                              {data.attributes.name}
                              <RiCloseLine
                                className="yt-close-icn"
                                onClick={() => {
                                  localStorage.removeItem("subCategory");
                                  this.removeFilter(
                                    data.attributes,
                                    "category",
                                    data.attributes.id
                                  );
                                }}
                              />
                            </span>
                          )
                      )}

                      {this.state.filterData.brand?.map(
                        (data, index) =>
                          data.checked && (
                            <span className="yt-flt-tag" key={index}>
                              {data.attributes.name}
                              <RiCloseLine
                                className="yt-close-icn"
                                onClick={() =>
                                  this.removeFilter(
                                    data.attributes,
                                    "brand",
                                    data.attributes.id
                                  )
                                }
                              />
                            </span>
                          )
                      )}
                      {(this.state.filterData.category?.filter((i) => i.checked)
                        .length > 0 ||
                        this.state.filterData.brand?.filter((i) => i.checked)
                          .length > 0) && (
                        <span
                          className="yt-clear-all"
                          onClick={() => {
                            window.location = "/Filteroptions";
                            localStorage.removeItem("searchQuery");
                            localStorage.removeItem("category");
                            localStorage.removeItem("subCategory");
                            this.setState({
                              searchQuery: "",
                              filterProducList: [],
                            });
                          }}
                          style={{ cursor: "default" }}
                        >
                          {content.clearAll}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        {this.state.filterProducList.length != 0 ? (
          <ProductListCard
            collection={this.state.filterProducList}
            addToCart={product => this.addToCart(product, product.attributes.default_variant?.id)}
            createWishlist={this.postWishlist}
            deleteWishlist={this.delWishlist}
            toSetDefaultVariant={this.toSetDefaultVariant}
            loading={this.state.loading}
            productsAddingToCart={this.state.productsAddingToCart}
            isProductAddtoCart={this.state.isProductAddtoCart}
            productWishlisting={this.state.productWishlisting}
            onProductDecreaseCartQuantity={product => this.increaseOrDecreaseCartQuantity(product, -1, product.attributes.default_variant?.id)}
            onProductIncreaseCartQuantity={product => this.increaseOrDecreaseCartQuantity(product, 1, product.attributes.default_variant?.id)}
          />
        ) : (
          !this.state.loading && <PageLoadingBlock />
        )}

        <div className="loadMoreBtn">
          {/* <div outline='true' className="yt-load-more" type="button" onClick={this.loadMore} >
            {this.state.loadMoreShow && this.state.filterProducList.length != 0 && content.loadMore}
          </div> */}
          {!this.state.loading && this.state.filterProducList.length != 0 && (
            <div className="productPagination">
              <div
                className={this.state.page == 1 && "disablePagination"}
                style={{ display: "flex" }}
                onClick={() => {
                  this.previousPage();
                }}
              >
                <div>&lsaquo;</div>
                <div>Previous</div>
              </div>
              {this.pager(this.state.totalPage, this.state.page)}
              <div
                className={
                  this.state.page == this.state.totalPage && "disablePagination"
                }
                onClick={() => {
                  this.nextPage();
                }}
                style={{ display: "flex" }}
              >
                <div>Next</div>
                <div>&rsaquo;</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
    // Customizable Area End
  }
}

export default withRouter(FilterProduct);
export { FilterProduct };
// Customizable Area Start
// Customizable Area End
