import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Button } from "react-native-elements";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Provider } from "react-redux";

import store from "./store";
import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ReviewScreen from "./screens/ReviewScreen";
import Deck from "./src/Deck";

export default class App extends React.Component {
  renderCard(item) {
    return (
      <Card key={item.id} title={item.text} image={{ uri: item.uri }}>
        <Text style={{ marginBottom: 10 }}>I can bla bla bla</Text>
        <Button icon={{ name: "code" }} backgroundColor="#03A9F4" title="View Now" />
      </Card>
    );
  }
  renderNoMoreCards() {
    return (
      <Card title="All Done">
        <Text style={{ marginBottom: 10 }}>No more Cards</Text>
        <Button title="Get more" backgroundColor="#03FF33" />
      </Card>
    );
  }
  /*render() {
    return (
      <View style={styles.container}>
        <Deck data={DATA} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards} />
      </View>
    );
  }*/
  render() {
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: TabNavigator(
            {
              map: { screen: MapScreen },
              deck: { screen: DeckScreen },
              review: {
                screen: StackNavigator({
                  review: { screen: ReviewScreen },
                  settings: { screen: SettingsScreen }
                })
              }
            },
            { tabBarPosition: "bottom", lazy: true }
          )
        }
      },
      { navigationOptions: { tabBarVisible: false }, lazy: true, tabBarPosition: "bottom" }
    );
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const DATA = [
  { id: 1, text: "Card #1", uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg" },
  { id: 2, text: "Card #2", uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg" },
  { id: 3, text: "Card #3", uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg" },
  { id: 4, text: "Card #4", uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg" },
  { id: 5, text: "Card #5", uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg" },
  { id: 6, text: "Card #6", uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg" },
  { id: 7, text: "Card #7", uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg" },
  { id: 8, text: "Card #8", uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg" }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
