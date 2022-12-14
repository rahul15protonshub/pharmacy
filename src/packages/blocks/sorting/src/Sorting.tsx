import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
  Image,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
// Customizable Area Start
// Customizable Area End
import SortingController, { Props, configJSON } from "./SortingController";

export default class Sorting extends SortingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  getList(item: any) {
    let value = item.item.attributes;

    return (
      <View style={styles.productBox}>
        <View style={styles.ImgContainer}>
          <Image
            style={styles.productImg}
            source={{ uri: value.images[0].url }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.productName}>{value.name}</Text>
          <Text style={styles.price}>{value.price}</Text>
          <View style={[styles.flexBox, styles.starBox]}>
            <Text style={styles.rating}>{value.average_rating}</Text>
            <Icon
              name="star"
              size={12}
              style={styles.sortIcon}
              color="orange"
            />
          </View>
        </View>
      </View>
    );
  }
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={[styles.topBox, styles.flexBox]}
            onPress={() => this.modalVisible()}
            testID="sortModalOpen"
          >
            <Icon
              name="sort-amount-asc"
              size={15}
              style={styles.sortIcon}
              color="#808080"
            />
            <Text style={styles.topText}>Sort</Text>
          </TouchableOpacity>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <TouchableWithoutFeedback
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View>
              <View style={[styles.productContainer, styles.flexBox]}>
                <FlatList
                  data={this.state.data}
                  renderItem={(item) => this.getList(item)}
                  extraData={this.state}
                  keyExtractor={(item: any) => item.id}
                  numColumns={2}
                  columnWrapperStyle={styles.row}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <Modal
          style={styles.modalBox}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
          backdropTransitionOutTiming={0}
          animationOutTiming={500}
          onBackdropPress={() => this.modalVisible()}
          isVisible={this.state.isVisible}
        >
          <View style={styles.modalContainer}>
            <Icon
              name="close"
              size={20}
              style={styles.closeIcon}
              color="#808080"
              onPress={() => this.modalVisible()}
            />
            <Text style={styles.heading}>Sort by</Text>
            <TouchableOpacity
              style={[styles.sortList, styles.flexBox]}
              onPress={() => this.sortPriceAsc()}
              testID="sortPriceAsc"
            >
              <Icon
                name="sort-amount-asc"
                size={15}
                style={styles.sortIcon}
                color="#808080"
              />
              <Text style={styles.sortText}>Price Low to High</Text>
              {this.state.priceLowtoHigh && (
                <Icon
                  name="check-circle"
                  size={16}
                  style={styles.sortIconCheck}
                  color="green"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortList, styles.flexBox]}
              onPress={() => this.sortPriceDesc()}
              testID="sortPriceDesc"
            >
              <Icon
                name="sort-amount-desc"
                size={15}
                style={styles.sortIcon}
                color="#808080"
              />
              <Text style={styles.sortText}>Price High to Low</Text>
              {this.state.priceHightoLow && (
                <Icon
                  name="check-circle"
                  size={16}
                  style={styles.sortIconCheck}
                  color="green"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortList, styles.flexBox]}
              onPress={() => this.sortNewest()}
              testID="sortNewest"
            >
              <Icon
                name="product-hunt"
                size={15}
                style={styles.sortIcon}
                color="#808080"
              />
              <Text style={styles.sortText}>Newest Products</Text>
              {this.state.newestProduct && (
                <Icon
                  name="check-circle"
                  size={16}
                  style={styles.sortIconCheck}
                  color="green"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortList, styles.flexBox]}
              onPress={() => this.sortPopularity()}
              testID="sortPopularity"
            >
              <Icon
                name="fire"
                size={15}
                style={styles.sortIcon}
                color="#808080"
              />
              <Text style={styles.sortText}>Popularity</Text>
              {this.state.popular && (
                <Icon
                  name="check-circle"
                  size={16}
                  style={styles.sortIconCheck}
                  color="green"
                />
              )}
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    backgroundColor: "#FFF",
    elevation: 1,
  },
  topBox: {
    width: "100%",
    paddingVertical: 5,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 15,
    minHeight: 260,
    position: "relative",
  },
  modalBox: {
    margin: 0,
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: -20,
  },
  closeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
    fontWeight: "normal",
    zIndex: 999,
  },
  heading: {
    fontSize: 18,
    color: "#000",
    marginBottom: 15,
  },
  sortList: {
    paddingVertical: 8,
    alignItems: "center",
    position: "relative",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  sortText: {
    fontSize: 16,
    color: "#696969",
  },
  sortIcon: {
    marginRight: 12,
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
  },
  productContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  productBox: {
    height: 250,
    borderBottomWidth: 1,
    flexDirection: "column",
    flex: 0.5,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  ImgContainer: {
    //marginBottom: 15,
    height: 150,
  },
  productName: {
    paddingVertical: 5,
    fontSize: 16,
  },
  price: {
    color: "#444",
    fontSize: 16,
    marginBottom: 10,
  },
  productImg: {
    width: "100%",
    height: "100%",
  },
  detailContent: {
    padding: 10,
  },
  rating: {
    color: "#000",
    paddingRight: 6,
  },
  starBox: {
    alignItems: "center",
  },
  sortIconCheck: {
    position: "absolute",
    right: 0,
    top: 5,
  },
});
// Customizable Area End
