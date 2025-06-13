import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Dimensions,
  StatusBar,
    Platform,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Theme } from "../Components/Theme";
import { AppContext } from "../Components/globalVariables";
import { formatTimeAgo } from "../Components/formatTimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { RenderUser } from "../Components/RenderUser";
import { db } from "../../Firebase/Settings";
import { formatNum } from "../Components/formatNum";

const { width, height } = Dimensions.get("screen");

export const Contributions = ({ navigation, route }) => {
  const {
    setPreloader,
    userUID,
    userInfo,
    estate,
    createdEstates,
    docID,
    estateContributions,
  } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <FontAwesome5
            name="hand-holding-usd"
            size={24}
            color={Theme.colors.primary}
          />
          {/* <Image source={userInfo?.image ? { uri: userInfo.image } : require('../../assets/user.png')} style={styles.profileAvatar} /> */}
        </View>
        <Text style={styles.headerTitle}>{estate?.name}</Text>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate("AddContribution")}
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
        data={estateContributions}
        keyExtractor={(item) => item.docID}
        renderItem={({ item }) => {
          return (
            <View style={styles.transactionCard}>
              <View style={styles.details}>
                <View>
                  <Text style={styles.type}>{item.name}</Text>
                  <Text numberOfLines={2} style={styles.date}>
                    {item.description}
                  </Text>
                </View>
                {item?.paidUsers?.includes(userUID) ? (
                  <View
                    style={{
                      padding: Theme.sizes.xxs,
                      backgroundColor: Theme.colors.green,
                      borderRadius: 50,
                      paddingHorizontal: Theme.sizes.xs,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: Theme.sizes.xxs,
                    }}
                  >
                    <Text style={{ color: "white" }}>Paid</Text>
                    <FontAwesomeIcon icon={faCheck} size={16} color="white" />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Payment", { contribution: item })
                    }
                    style={{
                      padding: Theme.sizes.xxs,
                      backgroundColor: Theme.colors.primary,
                      borderRadius: 50,
                      paddingHorizontal: Theme.sizes.xs,
                    }}
                  >
                    <Text style={{ color: "white" }}>Pay</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.details}>
                <Text style={styles.amount}>₦{formatNum(item.amount)}</Text>
                <Text style={styles.date}>{formatTimeAgo(item.createdAt)}</Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight || (Platform.OS === "android" ? 25 : 0),
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
  transactionCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: Theme.sizes.sm,
    borderRadius: Theme.sizes.xs,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  type: {
    fontSize: Theme.sizes.lg,
    fontFamily: Theme.fonts.text700,
  },
  date: {
    fontSize: Theme.sizes.sm,
    color: "#666",
    marginTop: Theme.sizes.xxs,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    fontSize: Theme.sizes.md,
    fontFamily: Theme.fonts.text500,
    color: Theme.colors.green,
  },
});
