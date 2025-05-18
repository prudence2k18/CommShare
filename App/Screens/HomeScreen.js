import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Theme } from "../Components/Theme";
import Modal from "react-native-modal";

export function HomeScreen({ navigation }) {
  // const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const BackgroundImg =
    "https://img2.joyreactor.com/pics/post/photo-village-night-805292.jpeg";
  const HeaderImg =
    "https://static.vecteezy.com/system/resources/thumbnails/021/379/802/small_2x/circle-of-houses-figures-build-buy-or-sell-real-estate-construction-project-buildings-and-architecture-housing-and-urbanization-real-estate-market-eco-friendly-community-of-homeowners-photo.jpg";

  const estates = [
    { id: 1, name: "Sunset Villas", location: "California" },
    { id: 2, name: "Palm Heights", location: "Florida" },
    { id: 3, name: "Maple Residences", location: "Toronto" },
  ];

  const toggleMenuVisable = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <ImageBackground
      source={{ uri: BackgroundImg }}
      style={styles.fullScreenBackground}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: HeaderImg }}
          style={styles.headerImage}
          resizeMode="cover"
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Intro")}
            style={styles.backIcon}
          >
            <Icon name="arrow-left" size={Theme.sizes.icon.md} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleMenuVisable} style={styles.menuIcon}>
            <Icon name="bars" size={Theme.sizes.icon.md} color={Theme.colors.gray} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-evenly",
              paddingBottom: 10,
              backgroundColor: "#00000040",
            }}
          >

            <Text style={[styles.imageTitle, { color: Theme.colors.primary }]}>
              Welcome to
              <Text
                style={{
                  fontFamily: Theme.fonts.brand,
                  color: Theme.colors.yellow,
                  fontSize: Theme.sizes.xxl,
                }}
              >
                {"  "}
                CommShare
              </Text>
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.bodyContent}>
            <Text style={styles.headerName}>Estate Groups 🏡</Text>

            <FlatList
              data={estates}
              contentContainerStyle={{ paddingBottom: 40 }}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.subtitle}>{item.location}</Text>
                </View>
              )}
            />
          </View>

          <Modal visible={menuVisible} animationType="slide">
            <View style={styles.sideMenu}>

              <TouchableOpacity
                onPress={toggleMenuVisable}
                style={styles.closeIcon}
              >
                <Icon name="close" size={27} color="#333" />
              </TouchableOpacity>

              {[
                "Profile",
                "DashBoard",
                "CreateEstate",
                "EditProfile",
                "DeleteAccount",
              ].map((screen, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    navigation.navigate(screen) || setMenuVisible(false);
                  }}
                >
                  <Text style={styles.menuText}>{screen}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: 'rgba(207, 195, 195, 0.8)',
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  TopIcons: {
    position: "absolute",
    left: 0,
    right: 0,
    padding: 10,
  },
  backIcon: {
    position: "absolute",
    top: 10,
    left: 20,
    padding: 10,
  },
  menuIcon: {
    position: "absolute",
    top: 10,
    right: 20,
    padding: 10,
  },
  headerImage: {
    height: 200,
    justifyContent: "flex-end",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",  //*/////////////
  },
  headerName: {
    fontSize: 31,
    // fontWeight: "bold",
    color: Theme.colors.yellow,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: Theme.fonts.text700,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 15,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
    borderLeftWidth: 5,
    borderLeftColor: Theme.colors.primary,
  },
  title: {
    fontSize: 20,
    color: "#333",
    fontWeight: "600",
    fontFamily: Theme.fonts.text400,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    fontFamily: Theme.fonts.text400,
  },
  bodyContent: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 20,
    backgroundColor: "transparent",
  },
  appName: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FF6F61",
    letterSpacing: 1.5,
    fontStyle: "italic",
    textShadowColor: "#FFA07A",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  overlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sideMenu: {
    flex: 1,
    width: "100%",
    backgroundColor: Theme.colors.bg,
    paddingTop: 60,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 18,
    color: "#333",
    fontFamily: Theme.fonts.text400,
  },
  closeIcon: {
  position: 'absolute',
  top: 20,
  right: 30,

  },
  imageWrapper: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  imageTitle: {
    fontSize: Theme.sizes.xxl,
    fontFamily: Theme.fonts.text700,
    color: "#fff",
    padding: Theme.sizes.padding,
  },
});
