import React from 'react';
import {  Text, View ,ScrollView} from "react-native";
import Modal from "react-native-modal";

const CustModal = props=>{
  return (
    // <View style={{ flex: 1 ,borderWidth:5,borderColor:'green'}}>
    <Modal isVisible={props.isVisible} onBackdropPress={props.toggleModal}>
      <View
        style={{
          // flex: 1,
          // justifyContent: "center",
          alignItems: "center",
          height: "80%",
          // width: "80%",
          backgroundColor: "#c0c3c7",
          borderRadius: 15,
          marginHorizontal: 5,
        }}
      >
          {props.children}
				</View>
      </Modal>
      //{" "}
  );
};

export default CustModal;
