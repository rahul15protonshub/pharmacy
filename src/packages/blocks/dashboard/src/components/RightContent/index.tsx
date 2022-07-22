import React, { useState } from "react";
import BannerCarousel from "./MainBanner";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BsFunnel } from "react-icons/bs";
import {
  Alert,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
//@ts-ignore
import content from "../../../../studio-store-ecommerce-components/src/content.js";
import "./assets/css/sort-dropdown.scoped.css";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductBox from "../ProductBox";

interface RightContentProps {
  banners: any;
  toggeProduct: Function;
  products?: any[];
  onScrollEnd: () => void;
  loading: boolean;
  onProductAddToWishlist: (id: number) => void;
  onProductAddToCart: (product: any) => void;
  onProductDeleteFromWishlist: (id: number) => void;
  onSortingChange: (sortBy: string, sortOrder: string) => void;
  productListTitle: string;
  productsAddingToCart: number[];
  onProductIncreaseCartQuantity: (product: any) => void;
  onProductDecreaseCartQuantity: (product: any) => void;
  fetchMoreData: any;
}

const sortMenu = [
  {
    label: content.LowtoHigh,
    order_by: "price_including_tax",
    direction: "asc",
  },
  {
    label: content.HightoLow,
    order_by: "price_including_tax",
    direction: "desc",
  },
  { label: content.ByPopularity, order_by: "sold", direction: "desc" },
  { label: content.ByNewest, order_by: "created_at", direction: "desc" },
  { label: content.Recommended, order_by: "recommended", direction: "desc" },
];

const RightContent: React.FunctionComponent<RightContentProps> = (
  props: RightContentProps
) => {
  const {
    banners,
    toggeProduct,
    products,
    onScrollEnd,
    loading,
    onProductAddToWishlist,
    onProductDeleteFromWishlist,
    onSortingChange,
    productListTitle,
    onProductAddToCart,
    productsAddingToCart,
    onProductIncreaseCartQuantity,
    onProductDecreaseCartQuantity,
  } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(sortMenu[3]);

  const handleScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      onScrollEnd();
    }
  };

  return (
    <div className="right-content">
      <div className="home-main-banner">
        <BannerCarousel
          data={(banners.length > 0 && banners[0].attributes.images.data) || []}
        />
      </div>
      <div className="product_catergory">
        <div className="yt-sp-mb-filter-wrapper align-self-center">
          <div
            className="d-flex align-items-center product_filter"
            onClick={() => toggeProduct()}
          >
            <div className="yt-sp-recmnd-icn">
              <BsFunnel />
            </div>
            <div className="yt-recmnd-mb-txt filter_type "> Our products</div>
          </div>
          <div className="product_category_type_web">{productListTitle}</div>
        </div>

        <div
          style={{ margin: "6px", display: "flex", alignItems: "center" }}
          className="yt-recommend-inner d-flex"
        >
          <div className="product_sort">Sort by: </div>
          <Dropdown
            isOpen={dropdownOpen}
            toggle={() => setDropdownOpen(!dropdownOpen)}
            size="sm"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <DropdownToggle
              caret
              className="yt-product-page-recommend-btn"
              style={{ display: "flex", minWidth: "12 rem" }}
            >
              <span className="sort_type">{selectedFilter.label}</span>
            </DropdownToggle>
            <DropdownMenu className="yt-recommend-wrapper">
              {sortMenu.map((e) => (
                <DropdownItem
                  key={e.label}
                  className={
                    e.label === selectedFilter.label
                      ? "current-active-filter active"
                      : ""
                  }
                  onClick={() => {
                    setSelectedFilter(e);
                    onSortingChange(e.order_by, e.direction);
                  }}
                >
                  {e.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="product_category_type">{productListTitle}</div>
      <div className="home-main-product-list">
        {/*loading && <div style={{
                        position: 'absolute', zIndex: 999, width: '100%', height: '100%', display: "flex", alignItems: 'center', justifyContent: 'center'
                        }}>
                        <CircularProgress />
                        </div>*/}
        <div className="card_group" onScroll={handleScroll}>
          <Row style={{ flex: 1 }}>
            <InfiniteScroll
              dataLength={products ? products.length : 0}
              next={props.fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              className="row"
            >
              {products ? (
                products?.length === 0 ? (
                  <Col>
                    <Alert color="warning">No products found.</Alert>
                  </Col>
                ) : (
                  products?.map((product) => (
                    <Col lg="3" md="4" xs="6" key={product.id}>
                      <ProductBox
                        onProductAddToWishlist={onProductAddToWishlist}
                        onProductDeleteFromWishlist={
                          onProductDeleteFromWishlist
                        }
                        product={product}
                        onProductAddToCart={onProductAddToCart}
                        onProductDecreaseCartQuantity={
                          onProductDecreaseCartQuantity
                        }
                        onProductIncreaseCartQuantity={
                          onProductIncreaseCartQuantity
                        }
                        addToCartLoading={productsAddingToCart.includes(
                          product.id
                        )}
                      />
                    </Col>
                  ))
                )
              ) : (
                <Col>
                  <CircularProgress />
                </Col>
              )}
            </InfiniteScroll>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default RightContent;
