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
import { db, storage } from "../../Firebase/Settings";
import { AppContext } from "../Components/globalVariables";
import { ToastApp } from "../Components/Toast";
import { errorMessage } from "../Components/formatErrorMessage";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export function CreateEstate({ navigation }) {
    const { userUID, setPreloader } = useContext(AppContext)
    const [image, setImage] = useState(null);
    const [estateName, setEstateName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [datereg, setDateReg] = useState("");

    const estcreatepic = "https://static.vecteezy.com/system/resources/previews/047/072/042/non_2x/a-colorful-illustration-depicting-a-bustling-city-construction-scene-with-cranes-and-new-buildings-under-a-sunny-sky-free-vector.jpg"

    async function pickImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        // if (!permissionResult.granted) {
        //     Alert.alert("Permission required", "Permission to access camera roll is required!");
        //     return;
        // }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            // console.log(JSON.stringify(result, null, 2));
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
        setPreloader(true)

        try {
            const uploadedUrl = await uploadImageToFirebase(image);

            addDoc(collection(db, "estates"), {
                name: estateName,
                location,
                description,
                image: uploadedUrl,
                createdAt: Date.now(),
                createdBy: userUID,
                users: [],
            }).then(() => {
                ToastApp("Estate created successfully.");
                setEstateName("");
                setLocation("");
                setDescription("");
                setDateReg("");
                setPreloader(false)

                navigation.goBack();
            })

        } catch (error) {
            console.error("Error uploading image:", error);
            Alert.alert("Image Upload Error", "There was an error uploading the image. Please try again.");
            return;

        }

    };

    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <ImageBackground source={{ uri: estcreatepic }}
                style={styles.headerImage}>
                <View style={styles.header}>
                </View>
            </ImageBackground>
            <Text style={styles.headerText}>🏡 Create New Estate Group</Text>
            <View style={styles.form}>
                {image ?
                    <View style={styles.selectedImageContainer}>
                        <Image source={{ uri: image }} style={styles.selectedImage} />
                        <TouchableOpacity onPress={() => setImage(null)} style={styles.removeImageButton}>
                            <FontAwesomeIcon icon={faTimes} size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                        <Text style={styles.imagePickerText}>Select Estate Image</Text>
                    </TouchableOpacity>
                }
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
                {/* <Text style={styles.label}>Date registered *</Text>
                <TextInput
                    style={styles.input}
                    value={datereg}
                    onChangeText={setDateReg}
                    placeholder="DD / MM / YY"
                /> */}

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
                    <Text style={styles.buttonText}>Submit Details</Text>
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
        color: Theme.colors.red,
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
    selectedImageContainer: {
        marginTop: 12,
        position: 'relative',
    },
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    removeImageButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
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