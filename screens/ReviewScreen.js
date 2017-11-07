import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { Button } from "react-native-elements";

class ReviewScreen extends Component {
  static navigationOptions = ({ nagivate }) => {
    return {
      title: "Review",
      headerRight: (
        <Button
          title="Settings"
          onPress={() => nagivate("settings")}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0,122,255,1)"
        />
      ),
      style: {
        marginTop: Platform.OS === "android" ? 24 : 0
      }
    };
  };

  render() {
    return (
      <View>
        <Text>SSSS</Text>
        <Text>SSSS</Text>
        <Text>SSSS</Text>
        <Text>SSSS</Text>
        <Text>SSSS</Text>
        <Text>SSSS</Text>
        <Text>SSSS</Text>
        <Text>SSSS</Text>
        <Text>SSSS</Text>
      </View>
    );
  }
}

export default ReviewScreen;
