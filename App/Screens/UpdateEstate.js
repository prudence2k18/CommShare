import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StatusBar
} from "react-native"
import { Theme } from "../Components/Theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { AppContext } from "../Components/globalVariables";
import { ToastApp } from "../Components/Toast";
import { errorMessage } from "../Components/formatErrorMessage";
import AntDesign from '@expo/vector-icons/AntDesign';

export function UpdateEstate({ navigation, route }) {
    const { userUID, setPreloader, createdEstates } = useContext(AppContext)
    const estateID = route?.params?.docID
    const estate = createdEstates.find(item => item.docID == estateID)

    const [estateName, setEstateName] = useState(estate?.name || "");
    const [location, setLocation] = useState(estate?.location || "");
    const [description, setDescription] = useState(estate?.description || "");
    const [datereg, setDateReg] = useState(estate?.datereg || "");

    const handleCreateEstate = () => {
        if (!estateName || !location || !datereg) {
            Alert.alert("Missing Info", "Please fill in all required fields.");
            return;
        }

        setPreloader(true)
        updateDoc(doc(db, "estates", estateID), {
            name: estateName,
            location,
            description,
            datereg,
        }).then(() => {
            ToastApp("Estate updated successfully.");
            setEstateName("");
            setLocation("");
            setDescription("");
            setDateReg("");
            setPreloader(false)

            navigation.goBack();
        })
            .catch((error) => {
                console.log("Error signing up:", error);
                setPreloader(false)
                Alert.alert("Sign Up Error", errorMessage(error.code));
            });
    };

    function handleDelete() {
        Alert.alert(
            "Delete Estate",
            "Are you sure you want to delete this estate? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setPreloader(true);
                        updateDoc(doc(db, "estates", estateID), {
                            deleted: true,
                        }).then(() => {
                            ToastApp("Estate deleted successfully.");
                            setPreloader(false);
                            // navigation.goBack();
                            // navigation.goBack();

                            // navigation.pop(2); // Go back two screens to return to the estates list
                            navigation.navigate("HomeScreen", { screen: "Estate Groups" });
                        })
                            .catch((error) => {
                                console.log("Error deleting estate:", error);
                                setPreloader(false);
                                Alert.alert("Error", errorMessage(error.code));
                            });
                    },
                },
            ],
        );
    }

    return (
        <ScrollView style={{ backgroundColor: "white", flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text style={styles.headerText}>Update Your Estate</Text>

                <TouchableOpacity onPress={handleDelete} style={styles.delete}>
                    <AntDesign name="delete" size={25} color={Theme.colors.red} />
                </TouchableOpacity>

                <View style={styles.form}>
                    <Text style={styles.label}>Estate Name *</Text>
                    <TextInput
                        style={styles.input}
                        value={estateName}
                        onChangeText={setEstateName}
                        placeholder="e.g., Sunrise Villas"
                    />

                    <Text style={styles.label}>Location *</Text>
                    <TextInput
                        style={styles.input}
                        value={location}
                        onChangeText={setLocation}
                        placeholder="e.g., Lagos, Nigeria"
                    />
                    <Text style={styles.label}>Date registered *</Text>
                    <TextInput
                        style={styles.input}
                        value={datereg}
                        onChangeText={setDateReg}
                        placeholder="DD / MM / YY"
                    />

                    <Text style={styles.label}>Description </Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Optional details about the estate"
                        multiline
                        numberOfLines={4}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleCreateEstate}>
                        <Text style={styles.buttonText}>Update Details</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerImage: {
        flex: 1,
        width: "100%",
        height: "100%",

    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: "100%",
        borderWidth: 0,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 25,
        fontFamily: Theme.fonts.text700,
        textAlign: "center",
        marginTop: 35
    },
    form: {
        padding: 20,
        paddingTop: 35,
        backgroundColor: "#ffffff99",
        flexGrow: 1,
        fontFamily: Theme.fonts.text400,
        borderRadius: 20,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        gap: 5,
        height: "100%",
    },
    label: {
        fontSize: Theme.sizes.md,
        fontWeight: "600",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: Theme.colors.primary,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: Theme.colors.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: Theme.sizes.lg,
        fontFamily: Theme.fonts.text700,
    },
    delete: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
        backgroundColor: "#ffffff99",
        padding: 10,
        borderRadius: 50,
    },
});