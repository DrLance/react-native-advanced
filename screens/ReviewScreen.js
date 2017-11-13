import React, { Component } from "react";
import { View, Text, Platform, ScrollView, Linking } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { MapView } from "expo";

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Review",
      headerRight: (
        <Button
          title="Settings"
          onPress={() => navigation.navigate("settings")}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0,122,255,1)"
        />
      ),
      style: {
        marginTop: Platform.OS === "android" ? 24 : 0
      },
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="my-location" size={30} color={tintColor} />;
      }
    };
  };

  renderLikedJobs() {
    return this.props.likeJobs.map(job => {
      const { company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey } = job;
      const initialRegion = {
        longitude,
        latitude,
        longitudeDelta: 0.02,
        latitudeDelta: 0.045
      };
      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.IS === "android"}
              initialRegion={initialRegion}
            />

            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button title="Apply now" backgroundColor="#03A9F4" onPress={() => Linking.openURL(url)} />
          </View>
        </Card>
      );
    });
  }

  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const mapStateToProps = state => {
  return { likeJobs: state.likeJobs };
};

const styles = {
  detailWrapper: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  italics: {
    fontStyle: "italic"
  }
};

export default connect(mapStateToProps)(ReviewScreen);
