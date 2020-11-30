import React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";

import Card from "../UI/Card";
import PropTypes from 'prop-types';
const NewsItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.news}>
      <View style={styles.touchable}>
        <TouchableCmp
          onPress={() => {
            props.onSelect(props.id);
          }}
          useForeground
        >
          <View>
            <View style={styles.imageContainer}>
              {props.image ? (
                <Image style={styles.image} source={{ uri: props.image }} />
              ) : (
                <View style={styles.center}>
                  <Text>No Image Found </Text>
                </View>
              )}
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.description}>{props.description}</Text>
            </View>
            {/* <View style={styles.actions}>{props.children}</View> */}
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  news: {
    height: 300,
    margin: 10,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    // height: "17%",
    height: "40%",
    padding: 2,
  },
  title: {
    // fontFamily: "open-sans-bold",
    fontSize: 15,
		marginVertical: 2,
		color:Colors.primary
	},
	description:{
		marginHorizontal:2
	},
  // price: {
  //   fontFamily: "open-sans",
  //   fontSize: 14,
  //   color: "#888",
  // },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
	},
	  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
NewsItem.propTypes={
	image:PropTypes.string,
	title:PropTypes.string,
	description:PropTypes.string,
}
export default NewsItem;
