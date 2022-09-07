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
  Container,
} from "reactstrap";
import "./assets/css/sort-dropdown.scoped.css";
import ProductBox from "../ProductBox";
import content from "../../../../studio-store-ecommerce-components/src/content";

interface RightContentProps {
  banners: any;
  toggleOurProducts: Function;
  products?: any[];
  loading: boolean;
  onProductAddToWishlist: (id: number) => void;
  onProductAddToCart: (product: any) => void;
  onProductDeleteFromWishlist: (id: number) => void;
  onSortingChange: (sortBy: string, sortOrder: string) => void;
  productListTitle: string;
  productsAddingToCart: number[];
  onProductIncreaseCartQuantity: (product: any) => void;
  onProductDecreaseCartQuantity: (product: any) => void;
  productWishlisting: number | null;
  isProductAddtoCart: boolean;
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
    toggleOurProducts,
    products,
    loading,
    onProductAddToWishlist,
    onProductDeleteFromWishlist,
    onSortingChange,
    productListTitle,
    onProductAddToCart,
    productsAddingToCart,
    onProductIncreaseCartQuantity,
    onProductDecreaseCartQuantity,
    productWishlisting,
    isProductAddtoCart,
  } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(sortMenu[3]);

  return (
    <div className="right-content">
      <div className="home-main-banner">
        <BannerCarousel
          data={(banners.length > 0 && banners[0].attributes.images.data) || []}
        />
      </div>
      <div className="product_catergory">
        <div className="yt-sp-mb-filter-wrapper align-self-center">
          <button
            className="d-flex align-items-center product_filter"
            onClick={() => toggleOurProducts()}
          >
            <div className="yt-sp-recmnd-icn">
              <BsFunnel />
            </div>
            <div className="yt-recmnd-mb-txt filter_type"> Our products</div>
          </button>
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
        <Container fluid className="p-0">
          <Row>
            {products?.length === 0 ? (
              <Col>
                <div className="trans-fl-pg-inner-wrap p-4 bg-white radius-10 trans-fl-pg-mb-80 mt-5">
                  <div className="cart-pg-empty-main-wrap text-center py-5">
                    <img
                      src={require("../../../../filteritems/assets/images/noProduct.png")}
                      className="img-fluid yt-transaction-cl-icn"
                      width="170"
                      height="212"
                    />
                    <div className="trans-fl-wrap ">
                      <p className="trans-fl-ttl my-3">No results found</p>
                      <p className="trans-fl-text mb-0">
                        Update or remove some of the filters you used
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            ) : (
              products?.map((product) => (
                <Col lg="3" md="4" xs="6" key={product.id} className="d-flex">
                  <ProductBox
                    onProductAddToWishlist={onProductAddToWishlist}
                    onProductDeleteFromWishlist={onProductDeleteFromWishlist}
                    product={product}
                    onProductAddToCart={onProductAddToCart}
                    onProductDecreaseCartQuantity={
                      onProductDecreaseCartQuantity
                    }
                    onProductIncreaseCartQuantity={
                      onProductIncreaseCartQuantity
                    }
                    addToCartLoading={productsAddingToCart.includes(product.id)}
                    wishlistLoading={productWishlisting === product.id}
                    isProductAddtoCart={isProductAddtoCart}
                  />
                </Col>
              ))
            )}
          </Row>
          <Row>
            {loading && (
              <Col className="flex-center">
                <CircularProgress />
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default RightContent;
