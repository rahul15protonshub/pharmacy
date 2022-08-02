import React from "react";
import {
  // Customizable Area Start
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image, FlatList,
  TouchableOpacity,
  Modal,
  Dimensions
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import scale, { verticalScale } from "../../framework/src/utils/Scale";
import COLOR_CONST, {
  FONTS,
} from "../../blocks/studio-store-ecommerce-theme/src/AppFonts";
import {
  CROSS_ICONS,
  CROSS_PRESC,
  DOWN_ARROW,
  BROWSE_ICON,
  crossIcon
} from "../../blocks/studio-store-ecommerce-theme/src/AppAssets/appassets";
import MultiSelect from 'react-native-multiple-select';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from "rn-fetch-blob";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fs = RNFetchBlob.fs;
interface Props {
  // Customizable Area Start
  navigation: any;
  showmodal: boolean;
  hideErrorModal: any;
  productData: any;
  uploadprescription: any;
  // Customizable Area End
}

interface S {
  selectedItems: any;
  showanother: boolean;
  allfileupload: boolean;
  dataArr: any;
  mainarrLength: any;
  showbrowsecount: any;
  selectproduct: any;
}

interface SS { }

class Prescriptionuploads extends BlockComponent<Props, S, SS> {
  static instance: Prescriptionuploads;

  constructor(props: Props) {
    super(props);
    Prescriptionuploads.instance = this;
    let createdata = [{ selectedItems: [], forselect: this.props.productData, browsefile: [], is_selecatable: false, selected_values: '' }]
    this.state = {
      mainarrLength: this.props.productData.length,
      showbrowsecount: 1,
      selectproduct: [],
      selectedItems: [],
      showanother: false,
      allfileupload: false,
      dataArr: createdata
    }

  }

  onSelectedItemsChange = (selectedItems: any, index: any) => {

    let editdata = this.state.dataArr
    let getallselected = this.state.dataArr
    editdata[index].selectedItems = selectedItems
    var selected_values = '';
    let final_data = [];
    for (let i = 0; i < selectedItems.length; i++) {
      var indexget = getallselected[index].forselect.findIndex((x: any) => x.id == selectedItems[i]);
      if (indexget >= 0) {
        final_data.push(getallselected[index].forselect[indexget].name)
      }
    }
    selected_values = final_data.join(', ')
    editdata[index].selected_values = selected_values
    this.setState({ dataArr: editdata });
    var blankarr: any = []
    if (getallselected.length > 0) {
      var checkbrowse = true
      for (let j = 0; j < getallselected.length; j++) {
        if (getallselected[j].browsefile.length <= 0) {
          checkbrowse = false
        }
        if (j != index) {
          blankarr = [...blankarr, ...getallselected[j].selectedItems]
        }
      }
      this.setState({ allfileupload: checkbrowse });
    }
    blankarr = [...blankarr, ...selectedItems]
    this.setState({ selectedItems: blankarr });

    if (editdata[index].selectedItems.length > 0 && editdata[index].browsefile.length > 0) {
      if (blankarr?.length < this.props.productData?.length) {
        this.setState({ showanother: true })
      }
      if (blankarr?.length == this.props.productData?.length) {
        this.setState({ showanother: false })
      }
    } else {
      this.setState({ showanother: false })
    }

  };

  addanotherview = () => {
    if (this.state.showanother == false) {
      return false
    }
    var empIds = this.state.selectedItems
    var searchData = this.props.productData.filter(function (itm: any) {
      return empIds.indexOf(itm.id) == -1;
    });
    let createdata = { selectedItems: [], forselect: searchData, browsefile: [], is_selecatable: false, selected_values: '' }
    let olddata = this.state.dataArr
    let lastiindex = olddata.length - 1
    olddata[lastiindex].is_selecatable = true
    let newdata = olddata.concat(createdata);
    this.setState({ dataArr: newdata })
    this.setState({ showanother: false })
  }

  browsefile = async (index: any) => {
    const response = await DocumentPicker.pick({
      type: [
        DocumentPicker.types.pdf,
        DocumentPicker.types.images,
        DocumentPicker.types.plainText,
        DocumentPicker.types.doc,
        DocumentPicker.types.docx,
        DocumentPicker.types.ppt,
        DocumentPicker.types.xls,
        DocumentPicker.types.xlsx,
        DocumentPicker.types.pptx,
      ],
    }).then((response) => {

      RNFetchBlob.fs
        .readFile(response[0].uri, 'base64')
        .then((data) => {
          let tempbrowsefile = this.state.dataArr
          let finaldata = 'data:' + response[0].type + ';base64,' + data
          tempbrowsefile[index].browsefile = [finaldata]
          this.setState({ dataArr: tempbrowsefile })
          if (tempbrowsefile[index].selectedItems.length > 0 && this.props.productData?.length > this.state.selectedItems.length) {
            this.setState({ showanother: true })
          }

          var checkbrowse = true
          for (let j = 0; j < tempbrowsefile.length; j++) {
            if (tempbrowsefile[j].browsefile.length <= 0) {
              checkbrowse = false
            }
          }
          this.setState({ allfileupload: checkbrowse })

        })
        .catch((err) => { });

    }).catch((error) => {

    })

  }

  deletebrowsefile = async (index: any) => {
    let tempbrowsefile = this.state.dataArr
    tempbrowsefile[index].browsefile = []
    this.setState({ dataArr: tempbrowsefile, showanother: false, allfileupload: false })
  }
  deleteview = async (index: any) => {
    let tempbrowsefile = this.state.dataArr
      tempbrowsefile.splice(index, 1);
      let newindex=tempbrowsefile.length-1
      tempbrowsefile[newindex].is_selecatable = false
    this.setState({ dataArr: tempbrowsefile,  allfileupload: false })
  }

  render() {
    const { selectedItems, dataArr } = this.state;
    return (

      <Modal animationType="slide"
        transparent={true}
        visible={this.props.showmodal}
        onRequestClose={() => {
          this.props.hideErrorModal();
        }}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.incontainer}>
            <View style={styles.mainscrollview}>
              <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: scale(5) }} onPress={() => { this.props.hideErrorModal(); }}>
                <Image
                  source={CROSS_PRESC}
                  style={styles.closeimg}
                />
              </TouchableOpacity>
              <Text style={styles.labelText}>Prescription</Text>
            </View>
            <Text style={[styles.labelText1, { marginHorizontal: windowWidth * 2 / 100, }]}>Please upload the prescription</Text>
            {dataArr.length > 0 &&
              <FlatList
                data={dataArr}
                keyExtractor={(index: any, item: any) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <View>

                      {<View style={{ marginTop: verticalScale(15) }}>
                       {index>0 && <TouchableOpacity style={{alignSelf:'flex-end',marginRight:scale(15),marginBottom:scale(8)}} onPress={() => {
                                this.deleteview(index)
                              }}>
                                <Image
                                  source={crossIcon}
                                  style={[styles.crossimg_br,{}]}
                                />
                        </TouchableOpacity>
                        }
                        <View style={styles.browsefilemain}>
                          {item.browsefile.length == 0 ? <TouchableOpacity
                            onPress={() => {
                              this.browsefile(index)
                            }}
                            style={styles.browsetouch}>
                            <Text style={styles.labelText11}>Browse files</Text>
                          </TouchableOpacity> :
                            <View style={{ alignItems: 'center', flexDirection: 'row', width: '80%', justifyContent: 'space-between' }}>

                              <View style={{ flexDirection: 'row' }}>
                                <Image
                                  source={BROWSE_ICON}
                                  style={styles.browseimg}
                                />
                                <Text style={styles.labelText1}>{'Prescription' + (index + 1)}</Text>
                              </View>
                              <TouchableOpacity onPress={() => {
                                this.deletebrowsefile(index)
                              }}>
                                <Image
                                  source={crossIcon}
                                  style={styles.crossimg}
                                />
                              </TouchableOpacity>
                            </View>}
                        </View>
                        <View style={styles.maindropdwnview}>
                          <Text style={styles.labelText2}>Prescription for</Text>
                          <View style={styles.multiselectview}>
                            {!item.is_selecatable ?
                              <MultiSelect
                                hideTags
                                items={item.forselect}
                                uniqueKey="id"
                                // ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={(items) => this.onSelectedItemsChange(items, index)}
                                selectedItems={item.selectedItems}
                                selectText=" Select Product"
                                altFontFamily={FONTS.GTWalsheimProRegular}
                                selectedItemTextColor="grey"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ display: "none" }}
                                textInputProps={{ editable: false }}
                                searchIcon={false}
                                hideDropdown
                                submitButtonColor={COLOR_CONST.newtheme_another}
                                submitButtonText="Submit"
                              /> :
                              <Text numberOfLines={1} style={styles.labelTextselectedvalues}>{item.selected_values}</Text>
                            }
                          </View>
                        </View>
                      </View>}
                    </View>
                  )
                }}
              />
            }
            <View style={styles.adduploadbutton}>
              <Text onPress={() => { this.addanotherview() }} style={styles.labelTextAddanother}>{this.state.showanother ? '+ Add prescription' : ''}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text onPress={() => { this.props.hideErrorModal() }} style={styles.labelTextcancel}>{'Cancel'}</Text>
                <TouchableOpacity onPress={() => {
                  this.props.uploadprescription(this.state.dataArr)
                }}
                  disabled={(this.state.selectedItems?.length == this.props.productData?.length && this.state.allfileupload) ? false : true}
                  style={(this.state.selectedItems?.length == this.props.productData?.length && this.state.allfileupload) ? styles.uploadactive : styles.uploadDeactive}>
                  <Text style={styles.labelTextupload}>Upload</Text>
                </TouchableOpacity>
              </View>


            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

    );
  }
}

