import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistCombineReducers, persistStore } from "redux-persist";
import { AsyncStorage } from "react-native";
import reducers from "../reducers";

const config = {
  key: "primary",
  storage: AsyncStorage,
  whitelist: ["likeJobs"]
};

let reducer = persistCombineReducers(config, reducers);

const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));

persistStore(store, null, () => {
  store.getState();
});

export default store;
