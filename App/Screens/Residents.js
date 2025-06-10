import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Theme } from "../Components/Theme";
import { AppContext } from "../Components/globalVariables";
import { formatTimeAgo } from "../Components/formatTimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc } from "firebase/firestore";
import { RenderUser } from "../Components/RenderUser";

// Sample data for Commshare groups
const groups = [
  {
    id: "1",
    name: "Estate Fuel Pool",
    timestamp: "2:45 PM",
  },
  {
    id: "2",
    name: "Security Watch",
    timestamp: "1:15 PM",
  },
  {
    id: "3",
    name: "Generator Maintenance",
    timestamp: "Yesterday",
  },
  {
    id: "4",
    name: "Event Planning",
    timestamp: "May 18",
  },
];

export const Residents = ({ navigation, route }) => {
  const { userUID, userInfo, setUserInfo, createdEstates, docID } =
    useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  const estate = createdEstates.find((item) => item.docID == docID);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={
              userInfo?.image
                ? { uri: userInfo.image }
                : require("../../assets/user.png")
            }
            style={styles.profileAvatar}
          />
        </View>
        <Text style={styles.headerTitle}>{estate?.name}</Text>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate("AddUsers")}
        >
          <FontAwesome
            name="plus-circle"
            size={28}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} style={styles.searchIcon} />
        <TextInput
          placeholder="Search groups"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={estate?.users}
        keyExtractor={(item) => item} // Since item is the ID itself
        renderItem={({ item }) => <RenderUser item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Theme.sizes.xs,
    paddingHorizontal: Theme.sizes.md,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f8f8f8",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: Theme.sizes.xl,
    marginRight: Theme.sizes.xs,
  },
  profileName: {
    fontSize: Theme.sizes.lg,
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: Theme.sizes.lg,
    fontFamily: Theme.fonts.text600,
  },
  createBtn: {
    padding: Theme.sizes.xxs,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: Theme.sizes.xs,
    paddingHorizontal: Theme.sizes.xs,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: Theme.sizes.xs,
    backgroundColor: "#fafafa",
  },
  searchIcon: {
    marginRight: Theme.sizes.xxs,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  listContent: {
    paddingHorizontal: Theme.sizes.xs,
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: Theme.sizes.md,
    paddingHorizontal: Theme.sizes.xxs,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "space-around",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: Theme.sizes.xxl,
    marginRight: Theme.sizes.md,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupName: {
    fontSize: Theme.sizes.lg,
    fontWeight: "600",
  },
  timestamp: {
    fontSize: Theme.sizes.sm,
    color: "#888",
  },
  lastMessage: {
    fontSize: Theme.sizes.sm,
    color: "#555",
    marginTop: Theme.sizes.xxs,
  },
});
