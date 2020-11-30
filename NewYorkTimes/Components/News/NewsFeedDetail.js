import React from "react";
import { View, Text,Image, Button, StyleSheet, ScrollView, Alert } from "react-native";
import Clipboard from '@react-native-community/clipboard'
import Colors from "../../constants/Colors";
import { IMG_BASE_PATH } from "@env";
import PropTypes from 'prop-types';
const NewsFeedDetails = (props) => {
  return (
    <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
      {/* <View style={styles.imageContainer}> */}
      {props.data.imageUri ? (
        <Image
          style={styles.image}
          source={{ uri: IMG_BASE_PATH + props.data.imageUri }}
        />
      ) : (
        <View style={styles.center}>
          <Text>No Image Found </Text>
        </View>
      )}
      {/* </View> */}
      <View style={styles.details}>
        <Text style={styles.title}>{props.data.title}</Text>
        <Text style={styles.description}>{props.data.description}</Text>
      </View>
      <View style={styles.urlContainer}>
        <ScrollView>
          <Text style={{ width: "100%" }}>{props.data.webURL}</Text>
        </ScrollView>
        {/* <View style={styles.ButtonsContainer}> */}
          <View style={{ margin: 2 ,width:52}}>
            <Button
              title="copy"
              color={Colors.primary}
              onPress={() => {
                Clipboard.setString(props.data.webURL);
                Alert.alert(
                  "Copied to clipboard ",
                  "You can now share the link",
                  [{ text: "Okay" }]
                );
              }}
            />
          </View>
          {/* <View style={{ margin: 10 }}>
            <Button title="Share" />
          </View> */}
        {/* </View> */}
      </View>
      {/* <View style={styles.actions}>{props.children}</View> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  details: {
		alignItems: "center",
		justifyContent:'center',
    // height: "17%",
		// height: "40%",
		alignSelf:'flex-start',
    padding: 2,
    // borderColor:'black',
    // borderWidth:1
  },
  title: {
    // fontFamily: "open-sans-bold",
    fontSize: 15,
    marginVertical: 2,
    color: Colors.primary,
  },
  description: {
    marginHorizontal: 2,
	},
	urlContainer:{
		flex:1,
		display:'flex',
		flexDirection:'row',
		 justifyContent:'flex-end',
		alignSelf:'flex-end',
		borderColor:Colors.primary,
		borderWidth:1,
		padding:2,
		borderBottomLeftRadius:10,
		borderBottomRightRadius:10
	},
	ButtonsContainer:{
		flexDirection:'column',
		// alignItems:'flex-end',
		//  justifyContent:'flex-end',
	}
});
NewsFeedDetails.propTypes={
data:PropTypes.object,
};
export default NewsFeedDetails;