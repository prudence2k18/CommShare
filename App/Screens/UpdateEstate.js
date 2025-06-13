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
    Image
} from "react-native"
import { Theme } from "../Components/Theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from "../../Firebase/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../Components/globalVariables";
import { ToastApp } from "../Components/Toast";
import { errorMessage } from "../Components/formatErrorMessage";
import AntDesign from '@expo/vector-icons/AntDesign';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export function UpdateEstate({ navigation, route }) {
    const { userUID, setPreloader, createdEstates } = useContext(AppContext);
    const estateID = route?.params?.docID;
    const estate = createdEstates.find(item => item.docID == estateID);

    const [estateName, setEstateName] = useState(estate?.name || "");
    const [location, setLocation] = useState(estate?.location || "");
    const [description, setDescription] = useState(estate?.description || "");
    const [datereg, setDateReg] = useState(estate?.datereg || "");
    const [image, setImage] = useState(estate?.image || null);

    async function pickImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission required", "Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    async function uploadImageToFirebase(imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const filename = `estates/${userUID}/images${Date.now()}.jpg`;
        const imageRef = ref(storage, filename);
        await uploadBytes(imageRef, blob);
        return await getDownloadURL(imageRef);
    }

    const handleCreateEstate = async () => {
        if (!estateName || !location) {
            Alert.alert("Missing Info", "Please fill in all required fields.");
            return;
        }

        setPreloader(true);

        try {
            let finalImageURL = estate.image;

            if (image && image !== estate.image && !image.startsWith("https://")) {
                finalImageURL = await uploadImageToFirebase(image);
            }

            await updateDoc(doc(db, "estates", estateID), {
                name: estateName,
                location,
                description,
                datereg,
                image: finalImageURL,
            });

            ToastApp("Estate updated successfully.");
            setPreloader(false);
            navigation.goBack();
        } catch (error) {
            console.log("Error updating estate:", error);
            setPreloader(false);
            Alert.alert("Update Error", errorMessage(error.code));
        }
    };

    function handleDelete() {
        Alert.alert(
            "Delete Estate!",
            "Are you sure you want to delete this estate? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setPreloader(true);
                        deleteDoc(doc(db, "estates", estateID))
                            .then(() => {
                                ToastApp("Estate deleted successfully.");
                                setPreloader(false);
                                navigation.navigate("HomeScreen", { screen: "Estates" });
                            })
                            .catch((error) => {
                                setPreloader(false);
                                console.log("Error deleting estate:", error);
                                Alert.alert("Delete Error", errorMessage(error.code));
                            });
                    },
                },
            ]
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
                    {image ? (
                        <View style={styles.selectedImageContainer}>
                            <Image source={{ uri: image }} style={styles.selectedImage} />
                            <TouchableOpacity
                                onPress={() => setImage(null)}
                                style={styles.removeImageButton}
                            >
                                <FontAwesomeIcon icon={faTimes} size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                            <Text style={styles.imagePickerText}>Select Estate Image</Text>
                        </TouchableOpacity>
                    )}

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

                    <Text style={styles.label}>Description</Text>
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
    delete: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
        backgroundColor: "#ffffff99",
        padding: 10,
        borderRadius: 50,
    },
    headerText: {
        fontSize: 25,
        fontFamily: Theme.fonts.text700,
        textAlign: "center",
        marginTop: 35,
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
    selectedImageContainer: {
        marginTop: 12,
        position: "relative",
    },
    selectedImage: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        resizeMode: "cover",
    },
    removeImageButton: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    imagePicker: {
        backgroundColor: Theme.colors.layer,
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        marginBottom: 15,
    },
    imagePickerText: {
        color: Theme.colors.text2,
        fontSize: Theme.sizes.md,
        fontFamily: Theme.fonts.text400,
    },
});