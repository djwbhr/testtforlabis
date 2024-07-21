import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDown from "./DropDown";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
const OrderSheet = ({ centerMap }) => {
  const nav = useNavigation();
  const [data, setData] = useState([]);
  const loadDataFromStorage = async () => {
    try {
      const existingData = await AsyncStorage.getItem("coordinates");
      if (existingData) {
        const data = JSON.parse(existingData);
        setData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadDataFromStorage();
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <DropDown data={data} centerMap={centerMap} />
        <Button
          style={{ alignSelf: "flex-start", justifyContent: "right" }}
          title={"RefreshList"}
          onPress={loadDataFromStorage}
        />
      </View>
      <Button
        title={"goBack"}
        onPress={() => {
          nav.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "left",
    alignItems: "left",
    flexDirection: "row",
  },
  outerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "left",
  },
});

export default OrderSheet;
