import React, { useContext, useEffect } from "react";
import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    Dimensions,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Theme } from "../Components/Theme";
import { AppContext } from "../Components/globalVariables";
import AntDesign from '@expo/vector-icons/AntDesign';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Settings";


const { width, height } = Dimensions.get("screen")

export function Estate({ navigation, route }) {
    const { userUID, setPreloader, setEstateContributions, estateContributions, estate } = useContext(AppContext);

    const options = [
        { id: "0", title: "Residents", description: "View and contribute funds", icon: "users", screen: "Residents", count: estate.users.length },// view balance, payment plans, account details and pay in, only admin can pay out
        { id: "1", title: "Contributions", description: "View and contribute funds", icon: "hand-holding-usd", screen: "Contributions", count: estateContributions.length },// view balance, payment plans, account details and pay in, only admin can pay out
        { id: "2", title: "Fuel Pool", description: "Track diesel/fuel purchases", icon: "gas-pump", screen: null, count: 0 },
        { id: "3", title: "Electricity", description: "Monitor Power costs", icon: "bolt", screen: null, count: 0 },
        { id: "4", title: "Security", description: "See guard schedules", icon: "shield-alt", screen: null, count: 0 },
        { id: "5", title: "Voting & Polls", description: "Vote on resource use", icon: "poll", screen: null, count: 0 },
        { id: "6", title: "Chat", description: "Discuss with members", icon: "comments", screen: null, count: 0 }, //only admin can drop updates, view all list of esate member have a bell icon in front of name for reminding them 
        { id: "7", title: "Dashboard", description: "View community metrics", icon: "chart-pie", screen: null, count: 0 },
    ];

    const transactions = [
        {
            id: "1",
            transactionType: "Fuel Contribution",
            transactionDate: "2025-05-10T14:32:00Z",
            amount: 5000,
            status: "Completed",
        },
        {
            id: "2",
            transactionType: "Electricity Top-Up",
            transactionDate: "2025-05-08T09:15:00Z",
            amount: 2500,
            status: "Completed",
        },
        {
            id: "3",
            transactionType: "Security Levy",
            transactionDate: "2025-05-05T18:45:00Z",
            amount: 1500,
            status: "Pending",
        },
        {
            id: "4",
            transactionType: "Maintenance Fund",
            transactionDate: "2025-04-30T11:20:00Z",
            amount: 3000,
            status: "Failed",
        },
        {
            id: "5",
            transactionType: "Withdrawal Request",
            transactionDate: "2025-04-28T16:00:00Z",
            amount: 4000,
            status: "Completed",
        },
    ];

    useEffect(() => {
        setPreloader(true);

        const ref = collection(db, "contributions");
        const q = query(ref, where("estateID", "==", estate?.docID));
        onSnapshot(q, (users) => {
            const qd = [];
            users.forEach(item => {
                qd.push({ ...item.data(), docID: item.id })
            })
            setPreloader(false);
            setEstateContributions(qd);
        }, (error) => {
            setPreloader(false);
            Alert.alert("Error", "Failed to fetch contributions. Please try again later.");
        });
    }, [estate?.docID]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "green";
            case "Pending":
                return "orange";
            case "Failed":
                return "red";
            default:
                return "#000";
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{estate?.name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("UpdateEstate", { docID: estate?.docID })}>
                    <Image source={estate?.image ? { uri: estate?.image } : require("../../assets/icon.png")} style={styles.img} />
                    <View style={styles.editIcon}>
                        <AntDesign name="edit" size={15} color="white" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Option Cards */}
            <View style={styles.optionContainer}>
                {options.map((opt) => (
                    <TouchableOpacity onPress={() => opt.screen && navigation.navigate(opt.screen, { docID: estate?.docID })} style={styles.card} key={opt.id}>
                        <View style={styles.iconWrapper}>
                            <Icon name={opt.icon} size={24} color={Theme.colors.primary} />
                        </View>
                        <View style={styles.cardText}>
                            <Text style={styles.cardTitle}>{opt.title}</Text>
                            <Text style={styles.cardDesc}>{opt.description}</Text>
                        </View>
                        {/* Badge */}
                        {opt.count > 0 && <View style={{ backgroundColor: Theme.colors.greenDark, borderRadius: 20, width: 25, height: 25, justifyContent: "center", alignItems: "center", position: "absolute", right: 0, top: 0 }}>
                            <Text style={{ color: "white", fontFamily: Theme.fonts.text500 }}>{opt.count}</Text>
                        </View>}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Transaction Header */}
            <View style={styles.transactionsHeader}>
                <Text style={styles.transactionsTitle}>Recent Transactions</Text>
                <TouchableOpacity onPress={() => console.log("View all pressed")}>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>

            {/* Transaction Cards */}
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {transactions.map((tran, index) => (
                        <View
                            key={tran.id}
                            style={[
                                styles.transactionCard,
                                index === 0 && { marginLeft: 0 },
                                index === transactions.length - 1 && { marginRight: 16 },
                            ]}
                        >
                            <View>
                                <Text style={styles.type}>{tran.transactionType}</Text>
                                <Text style={styles.date}>
                                    {new Date(tran.transactionDate).toLocaleDateString()}
                                </Text>
                            </View>
                            <View style={styles.details}>
                                <Text style={styles.amount}>₦{tran.amount}</Text>
                                <Text style={[styles.status, { color: getStatusColor(tran.status) }]}>
                                    {tran.status}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        left: -10,
        backgroundColor: Theme.colors.primary,
        borderRadius: 20,
        padding: 5,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center",
    },
    header: {
        fontSize: Theme.sizes.xl,
        fontFamily: Theme.fonts.text600
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    optionContainer: {
        flexWrap: "wrap",
        // justifyContent: "center",
        flexDirection: "row",
        marginTop: Theme.sizes.xs,
        marginHorizontal: Theme.sizes.xs,
        columnGap: Theme.sizes.xs,
    },
    card: {
        flexBasis: (width / 2) - 19,
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Theme.sizes.md,
        backgroundColor: "#fff",
        padding: Theme.sizes.sm,
        borderRadius: Theme.sizes.xs,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: Theme.sizes.xxs,
        elevation: 2,
    },
    iconWrapper: {
        marginRight: Theme.sizes.xs,
    },
    cardText: {
        flex: 1,
    },
    cardTitle: {
        fontSize: Theme.sizes.lg,
        fontWeight: "600",
        marginBottom: Theme.sizes.xxs,
    },
    cardDesc: {
        fontSize: Theme.sizes.xs,
        color: "#666",
    },
    transactionsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Theme.sizes.lg,
        marginTop: Theme.sizes.xs,
        marginBottom: Theme.sizes.xxs,
    },
    transactionsTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    viewAll: {
        fontSize: 14,
        color: "#007bff",
    },
    scrollContainer: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    transactionCard: {
        width: width * 60 / 100,
        flex: 1,
        backgroundColor: "#fff",
        padding: Theme.sizes.sm,
        borderRadius: Theme.sizes.xs,
        marginRight: Theme.sizes.sm,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    type: {
        fontSize: Theme.sizes.lg,
        fontWeight: "600",
    },
    date: {
        fontSize: Theme.sizes.sm,
        color: "#666",
        marginTop: Theme.sizes.xxs,
    },
    details: {
        marginTop: Theme.sizes.xs,
    },
    amount: {
        fontSize: Theme.sizes.lg,
        fontWeight: "bold",
    },
    status: {
        fontSize: Theme.sizes.md,
        marginTop: 4,
    },
});