const styles = StyleSheet.create({
  browsefilemain: {
    width: windowWidth * 81 / 100,
    height: windowHeight * 15 / 100,
    borderColor: COLOR_CONST.lightgray,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    padding: windowWidth * 5 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  incontainer: {
    paddingHorizontal: windowWidth * 2 / 100,
    borderRadius: 0,
    width: windowWidth * 90 / 100,
    backgroundColor: '#ffffff',
    marginTop: verticalScale(20)
  },
  mainscrollview: {
    marginHorizontal: windowWidth * 2 / 100,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15
  },
  browsetouch: {
    width: "30%",
    backgroundColor: 'white',
    borderWidth: 0.8,
    borderColor: COLOR_CONST.lightgray,
    borderRadius: 2,
    alignItems: 'center',
    paddingVertical: verticalScale(3),
    justifyContent: 'center'
  },
  maindropdwnview: {
    width: windowWidth * 81 / 100,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(15)
  },
  multiselectview: {
    width: '58%',
    marginTop: 4,
    borderRadius: 2,
    borderColor: COLOR_CONST.lightgray,
    borderWidth: 1, backgroundColor: 'white',
    paddingTop: scale(6),
    paddingHorizontal: scale(5)
  },
  labelText: {
    fontFamily: FONTS.GTWalsheimProBold,
    color: COLOR_CONST.black,
    fontSize: scale(17),
    lineHeight: scale(21),
    alignSelf: 'flex-start'

  },
  labelText1: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
    fontSize: scale(14),
    lineHeight: scale(21),
  },
  labelText11: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
    fontSize: scale(12),
    lineHeight: scale(21),
  },
  labelTextupload: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.white,
    fontSize: scale(13),
    lineHeight: scale(21),
  },
  labelTextcancel: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black,
    fontSize: scale(13),
    textDecorationLine: 'underline',
    marginRight: scale(8),
    lineHeight: scale(21),
  },
  labelTextselectedvalues: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: '#525966',
    fontSize: scale(14),
    lineHeight: scale(21),
    paddingVertical: verticalScale(11),
    marginTop: -scale(5)

  },
  labelText2: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black,
    fontSize: scale(13),
    lineHeight: scale(21),
    width: '40%',
  },
  labelText3: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.lightGreyText,
    fontSize: scale(12),
    lineHeight: scale(21),
    width: '90%',
  },
  labelTextAddanother: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: '#448AFF',
    fontSize: scale(14),
    lineHeight: scale(21),
  },
  closeimg: {
    width: scale(27),
    height: scale(27),
  },
  crossimg: {
    width: scale(10),
    height: scale(10),
    tintColor:"#448AFF"
  },
  crossimg_br : {
    width: scale(8),
    height: scale(8),
  },
  browseimg: {
    width: scale(25),
    height: scale(25),
    marginRight: scale(10)
  },

  dropdownimg: {
    width: scale(14),
    height: scale(8),
  },
  adduploadbutton: {
    alignSelf: 'center',
    width: windowWidth * 81 / 100,
    marginVertical: windowHeight * 4 / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  uploadactive: {
    backgroundColor: COLOR_CONST.newtheme_another, paddingVertical: scale(7), paddingHorizontal: scale(22), borderRadius: 4
  },
  uploadDeactive: {
    backgroundColor: '#D7DCE1', paddingVertical: scale(7), paddingHorizontal: scale(22), borderRadius: 4
  },
});

export default Prescriptionuploads;