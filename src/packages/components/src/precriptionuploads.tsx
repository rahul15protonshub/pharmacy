import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,FlatList,
  TouchableOpacity,Modal,Dimensions
  // Customizable Area Start
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
  BROWSE_ICON
  } from "../../blocks/studio-store-ecommerce-theme/src/AppAssets/appassets";
import MultiSelect from 'react-native-multiple-select';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from "rn-fetch-blob";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fs = RNFetchBlob.fs;
let imagePath:any = null;

interface Props {
  navigation: any;
  showmodal:boolean;
  hideErrorModal:any;
  productData:any;
  uploadprescription:any;
 
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  selectedItems : any;
  showanother:boolean;
  allfileupload:boolean;
  dataArr:any;
  mainarrLength:any;
  showbrowsecount:any;
  selectproduct:any;
}

interface SS {}

class Prescriptionuploads extends BlockComponent<Props, S, SS> {
  static instance: Prescriptionuploads;

  constructor(props: Props) {
    super(props);
    Prescriptionuploads.instance = this;
    let createdata=[{ selectedItems: [],forselect:this.props.productData,browsefile:[],is_selecatable:false}]
    this.state = {
      mainarrLength:this.props.productData.length,
      showbrowsecount:1,
      selectproduct:[],
      selectedItems: [],
      showanother:false,
      allfileupload:false,
      dataArr:createdata
    }
    
  }

  onSelectedItemsChange = (selectedItems:any,index:any) => {

    let editdata= this.state.dataArr
    let getallselected=this.state.dataArr
    editdata[index].selectedItems=selectedItems
    this.setState({ dataArr:editdata });
    var blankarr:any = []
    if(getallselected.length>0){
      var checkbrowse=true
        for(let j=0;j<getallselected.length;j++){
          if( getallselected[j].browsefile.length<=0){
            checkbrowse=false
          }
          if(j!=index){
            blankarr= [...blankarr,...getallselected[j].selectedItems]
          }
        }
        this.setState({ allfileupload:checkbrowse });
    }
    blankarr= [...blankarr,...selectedItems]
    this.setState({ selectedItems:blankarr });
    
    if(editdata[index].selectedItems.length>0 && editdata[index].browsefile.length>0){
      if(blankarr?.length<this.props.productData?.length){
        this.setState({showanother:true})
      }
      if(blankarr?.length==this.props.productData?.length){ 
        this.setState({showanother:false})
    }
    }else{
      this.setState({showanother:false})
    }
    
  };

  addanotherview=()=>{
    if(this.state.showanother==false){
      return false
    }
   
    var empIds = this.state.selectedItems
    // const searchData = this.props.productData.filter( (task:any) => !task.id.includes(this.state.selectedItems))
    var searchData = this.props.productData.filter(function(itm:any){
      return empIds.indexOf(itm.id) == -1;
    });
    // return false
     let createdata={selectedItems: [],forselect:searchData,browsefile:[],is_selecatable:false}
     let olddata=this.state.dataArr
     let lastiindex=olddata.length-1
     olddata[lastiindex].is_selecatable=true
     let newdata=olddata.concat(createdata);
     this.setState({dataArr:newdata})
    // dataArr.push(add)
    this.setState({showanother:false})
  }

