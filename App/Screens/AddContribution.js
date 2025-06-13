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
} from "react-native"
import { Theme } from "../Components/Theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { AppContext } from "../Components/globalVariables";
import { ToastApp } from "../Components/Toast";
import { errorMessage } from "../Components/formatErrorMessage";

export function AddContribution({ navigation }) {
    const { userUID, setPreloader, createdEstates, docID } = useContext(AppContext)
    const estate = createdEstates.find(item => item.docID == docID);

    const [conName, setConName] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [datereg, setDateReg] = useState("");


    const handleCreateEstate = () => {
        if (!conName || !amount || !description) {
            Alert.alert("Missing Info", "Please fill in all required fields.");
            return;
        }

        console.log(amount);


        setPreloader(true)
        addDoc(collection(db, "contributions"), {
            name: conName,
            description,
            estateName: estate?.name,
            estateID: estate?.docID,
            amount: Number(amount),
            paidUsers: [],
            createdAt: Date.now(),
            createdBy: userUID,
        }).then(() => {
            ToastApp("Contribution created successfully.");
            setConName("");
            setDescription("");
            setAmount(0);
            setPreloader(false)

            navigation.goBack();
        })
            .catch((error) => {
                console.log("Error signing up:", error);
                setPreloader(false)
                Alert.alert("Sign Up Error", errorMessage(error.code));
            });
    };

    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <Text style={styles.headerText}>Create a Contribution</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Contribution Name *</Text>
                <TextInput
                    style={styles.input}
                    value={conName}
                    onChangeText={setConName}
                    placeholder="e.g., Sunrise Villas"
                />

                <Text style={styles.label}>Amount *</Text>
                <TextInput
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="e.g., Lagos, Nigeria"
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
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {

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
        fontWeight: "bold",
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
});