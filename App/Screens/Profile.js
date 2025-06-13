import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal, Dimensions } from 'react-native';
import { Theme } from '../Components/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faComment, faGear, faLanguage, faLocation, faLock, faPenToSquare, faRetweet, faSquarePlus, faThumbsUp, faUser, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { AppButton } from '../Components/AppButton';
import Carousel from 'react-native-reanimated-carousel';
import { AppContext } from '../Components/globalVariables';


const carouselLinks = [
    "https://img.freepik.com/free-photo/analog-landscape-city-with-buildings_23-2149661456.jpg?t=st=1747931856~exp=1747935456~hmac=b914d0e2ade5192add26c367c835c5d90ee3bc4de3dff3c1393c3ca5a78cb7d1&w=2000",
    "https://img.freepik.com/free-photo/new-home-keys-plan-table-with-defocused-couple_23-2148814388.jpg?ga=GA1.1.1029325747.1747931890&semt=ais_hybrid&w=740",
    "https://img.freepik.com/free-photo/bird-s-eye-view-shanghai_1127-4040.jpg?t=st=1747932294~exp=1747935894~hmac=42f2cb595e809b64e855317b1aa0a6e41314fc7bba4d02bb47788e755d2d61c6&w=2000",
    "https://img.freepik.com/free-photo/city-sunset_1127-4143.jpg?ga=GA1.1.1029325747.1747931890&semt=ais_hybrid&w=740",
]

const { width, height } = Dimensions.get("screen")

export function Profile({ navigation }) {
    const { userUID, userInfo } = useContext(AppContext)

    const [visibility, setVisibility] = useState(false)


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.header, { backgroundColor: Theme.colors.primary }]}>
                    <Image source={userInfo?.image ? { uri: userInfo.image } : require('../../assets/user.png')} style={styles.avatar} />
                    <Text style={styles.username}>{userInfo.email}</Text>
                </View>

                <View style={{ padding: 20 }}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}><Text style={styles.label}>Full Name:</Text> {userInfo.firstname} {userInfo.lastname}</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Phone:</Text> {userInfo.phone || "-"}</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Email:</Text> {userInfo.email}</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Address:</Text> {userInfo.address || "-"}</Text>
                    </View>

                    <View style={[styles.iconRow, { marginTop: 20 }]}>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faLock} />
                            <Text >Change Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={styles.iconBox}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <Text style={styles.iconLabel}>Edit Profile</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faUserXmark} />
                            <Text style={styles.iconLabel}>Delete Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faAddressBook} />
                            <Text style={styles.iconLabel}>Contact Us</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faSquarePlus} />
                            <Text style={styles.iconLabel}>Create Estate</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faLanguage} />
                            <Text style={styles.iconLabel}>Language</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                        <Carousel
                            loop
                            width={width - 40}
                            height={170}
                            autoPlay={true}
                            data={carouselLinks}
                            // style={}
                            scrollAnimationDuration={2000}
                            renderItem={({ item }) => {
                                return (
                                    <Image source={{ uri: item }}
                                        style={{ width: "100%", height: 170, borderRadius: 15 }}
                                    />
                                )
                            }}
                        />
                    </View>

                    <AppButton onPress={() => setVisibility(true)}
                        style={{ marginTop: 10, borderWidth: 1, borderColor: Theme.colors.red }}
                        textColor={Theme.colors.red}
                        buttonColor={"transparent"}>Log Out</AppButton>
                </View>

                <Modal
                    visible={visibility}
                    animationType='slide'
                    // style={}
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "#000000c8" }}>
                        <TouchableOpacity onPress={() => setVisibility(false)} style={{ flex: 1 }}></TouchableOpacity>
                        <View style={{ backgroundColor: "#ffffffc8", padding: 20, paddingBottom: 40, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <Text style={{ textAlign: "center", fontSize: 25 }}>Log out!</Text>
                            <Text style={{ textAlign: "center" }}>Are you sure you want to log out?</Text>
                            <AppButton onPress={() => { setVisibility(false); navigation.navigate("LogIn") }}
                                style={{ marginTop: 20, borderWidth: 1, borderColor: Theme.colors.red }}
                                textColor={Theme.colors.red}
                                buttonColor={"transparent"}>Yes</AppButton>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // paddingVertical: 40,
        backgroundColor: '#fff',
        // flex: 1,
    },
    header: {
        alignItems: 'center',

        width: '100%',
        paddingVertical: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
    username: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        gap: 20
    },
    iconBox: {
        alignItems: 'center',
        justifyContent: "center",
        paddingVertical: 20,
        height: 90,
        backgroundColor: '#ecf0f1',
        borderRadius: 15,
        flex: 1
    },
    iconLabel: {
        fontSize: 14,
        color: '#333',
    },
    infoBox: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        marginTop: 10
    },
    infoText: {
        fontSize: 16,
        marginVertical: 5,
    },
    label: {
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: '#27ae60',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginTop: 20,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});