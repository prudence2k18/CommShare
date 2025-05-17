import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Theme } from "../Components/Theme";

export function CreateEstate({ navigation }) {
  const [estateName, setEstateName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateEstate = () => {
    if (!estateName || !location || !email || !mobile) {
      Alert.alert("Missing Info", "Please fill in all required fields.");
      return;
    }

    Alert.alert("Success", "Estate created successfully.");
    setEstateName("");
    setLocation("");
    setEmail("");
    setMobile("");
    setDescription("");
    navigation.goBack();
  };

  const TopBackGround_URI =
    "https://images.pexels.com/photos/517883/pexels-photo-517883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const profilePicUri =
    "http://thispix.com/wp-content/uploads/2015/06/passport-010.jpg";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground
            source={{ uri: TopBackGround_URI }}
            style={styles.header}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backIcon}
            >
              <Icon name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>

            <Image source={{ uri: profilePicUri }} style={styles.profilePic} />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Icon name="pencil" size={18} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.userName}>Lacey Fernandez</Text>
          </ImageBackground>

          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>Create New Estate Group</Text>

            <View style={styles.inputContainer}>
              <Icon
                name="home-city-outline"
                size={Theme.sizes.icon.md}
                color="#555"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Estate Name *"
                value={estateName}
                onChangeText={setEstateName}
                placeholderTextColor="#888"
                style={[styles.input, styles.inputText]}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="map-marker-outline"
                size={Theme.sizes.icon.md}
                color="#555"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Location *"
                value={location}
                onChangeText={setLocation}
                placeholderTextColor="#888"
                style={[styles.input, styles.inputText]}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="email-outline"
                size={Theme.sizes.icon.md}
                color="#555"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter Email *"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#888"
                style={[styles.input, styles.inputText]}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="phone-outline"
                size={Theme.sizes.icon.md}
                color="#555"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter your mobile number *"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                placeholderTextColor="#888"
                style={[styles.input, styles.inputText]}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="file-document-outline"
                size={Theme.sizes.icon.md}
                color="#555"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Optional details about the estate"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                placeholderTextColor="#888"
                style={[styles.input, styles.multilineInput]}
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleCreateEstate}
            >
              <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 270,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  backIcon: {
    position: "absolute",
    top: 30,
    left: 20,
    padding: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  editIcon: {
    position: "absolute",
    top: 80,
    right: 130,
    backgroundColor: Theme.colors.yellow,
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: Theme.fonts.text700,
    color: "#fff",
  },
  formCard: {
  backgroundColor: "#fff",
  marginHorizontal: 20,
  marginTop: -40, // move it up to overlap the image
  padding: 25,
  borderRadius: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 6,
  zIndex: 2, // ensure it appears above the image
},

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
    color: Theme.colors.primary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
    marginBottom: 18,
    minHeight: 40,
  },
  inputIcon: {
    marginRight: 12,
  },
  inputText: {
    fontFamily: Theme.fonts.text400,
  },
  multilineInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
    minHeight: 90,
    textAlignVertical: "top",
    fontFamily: Theme.fonts.text400,
  },
  saveButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Theme.fonts.text700,
  },
});
