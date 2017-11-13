import React, { Component } from "react";
import { Button, Icon } from "react-native-elements";
import { View, Text, ActivityIndicator } from "react-native";
import { MapView } from "expo";
import { connect } from "react-redux";

import * as actions from "../actions";

class MapScreen extends Component {
  static navigationOptions = {
    titile: "Map",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    }
  };
  state = {
    mapLoaded: false,
    region: {
      longitude: -122.431297,
      latitude: 37.773972,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  };
  componentDidMount() {
    this.setState({ mapLoaded: true });
  }
  onRegionChange = region => {
    this.setState({ region });
  };

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate("deck");
    });
  };

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <MapView onRegionChangeComplete={this.onRegionChange} region={this.state.region} style={{ flex: 1 }} />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search"
            backgroundColor="#009688"
            icon={{ name: "search" }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0
  }
};

export default connect(null, actions)(MapScreen);
