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

export default function HomeScreen({ navigation }) {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllBuildings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/all`);
      const data = await response.json();

      setBuildings(data);
    } catch (error) {
      console.log("gagal mengambil semua data building :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", getAllBuildings);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.number}>{index + 1}</Text>
        <View style={styles.itemText}>
          <Text style={styles.buildingName}>{item.buildingName}</Text>
          <Text style={styles.price}>Price: {item.price}</Text>
          <Text style={styles.smallText}>Type: {item.buildingType}</Text>
          <Text style={styles.smallText}>Location: {item.location}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Detail")}
      >
        <Text style={styles.addButtonText}>+ Add Data</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={buildings}
          keyExtractor={(item) => item.idBuilding.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Data masih kosong</Text>
          }
        />
      )}

      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate("Apart")}
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
  addButton: {
    backgroundColor: "#b8d6d0",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: "center",
    marginBottom: 20,
  },
  addButtonText: {
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 18,
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
  price: {
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
  bottomText: {
    fontWeight: "bold",
  },
});
