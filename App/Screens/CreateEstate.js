import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native"
import { Theme } from "../Components/Theme";
import Icon from "react-native-vector-icons/FontAwesome";

export function CreateEstate({ navigation }) {
  const [estateName, setEstateName] = useState("");
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("");

  const handleCreateEstate = () => {
    if (!estateName || !location) {
      Alert.alert("Missing Info", "Please fill in all required fields.");
      return;
    }

    Alert.alert("Success", "Estate created successfully.");
    setEstateName("");
    setLocation("");
    setDescription("");
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.header}>Create New Estate Group</Text>

      <Text style={styles.label}>Estate Name *</Text>
      <TextInput
        style={styles.input}
        value={estateName}
        onChangeText={setEstateName}
        placeholder="e.g., Sunrise Villas"
      />

      <Text style={styles.label}>Location *</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="e.g., Lagos, Nigeria"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Optional details about the estate"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateEstate}>
        <Text style={styles.buttonText}>Create Estate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    fontSize: Theme.sizes.xxl,
    fontFamily: Theme.fonts.text700,
    color: Theme.colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: Theme.sizes.md,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: Theme.sizes.md,
    fontFamily: Theme.fonts.text700,
  },
});
