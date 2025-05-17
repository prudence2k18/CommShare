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
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Theme } from "../Components/Theme";

export function EditProfile({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);

  const handleEditProfile = () => {
    if (!username || !email || (!isMale && !isFemale)) {
      Alert.alert("Missing Info", "Please fill in all required fields.");
      return;
    }

    Alert.alert("Success", "Profile details changed.");
    setUsername("");
    setEmail("");
    setMobile("");
    setDob("");
    // setBio("");
    navigation.goBack();
  };

  const TopBackGroundUri =
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
            source={{ uri: TopBackGroundUri }}
            style={styles.header}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backIcon}
            >
              <Icon name="arrow-left" size={24} color={Theme.colors.yellow} />
            </TouchableOpacity>

            <Image source={{ uri: profilePicUri }} style={styles.profilePic} />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => Alert.alert("Edit Profile Picture")}
            >
              <Icon name="pencil" size={18} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.userName}>Lacey Fernandez</Text>
          </ImageBackground>

          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>EDIT USER PROFILE</Text>

            <View style={styles.inputContainer}>
              <Icon
                name="account"
                size={Theme.sizes.icon.md}
                color="#555"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter User Name *"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#888"
                style={[styles.input, styles.inputText]}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="email"
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
                name="cellphone"
                size={Theme.sizes.icon.md}
                color="#555"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter your mobile number"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                placeholderTextColor="#888"
                style={[styles.input, styles.inputText]}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="calendar"
                size={Theme.sizes.icon.md}
                color="#555"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Bio"
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={3}
                style={[styles.input, styles.multilineInput]}
                placeholderTextColor="#888"
              />
            </View>

            <Text style={styles.label}>Sex</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.genderLabel}>Male</Text>
              <Switch
                value={isMale}
                onValueChange={(val) => {
                  setIsMale(val);
                  if (val) setIsFemale(false);
                }}
              />
              <Text style={styles.genderLabel}>Female</Text>
              <Switch
                value={isFemale}
                onValueChange={(val) => {
                  setIsFemale(val);
                  if (val) setIsMale(false);
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleEditProfile}
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
    flex: 1,
  },
  multilineInput: {
    minHeight: 70,
    textAlignVertical: "top",
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  genderLabel: {
    fontSize: 16,
    color: "#555",
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
