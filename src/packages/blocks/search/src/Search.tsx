import React from "react";

import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  FlatList,
  SafeAreaView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import styles from "./SearchStyle";
import COLOR_CONST, {
  FONTS,
} from "../../studio-store-ecommerce-theme/src/AppFonts";
import { SEARCH_NO_RESULTS } from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import CustomErrorModal from "../../studio-store-ecommerce-components/src/CustomErrorModal/CustomErrorModal";
import SearchController, { Props } from "./SearchController";
import FocusAwareStatusBar from "../../studio-store-ecommerce-components/src/FocusAwareStatusBar/FocusAwareStatusBar";

export default class Search extends SearchController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderEmptyDataView = () => {
    return (
      // Customizable Area Start
      <View style={styles.emptyContainer}>
        <Image source={SEARCH_NO_RESULTS} style={styles.noResultImage} />
        <Text style={styles.noResultText}>No Results Found !</Text>
        <Text style={styles.tryText}>
          Try modifying your search to get relevant results.
        </Text>
      </View>
      // Customizable Area End
    );
  };

  renderSearchBar = () => {
    return (
      // Customizable Area Start
      <View style={styles.SearchBarContainer}>
        <TextInput
          style={styles.TextStyles}
          autoFocus={this.state.showKeyBoard}
          value={this.state.searchData}
          onChangeText={(value) =>
            this.setState({ searchData: value }, () => this.onSearchProduct())
          }
          placeholder="Search here.."
          underlineColorAndroid="transparent"
          placeholderTextColor={COLOR_CONST.charcoalGrey}
        />
      </View>
      // Customizable Area End
    );
  };

  renderListItem = (item: any) => {
    if (item.attributes.name !== "") {
      return (
        // Customizable Area Start
        <TouchableOpacity
          key={item.id}
          onPress={() => this.onPressSearchData(item)}
        >
          <Text style={styles.itemStyle}>{item.attributes.name}</Text>
          <View style={styles.ViewStrightLine} />
        </TouchableOpacity>
        // Customizable Area End
      );
    }
  };

  renderRecentListItem = (item: any) => {
    return (
      // Customizable Area Start
      <>
        {item.name && (
          <TouchableOpacity onPress={() => this.onPressRecentSeacrhData(item)}>
            <Text style={styles.itemStyle}>{item.name}</Text>
            <View style={styles.ViewStrightLine} />
          </TouchableOpacity>
        )}
      </>
      // Customizable Area End
    );
  };
  renderRecentSearch = () => {
    return (
      // Customizable Area Start
      <View>
        {this.state.recentList && (
          <View>
            <Text style={styles.recentText}>Recent Searches</Text>
            <View style={styles.recentContainer}>
              <FlatList
                extraData={this.state}
                data={this.state.recentList}
                renderItem={({ item, index }) =>
                  this.renderRecentListItem(item)
                }
              />
            </View>
          </View>
        )}
      </View>
      // Customizable Area End
    );
  };

  renderSearchData = () => {
    return (
      // Customizable Area Start
      <View style={this.state.searchList.length > 0 ? null : {}}>
        {this.state.productSearchList.length > 0 && (
          <Text style={styles.recentText}>Products</Text>
        )}
        <View style={styles.recentContainer}>
          <FlatList
            extraData={this.state}
            data={this.state.productSearchList}
            //@ts-ignore
            renderItem={({ item }) => this.renderListItem(item)}
          />
        </View>
        {this.state.categorySearchList?.length > 0 && (
          <Text style={styles.recentText}>Categories</Text>
        )}
        <View style={styles.recentContainer}>
          <FlatList
            extraData={this.state}
            data={this.state.categorySearchList}
            //@ts-ignore
            renderItem={({ item }) => this.renderListItem(item)}
          />
        </View>
        {this.state.subCategorySearchList?.length > 0 && (
          <Text style={styles.recentText}>SubCategories</Text>
        )}
        <View style={styles.recentContainer}>
          <FlatList
            extraData={this.state}
            data={this.state.subCategorySearchList}
            //@ts-ignore
            renderItem={({ item }) => this.renderListItem(item)}
          />
        </View>
      </View>
      // Customizable Area End
    );
  };

  renderListItemCat = (item: any) => {
    return (
      // Customizable Area Start
      <TouchableOpacity
        onPress={() => this.onPressCategory(item)}
        style={[styles.categoryContainer]}
      >
        <View style={styles.categoryView}>
          <Image
            source={{ uri: item?.product_image.url }}
            style={styles.categoryImage}
          />
        </View>
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
      // Customizable Area End
    );
  };

  renderCategory = () => {
    return (
      // Customizable Area Start
      <View style={styles.listContainer}>
        {this.state.categoryList.length > 0 && (
          <Text style={styles.recentText}>Categories</Text>
        )}
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.categoryList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: any) =>
              this.renderListItemCat(item.attributes)
            }
          />
        </View>
      </View>
      // Customizable Area End
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
        <View
          style={{
            height: verticalScale(50),
            backgroundColor: COLOR_CONST.white,
          }}
        />
        {this.renderSearchBar()}
        {this.state.searchComplete &&
        this.state.productSearchList.length === 0 &&
        this.state.categorySearchList.length === 0 &&
        this.state.subCategorySearchList.length === 0 ? (
          this.renderEmptyDataView()
        ) : (
          <ScrollView>
            {this.state.recentList?.length > 0 &&
              this.state.searchData === "" &&
              this.renderRecentSearch()}
            {this.state.searchData !== "" && this.renderSearchData()}
            {this.state.searchData === "" && this.renderCategory()}
          </ScrollView>
        )}
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