  browsefile=async(index:any)=>{
    const response = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
    }).then((response)=>{
      
      RNFetchBlob.fs
      .readFile(response[0].uri, 'base64')
      .then((data) => {
        let tempbrowsefile=this.state.dataArr
        let finaldata='data:'+response[0].type+';base64,'+data
        tempbrowsefile[index].browsefile=[finaldata]
        this.setState({dataArr:tempbrowsefile})
        if(tempbrowsefile[index].selectedItems.length>0 && this.props.productData?.length> this.state.selectedItems.length){
          this.setState({showanother:true})
        }

        var checkbrowse=true
        for(let j=0;j<tempbrowsefile.length;j++){
          if( tempbrowsefile[j].browsefile.length<=0){
            checkbrowse=false
          }
        }
        this.setState({allfileupload:checkbrowse})
        
      })
      .catch((err) => {});

    }).catch((error)=>{

    })
    
  }

  deletebrowsefile=async(index:any)=>{
    let tempbrowsefile=this.state.dataArr
    tempbrowsefile[index].browsefile=[]
    this.setState({dataArr:tempbrowsefile,showanother:false,allfileupload:false})
  }
    
  
  render() {
    
    const { selectedItems ,dataArr} = this.state;
    const { navigation } = this.props;
    const _this = this;
    return (
     <Modal  animationType="slide"
     transparent={true}
     visible={this.props.showmodal}
     onRequestClose={() => {
        this.props.hideErrorModal();
    }}
     >
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.incontainer}>
            <View style={styles.mainscrollview}>
                <Text style={styles.labelText}>Prescription</Text>
                <TouchableOpacity onPress={()=>{this.props.hideErrorModal();}}>
                <Image
                  source={CROSS_PRESC}
                  style={styles.closeimg}
                />
                </TouchableOpacity>
                
            </View>
            <Text style={styles.labelText1}>Please upload the prescription</Text>
            {dataArr.length>0 &&
             <FlatList
             data={dataArr}
             keyExtractor={(index: any, item: any) => index.toString()}
             renderItem={({ item, index }) => {
              
              return(
                <View>

            {<View  style={{marginTop:verticalScale(15)}}>
                <View style={styles.browsefilemain}>
                    {item.browsefile.length==0 ?<TouchableOpacity
                     onPress={()=>{
                        this.browsefile(index)
                    }}
                     style={styles.browsetouch}>
                       <Text style={styles.labelText1}>Browse file</Text>
                    </TouchableOpacity>:
                    <View style={{flexDirection:'row',width:'80%',justifyContent:'space-between'}}>
                   
                   <View style={{flexDirection:'row'}}>
                     <Image
                        source={BROWSE_ICON}
                        style={styles.browseimg}
                      />
                       <Text style={styles.labelText1}>{'Prescription_'+(index+1)}</Text>
                   </View>
                      <TouchableOpacity onPress={()=>{
                        this.deletebrowsefile(index)
                        }}>
                      <Image
                        source={CROSS_ICONS}
                        style={styles.crossimg}
                      />
                      </TouchableOpacity>
                      </View>}
                </View>
                <View style={styles.maindropdwnview}>
                    <Text style={styles.labelText2}>Prescription for</Text>
                   
                        <View style={styles.multiselectview}>
                        <MultiSelect
                          is_selecatable={item.is_selecatable}
                          hideTags
                          items={item.forselect}
                          uniqueKey="id"
                         // ref={(component) => { this.multiSelect = component }}
                          onSelectedItemsChange={(items)=>this.onSelectedItemsChange(items,index)}
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
                          submitButtonColor="blue"
                          submitButtonText="Submit"
                          
                          
                          
                        />
                        </View>
               </View>
            </View>}
            </View>
            )
          
          }}
            />}
            <View style={styles.adduploadbutton}>
              <Text onPress={()=>{this.addanotherview()}} style={styles.labelTextAddanother}>{this.state.showanother? '+ Add another prescription':'' }</Text>
              <TouchableOpacity onPress={()=>{
                this.props.uploadprescription(this.state.dataArr)
              }} 
              disabled={(this.state.selectedItems?.length==this.props.productData?.length && this.state.allfileupload) ? false:true}
               style={{opacity:(this.state.selectedItems?.length==this.props.productData?.length && this.state.allfileupload) ? 1:0.4, backgroundColor:COLOR_CONST.btncolor,padding:scale(3),borderRadius:4}}> 
                 <Text style={styles.labelTextupload}>Upload</Text>
              </TouchableOpacity>

            </View>
        </ScrollView>
        </View>
       
      
       

     </Modal>
    );
  }
}

const styles = StyleSheet.create({
  browsefilemain:  {
    width:windowWidth*85/100,
    height:windowHeight*15/100,
    borderColor:COLOR_CONST.coolGrey,
    borderWidth:1,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
  },
container:{
  flex:1,
  padding:windowWidth*5/100,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'rgba(0,0,0,0.7)'
},
incontainer:{
  paddingHorizontal:windowWidth*2/100,
  borderRadius:8,
  width:windowWidth*90/100,
  backgroundColor:'#ffffff'
},
mainscrollview:{
  alignItems:'center',
  marginBottom:10, 
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:15
},
browsetouch:{ 
  width:"30%",
  backgroundColor:'white',
  elevation:2,
  borderRadius:2,
  alignItems:'center',
  justifyContent:'center'
},
maindropdwnview:{
  width:windowWidth*85/100,
  alignItems:'center',
  marginBottom:10,
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:verticalScale(15)
},
multiselectview:{
  width:'65%',
  marginTop:4,
  borderRadius:2,
  borderColor:COLOR_CONST.coolGrey,
  borderWidth:1,backgroundColor:'white',
  paddingTop:scale(6),
  paddingHorizontal:scale(5)
},
labelText: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black,
    fontSize: scale(17),
    lineHeight: scale(21),
  
  },
  labelText1: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
    fontSize: scale(14),
    lineHeight: scale(21),
  },
  labelTextupload: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.white,
    fontSize: scale(14),
    lineHeight: scale(21),
  },
  labelText2: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
    fontSize: scale(13),
    lineHeight: scale(21),
    width:'30%',
  },
  labelText3: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.lightGreyText,
    fontSize: scale(12),
    lineHeight: scale(21),
    width:'90%',
  },
  labelTextAddanother: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.primaryThemeGradient,
    fontSize: scale(14),
    lineHeight: scale(21),
  },
  closeimg: {
    width: scale(14),
    height: scale(14),
  },
  crossimg: {
    width: scale(20),
    height: scale(20),
  },
  browseimg: {
    width: scale(25),
    height: scale(25),
    marginRight:scale(10)
  },

  dropdownimg :{
    width: scale(14),
    height: scale(8),
  },
  adduploadbutton:{width:windowWidth*85/100,paddingHorizontal:'2%', marginVertical:windowHeight*2/100, flexDirection:'row',justifyContent:'space-between'},
});

export default Prescriptionuploads;