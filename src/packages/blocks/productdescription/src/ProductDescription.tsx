import React from "react";

import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ReadMore from "react-native-read-more-text";
import FocusAwareStatusBar from "../../studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";
import { ProductGrid } from "../../studio-store-ecommerce-components/src/homeComponents/ProductGrid/ProductGrid";
import TopHeader from "../../studio-store-ecommerce-components/src/TopHeader/TopHeader";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import DropDownPicker from "react-native-dropdown-picker";
import {
  CART_BLACK_ICON,
  SHARE_ICON,
  heartWishlist,
  redHeart,
  SELECTED_STAR,
  UNSELECTED_STAR,
  STOCK_TICK,
  BACK_ICON,
  SOLD_OUT_ICON,
  RADIO_SELECTED,
  RADIO_UNSELECTED,
  RX,
  shapeHeart,
  shapestar,
  shapestock,
  shapeHeartActive
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import { WebView } from "react-native-webview";
import ProductDescriptionController, {
  Props,
} from "./ProductDescriptionController";
import styles from "./ProductDescriptionStyle";
import ApplicationLoader from "../../studio-store-ecommerce-components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import Scheduling from "../../../blocks/scheduling/src/Scheduling";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
export const configJSON = require("./config");
// Customizable Area Start
import Prescriptionuploads from '../../../components/src/precriptionuploads'
import { Console } from "console";
import ProductBox from "../../../blocks/catalogue/src/components/ProductBox";
// Customizable Area End

export default class ProductDescription extends ProductDescriptionController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderToolItem = (item: any, attribute: any, isFromColor: boolean) => {
    // Customizable Area Start
    const { selectedAttributes } = this.state;
    const isSelected =
      selectedAttributes[attribute] &&
        selectedAttributes[attribute].variant_property_id ===
        item.variant_property_id
        ? true
        : false;
    if (
      attribute.toUpperCase() == "COLOR" ||
      attribute.toUpperCase() == "COLORS"
    ) {
      return (
        <TouchableOpacity
          onPress={() => this.onPressTool(item, attribute)}
          style={[
            styles.toolItemSizeCell,
            {
              backgroundColor: isSelected
                ? COLOR_CONST.newtheme
                : COLOR_CONST.white,
              borderWidth: scale(1),
              borderColor: isSelected
                ? COLOR_CONST.newtheme
                : COLOR_CONST.newtheme,
              opacity: 0.7,
            },
          ]}
        >
          <Text
            style={[
              styles.labelText,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <>
        {item?.name && (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              this.onPressTool(item, attribute);
            }}
            style={[
              styles.toolItemSizeCell,
              {
                backgroundColor: isSelected
                  ? COLOR_CONST.newtheme
                  : COLOR_CONST.white,
                borderWidth: scale(1),
                borderColor: isSelected
                  ? COLOR_CONST.newtheme
                  : COLOR_CONST.newtheme,
                opacity: 0.7,
              },
            ]}
          >
          
              <Text
                style={[
                  styles.labelText,
                ]}
              >
                {item.name}
              </Text>
           
          </TouchableOpacity>
        )}
      </>
    );
    // Customizable Area End
  };

  renderToolListSelector = (
    attributeData: any,
    attribute: any,
    isFromColor: boolean
  ) => {
    // Customizable Area Start
    return (
      <View style={styles.listSelector}>
        <FlatList
          horizontal
          keyExtractor={(index: any, item: any) => index.toString()}
          extraData={this.state}
          data={attributeData}
          renderItem={({ item, index }) =>
            this.renderToolItem(item, attribute, isFromColor)
          }
        />
      </View>
    );
    // Customizable Area End
  };

  renderSelectorTools = () => {
    // Customizable Area Start
    const product_attributes =
      this.state.productData?.attributes?.product_attributes;
    const isItemAvailable = this.checkSelectedInAvailable();
    if (product_attributes) {
      const attributes = Object.keys(product_attributes);
      attributes.sort();
      return (
        <View style={styles.selectorToolContainer}>
          {attributes?.map((attribute, i) => {
            const attributesPresent = product_attributes[attribute]?.length > 0;
            return (
              <View key={`selector_tool_${i}`}>
                {attributesPresent && (
                  <Text key={i} style={styles.colorText}>
                    {attribute}
                  </Text>
                )}
                {attributesPresent &&
                  this.renderToolListSelector(
                    product_attributes[attribute],
                    attribute,
                    attribute === "color" ? true : false
                  )}
              </View>
            );
          })}
          {Object.keys(this.state.selectedAttributes).length > 0 && (
            <View style={styles.selectorToolMessageContainer}>
              {!isItemAvailable && (
                <Text style={styles.selectorToolMessage}>
                  *This combination is not available
                </Text>
              )}
            </View>
          )}
        </View>
      );
    } else {
      return <View />;
    }
    // Customizable Area End
  };

  renderVarientImageItems = (item: any, index: number) => {
    return (
      // Customizable Area Start
      <>
        {item?.attributes && (
          <TouchableOpacity
            style={styles.variantCell}
            onPress={() => {
              this.setState({ selectedImage: item?.attributes?.url });
            }}
          >
            <Image
              source={{ uri: item?.attributes?.url || "" }}
              style={styles.variantImage}
            />
          </TouchableOpacity>
        )}
      </>
      // Customizable Area End
    );
  };

  renderReviewCell = (item: any, index: number) => {
    return (
      // Customizable Area Start
      <View style={styles.reviewCell}>
        <View style={styles.nameRow}>
          <Text style={styles.reviewName}>{item.user_name}</Text>
          <Text style={styles.dateText}>{item.review_date}</Text>
        </View>
        <View style={styles.starListContainer}>
          {this.state.ratingList?.map((starItem: any, index: number) => {
            return (
              <TouchableOpacity
                key={`rating-item-${index}`}
                testID={"buttonRatingItem"}
                onPress={() => { }}
              >
                <Image
                  source={index < item.rating ? SELECTED_STAR : UNSELECTED_STAR}
                  style={styles.listStar}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.reviewText}>{item.comment}</Text>
        <View style={styles.listHorizontalLine} />
      </View>
      // Customizable Area End
    );
  };

  renderReviewList = () => {
    // Customizable Area Start
    if (!this.state.productData?.attributes?.reviews) {
      return;
    }
    if (this.state.productData?.attributes?.reviews.length === 0) {
      return;
    }
    let sliceLength = 0;
    if (this.state.productData?.attributes?.reviews.length <= 3) {
      sliceLength = this.state.productData?.attributes.reviews.length;
    } else {
      sliceLength = 3;
    }
    return (
      <View style={styles.reviewListContainer}>
        <FlatList
          data={this.state.productData?.attributes.reviews.slice(
            0,
            sliceLength
          )}
          extraData={this.state}
          renderItem={({ item, index }: any) =>
            this.renderReviewCell(item.attributes, index)
          }
        />
        {this.state.productData?.attributes.reviews.length > 3 && (
          <Text
            onPress={() =>
              this.props.navigation.navigate("ReviewList", {
                productData: this.state.productData,
              })
            }
            style={styles.allTen}
          >
            All {this.state.productData.attributes.reviews.length} Reviews
          </Text>
        )}
      </View>
    );
    // Customizable Area End
  };

  renderProductReviewView = () => {
    // Customizable Area Start
    if (!this.state.productData?.attributes?.average_rating) {
      return;
    }
    let ratingNo = (
      Math.round(this.state.productData?.attributes?.average_rating * 100) / 100
    ).toFixed(1);
    return (
      <View style={styles.reviewContainer}>
        <View style={styles.productRow}>
          <Text style={styles.leftHeading}>PRODUCT RATING</Text>
          <Text style={styles.rightHeading}>Product Rating</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.leftView}>
            <Text style={styles.biggerRatingText}>
              {String(ratingNo) === "5.0" ? 5 : ratingNo} / 5
            </Text>
            <View style={styles.starContainer}>
              {this.state.ratingList?.map((item: any, index: number) => {
                return (
                  <TouchableOpacity onPress={() => { }}>
                    <Image
                      source={this.getStarImage(
                        index,
                        this.state.productData?.attributes?.average_rating
                      )}
                      style={styles.star}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            {this.state.productData?.attributes?.reviews && (
              <Text
                style={styles.basedText}
              >{`Based on ${this.state.productData?.attributes?.reviews.length} Ratings\n& Reviews`}</Text>
            )}
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.rightView}>
            <View style={styles.starRow}>
              <Text style={styles.no}>5</Text>
              <Image source={UNSELECTED_STAR} style={styles.innerStar} />
              <View style={styles.progressContainer}>
                <View style={styles.filled1} />
                <View style={styles.unfilled1} />
              </View>
            </View>
            <View style={styles.starRow}>
              <Text style={styles.no}>4</Text>
              <Image source={UNSELECTED_STAR} style={styles.innerStar} />
              <View style={styles.progressContainer}>
                <View style={styles.filled2} />
                <View style={styles.unfilled2} />
              </View>
            </View>
            <View style={styles.starRow}>
              <Text style={styles.no}>3</Text>
              <Image source={UNSELECTED_STAR} style={styles.innerStar} />
              <View style={styles.progressContainer}>
                <View style={styles.filled3} />
                <View style={styles.unfilled3} />
              </View>
            </View>
            <View style={styles.starRow}>
              <Text style={styles.no}>2</Text>
              <Image source={UNSELECTED_STAR} style={styles.innerStar} />
              <View style={styles.progressContainer}>
                <View style={styles.filled4} />
                <View style={styles.unfilled4} />
              </View>
            </View>
            <View style={styles.starRow}>
              <Text style={styles.no}>1</Text>
              <Image source={UNSELECTED_STAR} style={styles.innerStar} />
              <View style={styles.progressContainer}>
                <View style={styles.filled5} />
                <View style={styles.unfilled5} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {this.renderReviewList()}
      </View>
    );
    // Customizable Area End
  };

  renderViewAll = () => {
    // Customizable Area Start
    const { productData, selectedProduct, selectedImage } = this.state;
    const { attributes } = productData;
    const stock_qty = selectedProduct
      ? selectedProduct.attributes.stock_qty
      : attributes.stock_qty;
    const on_sale = selectedProduct
      ? selectedProduct.attributes.on_sale
      : attributes.on_sale;
    const prescription = attributes.prescription;
    const price = selectedProduct
      ? on_sale
        ? selectedProduct.attributes?.actual_price_including_tax
        : selectedProduct.attributes?.price_including_tax
      : on_sale
        ? attributes?.actual_price_including_tax
        : attributes?.price_including_tax;
    const sale_price = selectedProduct
      ? selectedProduct?.attributes?.price_including_tax
      : attributes.price_including_tax;
    let productImage = "";
    productData?.attributes?.images?.data?.map((variant: any) => {
      if (variant?.attributes?.is_default) {
        productImage = variant?.attributes?.url;
      }
    });
    if (productImage === "") {
      productImage = productData?.attributes?.images.data[0]?.attributes?.url;
    }
    console.log('productData',productData)
    return (
      <>
        <ScrollView
          style={{
            paddingBottom: verticalScale(5),
            marginTop: verticalScale(2),
            backgroundColor: COLOR_CONST.white,
          }}
        >
          {productData && (
            <View style={styles.productImageContainer}>
              <Image
                resizeMode={"contain"}
                source={
                  this.state.selectedImage
                    ? { uri: selectedImage }
                    : productData?.attributes?.images.data[0].attributes &&
                      productData?.attributes?.images.data.length > 0
                      ? { uri: productImage }
                      : {}
                }
                style={styles.imageStyle}
              />
            </View>
          )}

          {productData && (
            <View style={styles.productNameContainer}>
              {/*  */}
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.productName}>
                  {productData?.attributes?.name}
                </Text>
                <TouchableOpacity
                  style={styles.heartConatiner}
                  onPress={() => this.onHeartPress(productData, "description")}
                >
                  {productData?.attributes?.wishlisted ? (
                    <Image source={shapeHeartActive} style={styles.heart} />
                  ) : (
                    <Image source={shapeHeart} style={styles.heart} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.avgReview}>
                  {(productData?.attributes?.average_rating).toFixed(1)}
                </Text>
                <Image source={shapestar} style={styles.reviewStar} />
                {productData?.attributes?.reviews && (
                  <Text style={styles.reviewCount}>
                    | {productData?.attributes?.reviews.length}
                  </Text>
                )}
              </View>
              <Text style={[styles.specifictaionTitle, { marginLeft: scale(18), }]}>Price</Text>
              <View style={styles.priceRow}>
                <View style={styles.insidePriceBox1}>
                  {productData && on_sale ? (
                    <View style={styles.discountRow}>
                      <Text style={styles.price}>
                        {themeJson.attributes.currency_type} {sale_price}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.price}>
                      {themeJson.attributes.currency_type} {price}
                    </Text>
                  )}
                  {stock_qty !== 0 ? (
                    <>
                      <Image source={shapestock} style={styles.stockTick} />
                      <Text style={styles.inStockText}>In stock online </Text>
                      {/* </View>                                 */}
                    </>
                  ) : (
                    <>
                      <View style={styles.outStock}>
                        <Image
                          source={SOLD_OUT_ICON}
                          style={styles.stockTick}
                        />
                        <Text style={styles.soldOutText}>Out of stock </Text>
                      </View>
                    </>
                  )}
                </View>

              </View>
            </View>
          )}

          {productData && this.renderSelectorTools()}
          {productData?.attributes?.catalogue_variants.length==0 &&
           <View style={styles.selectorToolContainer}>
               <View >
                   <Text  style={styles.colorText}>
                     {"Weight"}
                   </Text>
                   <View            
                    style={[
                      styles.toolItemSizeCell,
                      {
                        backgroundColor:  COLOR_CONST.newtheme,
                        borderWidth: scale(1),
                        borderColor: COLOR_CONST.newtheme,
                        opacity: 0.7,
                        width: scale(95),
                        marginLeft:scale(18),
                        paddingHorizontal: scale(15),
                      },
                    ]}
                  >
                  <Text style={[styles.labelText,]}>
                    {`${productData.attributes.weight ?? ""} ${productData.attributes.weight_unit ?? ""}`}  
                  </Text>
                  </View>
               </View>
             
         </View>
          }

          <View style={{ backgroundColor: COLOR_CONST.white }}>
            <Text style={[styles.specifictaionTitle, { marginLeft: scale(18), }]}>Quantity</Text>
            <View style={[styles.insidePriceBox2]}>
              {stock_qty !== 0 ? (
                <View style={[styles.tools, {}]}>
                  <TouchableOpacity activeOpacity={1} style={styles.minusview}
                    onPress={() => this.onUpdateCartValue(false)}
                  >
                    <Text style={styles.minus}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.countview}>
                    <Text style={styles.count}>{this.state.quantity}</Text>
                  </View>
                  <TouchableOpacity activeOpacity={1} style={styles.plusview}
                    onPress={() => this.onUpdateCartValue(true)}
                  >
                    <Text style={styles.plus}>+</Text>
                  </TouchableOpacity>
                </View>
              ) : 
              <View style={[styles.tools, {}]}>
                  <View  style={[styles.minusview,{opacity:0.5}]}
                  >
                    <Text style={styles.minus}>-</Text>
                  </View>
                  <View style={[styles.countview,{opacity:0.5}]}>
                    <Text style={styles.count}>{'1'}</Text>
                  </View>
                  <View style={[styles.plusview,{opacity:0.5}]}
                  >
                    <Text style={styles.plus}>+</Text>
                  </View>
                </View>
              }
            </View>
          </View>
          {prescription ? (<View style={[styles.outDesctription]}>
            <Image
              source={RX}
              style={styles.descrioptionTick}
            />
            <Text style={styles.prescription}>Prescription needed</Text>
          </View>) : null}
          <View style={styles.ButtonConatiner}>
            {stock_qty !== 0 ? this.renderButton() : this.renderNotification()}
          </View>

          {productData && productData.attributes?.description !== "" && (
            <View style={styles.descrpitionStyle}>
              <View style={styles.descrpitionReadStyle}>
                <Text style={styles.specifictaionTitle}>Description</Text>
                <View style={styles.descriptionContainer}>
                  <WebView
                    originWhitelist={["*"]}
                    source={{
                      // html: productData.attributes?.description
                      html:
                        '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' +
                        productData.attributes?.description +
                        "</body></html>",
                    }}
                    style={{
                      flex: 1,

                    }}
                  />
                </View>
                {productData.attributes?.description !== "" && (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ showProductDescriptionModal: true })
                    }
                    style={styles.readMoreButton}
                  >
                    <Text style={styles.readmore}>Read more</Text>
                  </TouchableOpacity>
                )}
                {/* <ReadMore
                  numberOfLines={2}
                  renderTruncatedFooter={this.renderTruncatedFooter}
                  renderRevealedFooter={this.renderRevealedFooter}
                >
                  <Text style={styles.DiscantaintType}>
                    {productData.attributes?.description}
                  </Text>
                </ReadMore> */}
              </View>
            </View>
          )}

          {this.renderProductReviewView()}

          {productData?.attributes?.similar_products?.data?.length > 0 && (
            <View style={styles.productGrid}>
              {/* <ProductGrid
                name={"Similar Products"}
                data={productData.attributes.similar_products.data}
                onPress={(item: any) => this.similarProducts(item)}
                onHeartPress={(item: any) =>
                  this.onHeartPress(item, "similarProducts")
                }
                onAddtocartPress={((item: any) => this.addToCartPress(item))}
              /> */}
               <FlatList
              columnWrapperStyle={{justifyContent: 'space-between'}}
              numColumns={2}
              data={this.state.similarproductList}
              keyExtractor={(item: any, index: any) => {
                return index.toString();
              }}
              // renderItem={this.renderListItem}
              renderItem={({item})=>(
                <ProductBox product={item}
                onProductPress={() =>
                  this.props.navigation.push("ProductDescription", { productData: item })
                }
                onAddToCartPress={() => this.addToCartsimilar(item)}
                onAddToWishlistPress={() =>  this.onHeartPress(item, "similarProducts")}
                onQuantityDecrease={() => this.increaseOrDecreaseCartQuantity(item, -1)}
                onQuantityIncrease={() => this.increaseOrDecreaseCartQuantity(item, 1)}
                addToCartLoading={this.state.productsAddingToCart.includes(item.id)}
                addToWishlistLoading={this.state.productWishlisting === item.id}
                currency={'INR'}
              />
              )
              }
            />
            </View>
          )}
        </ScrollView>
        {/* <View style={styles.ButtonConatiner}>
          {stock_qty !== 0 ? this.renderButton() : this.renderNotification()}
        </View> */}
      </>
    );
    // Customizable Area End
  };

  renderGuestModal = () => {
    return (
      // Customizable Area Start
      <Modal
        animationType="slide"
        transparent={this.state.showGuestModal}
        visible={this.state.showGuestModal}
        onRequestClose={() => {
          this.setState({ showGuestModal: false });
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { }}
          style={styles.modalContainer1}
        >
          <View style={styles.popup1}>
            <Text style={styles.deleteAddress1}>
              Please Sign Up/Log In first
            </Text>
            <Text style={styles.areYouSure1}>
              You need an account to perform this action.
            </Text>
            <View style={styles.bottomPopupView1}>
              <TouchableOpacity
                testID={"buttonGuestCancel"}
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => this.setState({ showGuestModal: false })}
              >
                <Text style={styles.cancelText1}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine1} />
              <TouchableOpacity
                testID={"buttonGuestSignIn"}
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => {
                  this.setState({ showGuestModal: false }, () => {
                    this.props.navigation.replace("Auth");
                  });
                }}
              >
                <Text style={styles.yesDelete1}>SIGN UP/LOG IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      // Customizable Area End
    );
  };

  renderNotification = () => {
    // Customizable Area Start
    const isNotified = this.state.showNotifyButton;
    const { selectedProduct, productData } = this.state;
    const { attributes } = productData;
    const productNotified = selectedProduct
      ? selectedProduct.attributes.is_notify_product
      : attributes.is_notify_product;
    return (
      <View style={styles.InnerConatinerNOTIFICATION}>
        {productNotified ? (
          <Text style={styles.getNotified}>
            You will get notified once the product is back in stock.
          </Text>
        ) : (
          <>
            {/* <View style={styles.NotificationTitle}>
              <Text style={styles.currentlyOut}>
                The Item is currently out of stock
              </Text>
            </View> */}

            <TouchableOpacity
              onPress={() => {
                this.notifyProduct();
              }}
            >
              <LinearGradient
                colors={[
                  themeJson.attributes.common_button_color,
                  themeJson.attributes.common_button_color,
                ]}
                style={styles.BUYbuttonCustom}
              >
                <Text style={styles.BUYcustomTxtStyle}>NOTIFY ME</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </View>
      // Customizable Area End
    );
  };

  renderButton = () => {
    // Customizable Area Start
    const { productData, selectedProduct, quantity, isSubscriptionAvailable,cart } =
      this.state;
    const { cart_quantity } = productData.attributes;
    const isUpdate = selectedProduct
      ? selectedProduct?.attributes?.cart_quantity !== Number(quantity) &&
      selectedProduct?.attributes?.cart_quantity > 0
      : cart_quantity !== Number(quantity) && cart_quantity > 0;
    const isInCart = selectedProduct
      ? selectedProduct?.attributes?.cart_quantity > 0
      : cart_quantity > 0;
      const isAlreadySubscribed = cart?.attributes.order_items.find((item: any) => (
        (item.attributes.catalogue.id === productData.id) && item.attributes.subscription_quantity
      ))
  
    return (
      <View style={styles.InnerConatiner}>
        <TouchableOpacity
          disabled={!this.state.isProductAvailable}
          onPress={() => this.addToCart()}
        >
          <View
            style={[
              isSubscriptionAvailable
                ? styles.AddbuttonCustom
                : styles.AddbuttonCustom1,
              { opacity: this.state.isProductAvailable ? 1 : 0.5 },
            ]}
          >
            <Text style={styles.AddcustomTxtStyle}>
              {!this.state.isProductAvailable
                ? "Add to cart"
                : !isInCart
                  ? "Add to cart"
                  : isUpdate
                    ? "Update cart"
                    : "Go to cart"}
            </Text>
          </View>
        </TouchableOpacity>
        {isSubscriptionAvailable && (
          <TouchableOpacity
            style={[styles.AddbuttonCustom, { marginTop: verticalScale(15), }]}
            onPress={() => this.onPressSubscriptionButton()}
            disabled={isAlreadySubscribed}
          >
            <Text style={styles.AddcustomTxtStyle}>{ isAlreadySubscribed ? "Subscribed" : "Subscribe" }</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          disabled={!this.state.isProductAvailable}
          onPress={() => this.onPressBuyNow()}
        >
          <View
            style={[
              isSubscriptionAvailable
                ? styles.BUYbuttonCustom
                : styles.BUYbuttonCustom1,
              { opacity: this.state.isProductAvailable ? 1 : 0.5 },
            ]}
          >
            <Text style={styles.BUYcustomTxtStyle}>Buy now</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
    // Customizable Area End
  };

  renderTruncatedFooter = (handlePress: any) => {
    return (
      // Customizable Area Start
      <Text style={styles.readmore} onPress={handlePress}>
        Read more
      </Text>
      // Customizable Area End
    );
  };

  renderRevealedFooter = (handlePress: any) => {
    return (
      // Customizable Area Start
      <Text style={styles.readmore} onPress={handlePress}>
        Show less
      </Text>
      // Customizable Area End
    );
  };

  renderNotifiyModal = () => {
    return (
      // Customizable Area Start
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showNotifiyModal}
        onRequestClose={() => {
          this.setState({ showNotifiyModal: false });
        }}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Request Processed</Text>
            <Text style={styles.areYouSure}>{configJSON.notifyMsg} </Text>
            <View style={styles.bottomPopupView}>
              <TouchableOpacity
                testID={"buttonNotifyOkay"}
                onPress={() => this.setState({ showNotifiyModal: false })}
              >
                <Text style={styles.cancelText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      // Customizable Area End
    );
  };

  renderProductDescriptionModal = () => {
    if (!this.state.productData) {
      return;
    }
    const { productData, selectedProduct, selectedImage } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.showProductDescriptionModal}
        onRequestClose={() => {
          this.setState({ showProductDescriptionModal: false });
        }}
      >
        <SafeAreaView style={styles.pdpModal}>
          <Text style={styles.descriptionTitle}>DESCRIPTION</Text>
          <WebView
            originWhitelist={["*"]}
            source={{
              html:
                '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' +
                productData.attributes?.description +
                "</body></html>",
            }}
            style={{ flex: 1 }}
          />
          <TouchableOpacity
            onPress={() =>
              this.setState({ showProductDescriptionModal: false })
            }
          >
            <View
              style={styles.BUYbuttonCustom}
            >
              <Text style={styles.BUYcustomTxtStyle}>Close</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={COLOR_CONST.white}
          isFocused={true}
        />
        <TopHeader
          onPressLeft={() => this.handleBackButtonClick()}
          headerLeftIconName={BACK_ICON}
          headerRightIcons={[
            {
              src: SHARE_ICON,
              onPress: () => {
                this.onShare();
              },
              style: {
                resizeMode: "contain",
                width: scale(16),
                height: scale(16),
              },
            },
            {
              src: CART_BLACK_ICON,
              onPress: () => {
                this.props.navigation.navigate("Shoppingcart");
              },
              cartHasProductFlag: this.state.cartProduct?.has_cart_product,
              cartquantity: this.state.cartProduct?.total_cart_item,
              style: { resizeMode: "contain" },
            },
          ]}
          navigation={this.props.navigation}
          headerLeftIconStyle={{}}
          headerTitleStyle={{}}
          headerStyle={{}}
        />

        {this.state.prescriptionModal &&
          <Prescriptionuploads
            navigation={this.props.navigation}
            showmodal={this.state.prescriptionModal}
            hideErrorModal={() =>
              this.setState({ prescriptionModal: false })
            }
            uploadprescription={(productdata: any) =>
              this.uploadproduct(productdata)
            }
            productData={this.state.productDataArr}
          />}
        {this.state.productData && this.renderViewAll()}
        {this.state.showNotifiyModal && this.renderNotifiyModal()}
        {this.renderGuestModal()}
        {this.renderProductDescriptionModal()}
        {this.state.showAddCartModal && (
          <Scheduling
            id={"Scheduling"}
            navigation={this.props.navigation}
            onCloseSubscriptionModal={() =>
              this.setState({ showAddCartModal: false })
            }
            productData={this.state.productData}
            selectedProduct={this.state.selectedProduct}
            selectedImage={this.state.selectedImage}
            subscriptionQuantity={this.state.subscriptionQuantity}
            subscriptionPackageData={this.state.subscriptionPackageData}
            invalidSubscriptionPackage={this.state.invalidSubscriptionPackage}
            subscriptionPeriodData={this.state.subscriptionPeriodData}
            invalidSubscriptionPeriod={this.state.invalidSubscriptionPeriod}
            subscriptionTimeSlotData={this.state.subscriptionTimeSlotData}
            selectedTimeSlot={this.state.selectedTimeSlot}
            invalidateSubscriptionTimeSlot={
              this.state.invalidateSubscriptionTimeSlot
            }
            selectedSlotId={this.state.selectedSlotId}
            slots={this.state.slots}
            period={this.state.period}
            onChangeSubscriptionQuantity={(isFromAdd: any) =>
              this.onChangeSubscriptionQuantity(isFromAdd)
            }
            onSelectSubscriptionPackage={(item: any) =>
              this.onSelectSubscriptionPackage(item)
            }
            onSelectSubscriptionTimeSlot={(item: any) =>
              this.onSelectSubscriptionTimeSlot(item)
            }
            onSelectSubscriptionPeriod={(item: any) =>
              this.onSelectSubscriptionPeriod(item)
            }
            setSubSlots={(itemId: any) => this.setSubSlots(itemId)}
            onPressSubscribeAddToCart={() => this.onPressSubscribeAddToCart()}
            onPressBuyNowSubscription={() => this.onPressBuyNowSubscription()}
          />
        )}
        <ApplicationLoader isFetching={this.state.isFetching} />
        <CustomErrorModal
          showModal={this.state.showAlertModal}
          message={this.state.message}
          isShowError={this.state.isShowError}
          hideErrorModal={() => this.setState({ showAlertModal: false })}
        />
      </SafeAreaView>
      // Customizable Area End
    );
  }
  // Customizable Area Start
  // Customizable Area End
}
