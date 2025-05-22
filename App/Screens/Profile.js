import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal, Dimensions } from 'react-native';
import { Theme } from '../Components/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faComment, faGear, faLanguage, faLocation, faLock, faPenToSquare, faRetweet, faSquarePlus, faThumbsUp, faUser, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { AppButton } from '../Components/AppButton';
import Carousel from 'react-native-reanimated-carousel';


const carouselLinks = [
    "https://img.freepik.com/free-photo/analog-landscape-city-with-buildings_23-2149661456.jpg?t=st=1747931856~exp=1747935456~hmac=b914d0e2ade5192add26c367c835c5d90ee3bc4de3dff3c1393c3ca5a78cb7d1&w=2000",
    "https://img.freepik.com/free-photo/new-home-keys-plan-table-with-defocused-couple_23-2148814388.jpg?ga=GA1.1.1029325747.1747931890&semt=ais_hybrid&w=740",
    "https://img.freepik.com/free-photo/bird-s-eye-view-shanghai_1127-4040.jpg?t=st=1747932294~exp=1747935894~hmac=42f2cb595e809b64e855317b1aa0a6e41314fc7bba4d02bb47788e755d2d61c6&w=2000",
    "https://img.freepik.com/free-photo/city-sunset_1127-4143.jpg?ga=GA1.1.1029325747.1747931890&semt=ais_hybrid&w=740",
]

const { width, height } = Dimensions.get("screen")

export function Profile({ navigation }) {
    const [visibility, setVisibility] = useState(false)


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.header, { backgroundColor: Theme.colors.primary }]}>
                    <Image source={{ uri: 'https://i.imgur.com/R66g1Pe.jpg' }} style={styles.avatar} />
                    <Text style={styles.username}>username@email.com</Text>
                </View>

                <View style={{ padding: 20 }}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}><Text style={styles.label}>Full Name:</Text> John Doe</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Phone:</Text> +123456789</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Email:</Text> username@email.com</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Address:</Text> 123 Street, City</Text>
                    </View>

                    <View style={[styles.iconRow, { marginTop: 20 }]}>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faLock} />
                            <Text >Change Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("EditProfile")}>
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
                            style={styles.carousel}
                            scrollAnimationDuration={2000}
                            renderItem={({ item }) => (
                                <Image
                                    style={{ height: 170, width: "100%", borderRadius: 15 }}
                                    source={{ uri: item }}
                                // defaultSource={require("../../assets/slide4.png")}
                                />
                            )}
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
                    transparent
                >
                    <View style={{ backgroundColor: "#000000ac", flex: 1, }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ backgroundColor: "#ffffff", padding: 20, paddingBottom: 30, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                            <Text>Log Out</Text>
                            <Text>Are you sure you want to log out of this app?</Text>
                            <AppButton onPress={() => setVisibility(false)}
                                style={{ marginTop: 50, borderWidth: 1, borderColor: Theme.colors.red }}
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