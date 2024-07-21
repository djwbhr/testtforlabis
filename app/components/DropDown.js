import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
const DropDown = ({ data, centerMap }) => {
  const [selectedValue, setSelectedValue] = useState("Куда");
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.rowcontainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.dropdown}
        >
          <Text style={styles.dropdownText}>{selectedValue}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.dropdownContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  setSelectedValue(item.title);
                  setModalVisible(false);
                  centerMap(item.lat, item.lng);
                }}
              >
                <Text style={styles.itemText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "left",
    alignSelf: "flex-start",
  },
  rowcontainer: {
    flexDirection: "row",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "gray",
    padding: "1%",
    width: 300,
    alignItems: "left",
  },
  dropdownText: {
    fontSize: 24,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    alignSelf: "left",
    width: 300,
    marginTop: "157%",
    paddingBottom: "2%",
    paddingTop: "2%",
  },
  item: {
    padding: "1%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: 300,
  },
  itemText: {
    fontSize: 16,
  },
});

export default DropDown;
