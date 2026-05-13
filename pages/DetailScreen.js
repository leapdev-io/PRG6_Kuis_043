import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import BASE_URL from "../config/api";

export default function DetailScreen({ navigation }) {
  const [buildingName, setBuildingName] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [location, setLocation] = useState("");
  const [buildingArea, setBuildingArea] = useState("");
  const [price, setPrice] = useState("");
  const [idBuilding, setIdBuilding] = useState("");

  const calculatePrice = () => {
    const area = parseInt(buildingArea);

    if (!buildingType || !buildingArea) {
      Alert.alert("area dan type building type wajib diisi dulu");
      return;
    }

    if (isNaN(area)) {
      Alert.alert("building area wajib angka saja");
      return;
    }

    if (buildingType.toLowerCase() === "apart") {
      setPrice(String(area * 150000));
    } else if (buildingType.toLowerCase() === "house") {
      setPrice(String(area * 180000));
    } else {
      Alert.alert("type building harus apart / house");
    }
  };

  const resetForm = () => {
    setBuildingName("");
    setBuildingType("");
    setLocation("");
    setBuildingArea("");
    setPrice("");
    setIdBuilding("");
  };

  const createData = async () => {
    if (
      !buildingName ||
      !buildingType ||
      !location ||
      !buildingArea ||
      !price
    ) {
      Alert.alert("semua field wajib diisi");
      return;
    }

    if (
      buildingType.toLowerCase() !== "apart" &&
      buildingType.toLowerCase() !== "house"
    ) {
      Alert.alert("building Type harus apart / house");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buildingName: buildingName,
          buildingType:
            buildingType.toLowerCase() === "apart" ? "Apart" : "House",
          location: location,
          buildingArea: parseInt(buildingArea),
          price: parseInt(price),
        }),
      });

      if (response.ok) {
        Alert.alert("data berhasil ditambah");
        resetForm();
        navigation.navigate("Home");
      } else {
        Alert.alert("data gagal ditambah");
      }
    } catch (error) {
      console.log("error tambah data:", error);
      Alert.alert("server error");
    }
  };

  const deleteData = async () => {
    if (!idBuilding) {
      Alert.alert("isi id building yang mau dihapus");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/delete/${idBuilding}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Alert.alert("data dihapus");
        resetForm();
        navigation.navigate("Home");
      } else {
        Alert.alert("data gagal dihapus");
      }
    } catch (error) {
      console.log("error hapus data:", error);
      Alert.alert("server error");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Building Name</Text>
      <TextInput
        style={styles.input}
        value={buildingName}
        onChangeText={setBuildingName}
      />

      <Text style={styles.label}>Building Type</Text>
      <TextInput
        style={styles.input}
        value={buildingType}
        onChangeText={setBuildingType}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Building Area</Text>
      <TextInput
        style={styles.input}
        value={buildingArea}
        onChangeText={setBuildingArea}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.calculateButton} onPress={calculatePrice}>
        <Text style={styles.calculateText}>Calculate Price</Text>
      </TouchableOpacity>
      <Text style={styles.deleteTitle}>Delete Data</Text>
      <Text style={styles.label}>ID Building</Text>
      <TextInput
        style={styles.input}
        value={idBuilding}
        onChangeText={setIdBuilding}
        keyboardType="numeric"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addButton} onPress={createData}>
          <Text style={styles.buttonText}>+ Add Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={deleteData}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.backText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8d1b4",
    padding: 25,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 2,
    borderColor: "#1e2f2f",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#d8d8c8",
  },
  calculateButton: {
    backgroundColor: "#b8d6d0",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 12,
    alignItems: "center",
  },
  calculateText: {
    fontWeight: "bold",
  },
  infoText: {
    marginTop: 8,
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
  deleteTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 25,
    marginBottom: 5,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  addButton: {
    backgroundColor: "#b8d6d0",
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    width: "45%",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000",
  },
  backButton: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
  },
  backText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
