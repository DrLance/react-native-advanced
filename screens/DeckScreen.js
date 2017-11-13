import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { connect } from "react-redux";
import { MapView } from "expo";
import { Card, Button, Icon } from "react-native-elements";
import Swipe from "../components/Swipe";
import * as actions from "../actions";

class DeckScreen extends Component {
  static navigationOptions = {
    title: "Deck ",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    }
  };

  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };
    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.IS === "android"}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet.replace(/<b>/g, "").replace(/<\/b/g, "")}</Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No more jobs">
        <Button
          title="Back to Map"
          large={true}
          icon={{ name: "my-location" }}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate("map")}
        />
      </Card>
    );
  };

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          keyProp="jobkey"
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ jobs }) => {
  return {
    jobs: jobs.results
  };
};

const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  }
};

export default connect(mapStateToProps, actions)(DeckScreen);
