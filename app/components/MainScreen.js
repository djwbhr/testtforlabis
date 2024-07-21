import { View, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import MapScreen from "./MapScreen";
import OrderSheet from "./OrderSheet";

const MainScreen = () => {
  const webViewRef = useRef(null);

  const centerMap = (lat, lng) => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(
        `window.centerMapOnMarker(${lat}, ${lng});`
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapScreen ref={webViewRef} />
      <OrderSheet centerMap={centerMap} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;
