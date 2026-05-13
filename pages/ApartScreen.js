import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import BASE_URL from "../config/api";

export default function ApartScreen({ navigation }) {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getApartments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/type/Apart`);
      const data = await response.json();

      setApartments(data);
    } catch (error) {
      console.log("gagal mengambil data apartment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", getApartments);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.number}>{index + 1}</Text>

        <View style={styles.itemText}>
          <Text style={styles.buildingName}>{item.buildingName}</Text>
          <Text style={styles.location}>Location: {item.location}</Text>
          <Text style={styles.smallText}>Area: {item.buildingArea}</Text>
          <Text style={styles.smallText}>Price: {item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={apartments}
          keyExtractor={(item) => item.idBuilding.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Data apartment masih kosong</Text>
          }
        />
      )}

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.activeButton}>
          <Text style={styles.bottomText}>Apart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate("House")}
        >
          <Text style={styles.bottomText}>House</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8d1b4",
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 22,
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 15,
  },
  itemText: {
    flex: 1,
  },
  buildingName: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 15,
  },
  location: {
    fontSize: 13,
    marginTop: 2,
  },
  smallText: {
    fontSize: 12,
    marginTop: 2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontStyle: "italic",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },
  bottomButton: {
    backgroundColor: "#b8d6d0",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    width: 80,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#0693a8",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    width: 80,
    alignItems: "center",
  },
  bottomText: {
    fontWeight: "bold",
  },
});
