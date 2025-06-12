import React, { useContext, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { Theme } from "../Components/Theme";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Profile } from "./Profile";
import GroupList from "./GroupList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppContext } from "../Components/globalVariables";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Settings";

const recentTransactions = [
  {
    id: "1",
    estate: "Green Valley Estate",
    service: "Security Fee",
    amount: "₦15,000",
    date: "Today, 10:45 AM",
    icon: "shield",
  },
  {
    id: "2",
    estate: "Sunrise Apartments",
    service: "Maintenance",
    amount: "₦8,500",
    date: "Yesterday, 2:30 PM",
    icon: "wrench",
  },
  {
    id: "3",
    estate: "Sunrise Apartments",
    service: "Electricity Bill",
    amount: "₦12,000",
    date: "Oct 12, 9:15 AM",
    icon: "bolt",
  },
  {
    id: "4",
    estate: "Sunrise Apartments",
    service: "Electricity Bill",
    amount: "₦12,000",
    date: "Oct 12, 9:15 AM",
    icon: "bolt",
  },
];

const username = "John Doe";
const totalTransactions = 24;
const totalAmount = "₦1,156,800,400";
const joinedEstates = 3;

function Home({ navigation }) {
  const { userUID, userInfo, setUserInfo, setCreatedEstates, createdEstates,
        communities, setCommunities,
    } = useContext(AppContext);

    function fetchCreatedEstates() {
        const ref = collection(db, "estates");
        const q = query(ref, where("createdBy", "==", userUID));
        onSnapshot(q, (snapshot) => {
            const qd = [];
            snapshot.forEach(item => {
                qd.push({ ...item.data(), docID: item.id })
            })
            // console.log(JSON.stringify(qd, null, 2));
            setCreatedEstates(qd.sort((a, b) => b.createdAt - a.createdAt));
        })
    }

    function fetchCommunities() {
        const ref = collection(db, "estates");
        const q = query(ref, where("users", "array-contains", userUID));
        onSnapshot(q, (snapshot) => {
            const qd = [];
            snapshot.forEach(item => {
                qd.push({ ...item.data(), docID: item.id })
            })
            // console.log(JSON.stringify(qd, null, 2));
            setCommunities(qd);
        })
    }

  useEffect(() => {
    // getDoc(doc(db, "users", userUID))
    //     .then(user => {
    //         setUserInfo(user.data())
    //     })

    onSnapshot(doc(db, "users", userUID), (user) => {
      setUserInfo(user.data());
    });
    fetchCreatedEstates()
    fetchCommunities()
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={userInfo?.image ? { uri: userInfo.image } : require('../../assets/user.png')}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.greetingText}>
                Hi, {userInfo?.firstname}{" "}
                {userInfo?.lastname}
              </Text>
              <Text style={styles.welcomeText}>Welcome to Commshare</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.inboxIcon} onPress={() => navigation.navigate("Payment")}>
            <FontAwesome
              name="inbox"
              size={Theme.sizes.icon.md}
              color={Theme.colors.text1}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.summaryCard}>
          <Text style={styles.sectionHeader}>Transaction Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{totalTransactions}</Text>
              <Text style={styles.summaryLabel}>Total Transactions</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{totalAmount}</Text>
              <Text style={styles.summaryLabel}>Total Amount</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Estates')}
        >
          <View style={styles.cardContent}>
            <View>
              <View style={styles.sectionTitleRow}>
              <Text style={styles.cardTitle}>Created Estate Groups</Text>
              <Text style={styles.estateCount}> ({createdEstates.length})</Text>
              </View>
              <Text style={styles.cardSubtext}>
                Manage or create estate groups
              </Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={Theme.sizes.icon.md}
              color={Theme.colors.text2}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate("Communities") }} style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.cardTitle}>Your Communities</Text>
                <Text style={styles.estateCount}> ({communities.length})</Text>
              </View>
              <Text style={styles.cardSubtext}>Tap to view details</Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={Theme.sizes.icon.md}
              color={Theme.colors.text2}
            />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <FlatList
          style={styles.transactionContainer}
          scrollEnabled={true}
          data={recentTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <View style={styles.transactionIconContainer}>
                <FontAwesome
                  name={item.icon}
                  size={Theme.sizes.icon.xs}
                  color={Theme.colors.primary}
                />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.estateName}>{item.estate}</Text>
                <Text style={styles.serviceName}>{item.service}</Text>
              </View>
              <View style={styles.transactionAmountDate}>
                <Text style={styles.amountText}>{item.amount}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();
