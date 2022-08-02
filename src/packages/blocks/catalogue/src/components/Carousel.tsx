import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "../CatalogueStyle";
import Swiper from "react-native-swiper";
import FastImage from "react-native-fast-image";

interface CarouselProps {
  index: number;
  bannerImages: any[];
  onPressBanner: (attributes: any) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  index,
  bannerImages,
  onPressBanner,
}) => (
  <Swiper
    autoplay
    autoplayTimeout={6}
    style={styles.wrapper}
    key={index}
    showsButtons={false}
    paginationStyle={styles.pagination}
    activeDot={<View style={styles.activeDot} />}
    dot={<View style={styles.inActiveDot} />}
  >
    {bannerImages?.length > 0 &&
      bannerImages[index].attributes.images.data.map((imageItem: any) => (
        <TouchableOpacity
          key={imageItem.id}
          onPress={() => onPressBanner(imageItem.attributes)}
          style={styles.slide1}
        >
          <FastImage
            style={styles.banner}
            source={{
              uri: imageItem.attributes.url,
            }}
            resizeMode={"stretch"}
          />
        </TouchableOpacity>
      ))}
  </Swiper>
);

export default Carousel;
