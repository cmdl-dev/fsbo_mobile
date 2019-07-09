import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { AppContainer } from "./navigator";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <AppContainer />
    </View>
  </Provider>
);

export default App;