export function HomeScreen() {
  const { userInfo } = useContext(AppContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "speedometer" : "speedometer-outline";
          } else if (route.name === "Assets") {
            iconName = focused ? "diamond" : "diamond-outline";
          } else if (route.name === "Estates") {
            iconName = focused ? "business" : "business-outline";
          } else if (route.name === "ShareUnit") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={28} color={color} />;
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: "Dashboard" }}
      />
      <Tab.Screen name="Estates" component={GroupList} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: `${userInfo.firstname}` }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bg,
    padding: Theme.sizes.padding,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // gap: Platform.select({
    //   ios: Theme.sizes.xxs -4
    // }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.sizes.sm,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: Theme.sizes.xs * 4,
    height: Theme.sizes.xs * 4,
    borderRadius: Theme.sizes.xxl,
    marginRight: Theme.sizes.sm,
  },
  greetingText: {
    fontSize: Theme.sizes.md + 1,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.text1,
  },
  welcomeText: {
    fontSize: Theme.sizes.md,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
  },
  inboxIcon: {
    padding: Theme.sizes.xs,
  },
  card: {
    backgroundColor: Theme.colors.layer,
    borderRadius: Theme.sizes.sm,
    padding: Theme.sizes.padding,
    marginBottom: Theme.sizes.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryCard: {
    backgroundColor: Theme.colors.greenLight,
    borderRadius: Theme.sizes.sm,
    padding: Theme.sizes.padding,
    marginBottom: Theme.sizes.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: Theme.sizes.lg,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.text1,
    marginBottom: Theme.sizes.xxs,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    alignItems: "center",
    flex: 0.48,
  },
  summaryNumber: {
    fontSize: Theme.sizes.xl,
    fontFamily: Theme.fonts.text700,
    color: Theme.colors.primary,
    marginBottom: Theme.sizes.xxs - 2,
  },
  summaryLabel: {
    fontSize: Theme.sizes.md,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
  },
  verticalDivider: {
    width: 1,
    height: "80%",
    backgroundColor: Theme.colors.line,
    alignSelf: "center",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: Theme.sizes.lg,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.text1,
    marginBottom: Theme.sizes.xxs,
  },
  cardSubtext: {
    fontSize: Theme.sizes.md,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
  },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: Theme.sizes.lg + 1,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.text1,
    // marginBottom: Platform.select({
    //   ios: Theme.sizes.xs -3
    // }),
  },
  estateCount: {
    fontSize: Theme.sizes.lg,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.green,
    marginRight: Theme.sizes.icon.sm * 3,
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Theme.sizes.md,
    paddingHorizontal: Theme.sizes.xxs,
    marginBottom: Theme.sizes.sm,
    backgroundColor: Theme.colors.layer,
    borderWidth: Theme.sizes.xxs - 3,
    borderColor: Theme.colors.line,
    borderRadius: Theme.sizes.xl,
    gap: Platform.select({
      ios: Theme.sizes.xs,
    }),
  },

  transactionContainer: {
    marginTop: Theme.sizes.xxs,
  },
  transactionIconContainer: {
    backgroundColor: "rgba(72, 207, 173, 0.1)",
    width: Theme.sizes.xs * 4,
    height: Theme.sizes.xs * 4,
    borderRadius: Theme.sizes.xxl,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Theme.sizes.sm,
  },
  transactionDetails: {
    flex: 1,
  },
  estateName: {
    fontSize: Theme.sizes.lg,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.text1,
    marginBottom: Theme.sizexxx - 3,
  },
  serviceName: {
    fontSize: Theme.sizes.md,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
  },
  transactionAmountDate: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: Theme.sizes.lg,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.primary,
    marginBottom: Theme.sizexxx - 3,
  },
  dateText: {
    fontSize: Theme.sizes.sm,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
  },
});

/*transactionCard: {
    backgroundColor: Theme.colors.layer,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },*/

/* sizes: {
        xxs: normalize(5),
        xs: normalize(10),
        sm: normalize(12),
        md: normalize(14),
        lg: normalize(16),
        xl: normalize(18),
        xxl: normalize(22),
        icon: {
            xs: normalize(16),
            sm: normalize(20),
            md: normalize(24),
            lg: normalize(32),
        },
        padding: normalize(16),
        borderRadius: normalize(8),
    },*/
