import React, { useContext, useState } from "react";
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
import { AppContext } from "../Components/globalVariables";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { ToastApp } from "../Components/Toast";

export function EditProfile({ navigation, route }) {
  const { userUID, setPreloader, userInfo, setUserInfo, users } =
    useContext(AppContext);
    // const userID = route?.params?.userID || userUID;
  // const userID = userUID;

  const [firstname, setFirstname] = useState(userInfo?.firstname);
  const [lastname, setLastname] = useState(userInfo?.lastname || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [mobile, setMobile] = useState(userInfo?.phone || "");
  const [bio, setBio] = useState(userInfo?.bio || "");
  const [isYes, setIsYes] = useState(false);
  const [isNo, setIsNo] = useState(false);

  const handleEditProfile = () => {
    if (!firstname || !lastname || !email) {
      Alert.alert("Missing Info", "Please fill in all required fields.");
      return;
    }

    setPreloader(true);
    updateDoc(doc(db, "users", userUID), {
      firstname,
      lastname,
      email,
      bio,
      phone: mobile,
    })
      .then(() => {
        ToastApp("Profile updated successfully.");
        setFirstname("");
        setLastname("");
        setMobile("")
        setBio("");
        setPreloader(false);

        navigation.goBack();
      })
      .catch((error) => {
        console.log("Error updating profile:", error);
        setPreloader(false);
        Alert.alert(
          "Update Error",
          "Failed to update profile. Please try again."
        );
      });
  };

  const TopBackGroundUri =
    "https://images.pexels.com/photos/517883/pexels-photo-517883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  // const profilePicUri =
  //   "http://thispix.com/wp-content/uploads/2015/06/passport-010.jpg";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView >
          <ImageBackground
            source={{ uri: TopBackGroundUri }}
            style={styles.header}
          >
            {/* <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backIcon}
            >
              <Icon name="arrow-left" size={24} color={Theme.colors.yellow} />
            </TouchableOpacity> */}

            <Image
              source={
                userInfo?.image
                  ? { uri: userInfo.image }
                  : require("../../assets/user.png")
              }
              style={styles.profilePic}
            />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => Alert.alert("Edit Profile Picture")}
            >
              <Icon name="pencil" size={18} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.userName}>{userInfo.firstname} {userInfo.lastname}</Text>
          </ImageBackground>

          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>EDIT USER PROFILE</Text>

            <Text style={styles.label}>firstname *</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="account"
                size={Theme.sizes.icon.md}
                color="#555"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter First Name *"
                value={firstname}
                onChangeText={setFirstname}
                placeholderTextColor="#888"
                style={[styles.input, styles.inputText]}
              />
            </View>

              <Text style={styles.label}>lastname *</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="account"
                size={Theme.sizes.icon.md}
                color="#555"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter Last Name *"
                value={lastname}
                onChangeText={setLastname}
                placeholderTextColor="#888"
                style={[styles.input, styles.inputText]}
              />
            </View>

              <Text style={styles.label}>Email</Text>
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
                editable={false}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#888"
                style={[styles.input, styles.inputText]}
              />
            </View>

              <Text style={styles.label}>Phone</Text>
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
                // editable={false}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                placeholderTextColor="#888"
                style={[styles.input, styles.inputText]}
              />
            </View>

              <Text style={styles.label}>Bio</Text>
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

            {/* <Text style={styles.label2}>
              Let others see your mobile number ?
            </Text>
            <View style={styles.toggleRow}>
              <Text style={styles.genderLabel}>Yes</Text>
              <Switch
                value={isYes}
                onValueChange={(val) => {
                  setIsYes(val);
                  if (val) setIsNo(false);
                }}
              />
              <Text style={styles.genderLabel}>No</Text>
              <Switch
                value={isNo}
                onValueChange={(val) => {
                  setIsNo(val);
                  if (val) setIsYes(false);
                }}
              />
            </View> */}

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
    top: 150,
    right: 125,
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
        fontSize: Theme.sizes.sm,
        fontWeight: "600",
        marginBottom: 1,
    },
  label2: {
    fontSize: Theme.sizes.md,
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
