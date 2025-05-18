import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Theme } from "../Components/Theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

export function CreateEstate({ navigation }) {
  const [estateName, setEstateName] = useState("");
  const [location, setLocation] = useState("");
  const [dateReg, setDateReg] = useState("");
  const [description, setDescription] = useState("");

  const crtBackgroundImg =
    "https://img2.joyreactor.com/pics/post/photo-village-night-805292.jpeg";

  const handleCreateEstate = () => {
    if (!estateName || !location || !dateReg) {
      Alert.alert("Missing Info", "Please fill in all required fields.");
      return;
    }

    Alert.alert("Success", "Estate created successfully.");
    setEstateName("");
    setLocation("");
    setDateReg("");
    setDescription("");
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <ImageBackground
            source={{ uri: crtBackgroundImg }}
            style={styles.headerBackground}
            imageStyle={{ borderRadius: 10 }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerOverlay}>
              <Text style={styles.header}>Create New Estate Group</Text>
            </View>
          </ImageBackground>

          <View style={styles.formContainer}>
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

            <Text style={styles.label}>Date registered *</Text>
            <TextInput
              style={styles.input}
              value={dateReg}
              onChangeText={setDateReg}
              placeholder="DD / MM / YYYY"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Optional details about the estate"
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleCreateEstate}
            >
              <Text style={styles.buttonText}>Create Estate</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerBackground: {
    height: 150,
    justifyContent: "flex-end",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  headerOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingVertical: 10,
    alignItems: "center",
  },
  header: {
    fontSize: Theme.sizes.xxl,
    fontFamily: Theme.fonts.text700,
    color: "#fff",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontFamily: Theme.fonts.text500,
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
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: Theme.sizes.md,
    fontFamily: Theme.fonts.text700,
  },
});
