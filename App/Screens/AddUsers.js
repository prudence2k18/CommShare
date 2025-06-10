import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Theme } from '../Components/Theme'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../Firebase/Settings'
import { errorMessage } from '../Components/formatErrorMessage'
import { ActivityIndicator } from 'react-native-paper'
import { AppContext } from '../Components/globalVariables'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

const validation = Yup.object({
    email: Yup.string().email().required(),
})

export function AddUsers({ navigation, route }) {
    const { setUserUID, setPreloader, createdEstates, docID } = useContext(AppContext)

    const estate = createdEstates.find(item => item.docID == docID)

    function fetchCreatedEstates(email) {
        setPreloader(true);

        const ref = collection(db, "users");
        const q = query(ref, where("email", "==", email));
        getDocs(q,).then((users) => {
            const qd = [];
            users.forEach(item => {
                qd.push({ ...item.data(), userUID: item.id })
            })
            setPreloader(false);
            if (qd.length > 0) {
                // const user = qd[0];
                // if (user.createdEstates.includes(docID)) {
                // Alert.alert("User Already Added", "This user is already part of this estate.");
                // }
                if (estate?.users?.includes(qd[0]?.userUID)) {
                    Alert.alert("User Already Added", "This user is already part of this estate.");
                } else {
                    Alert.alert("User found", `Do you want to add ${qd[0]?.firstname} ${qd[0]?.lastname} to this estate?`,
                        [
                            {
                                text: "Cancel",
                                style: "cancel"
                            },
                            {
                                text: "Add User",
                                onPress: () => {
                                    setPreloader(true);
                                    const estateRef = doc(db, "estates", docID);
                                    estate.users.push(qd[0]?.userUID);
                                    updateDoc(estateRef, { users: estate.users })
                                        .then(() => {
                                            setPreloader(false);
                                            Alert.alert("User Added", `${qd[0]?.firstname} ${qd[0]?.lastname} has been added to the estate.`);
                                            navigation.goBack();
                                        })
                                        .catch((error) => {
                                            setPreloader(false);
                                            Alert.alert("Error", errorMessage(error.code));
                                        });
                                }
                            }
                        ]
                    );

                }

            } else {
                Alert.alert("User Not Found", "No user found with this email.");
            }
        })
            .catch((error) => {
                setPreloader(false);
                Alert.alert("Error", errorMessage(error.code));
            });
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Add Users</Text>
                <Text style={styles.subtitle}>Add more users to this estate ({estate?.name})</Text>

                <Formik
                    initialValues={{ email: "", }}
                    onSubmit={(values) => {
                        fetchCreatedEstates(values.email)
                    }}
                    validationSchema={validation}
                >
                    {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="User Email"
                                    placeholderTextColor={Theme.colors.text2}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete='off'
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    value={values.email}
                                />
                                <Text style={{ color: Theme.colors.red }}>{touched.email && errors.email}</Text>
                            </View>


                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.loginButtonText}>Proceed</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.bg,
    },
    content: {
        flex: 1,
        padding: Theme.sizes.padding * 1.5,
        justifyContent: 'center',
    },
    title: {
        fontSize: Theme.sizes.xxl * 1.4,
        fontFamily: Theme.fonts.text700,
        color: Theme.colors.text1,
        textAlign: 'center',
        marginBottom: Theme.sizes.xs,
    },
    subtitle: {
        fontSize: Theme.sizes.lg,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
        textAlign: 'center',
        marginBottom: Theme.sizes.padding * 2,
    },
    form: {
        gap: Theme.sizes.lg,
    },
    inputContainer: {
        marginBottom: Theme.sizes.sm,
    },
    input: {
        borderWidth: 1,
        borderColor: Theme.colors.line,
        borderRadius: Theme.sizes.borderRadius * 1.5,
        padding: Theme.sizes.padding,
        fontSize: Theme.sizes.lg,
        fontFamily: Theme.fonts.text400,
        backgroundColor: Theme.colors.layer,
    },
    forgotButton: {
        alignSelf: 'flex-end',
        marginTop: -Theme.sizes.sm,
    },
    forgotText: {
        fontSize: Theme.sizes.md,
        fontFamily: Theme.fonts.text500,
        color: Theme.colors.primary,
    },
    loginButton: {
        backgroundColor: Theme.colors.primary,
        borderRadius: Theme.sizes.borderRadius * 1.5,
        padding: Theme.sizes.padding,
        alignItems: 'center',
        marginTop: Theme.sizes.lg,
    },
    loginButtonText: {
        fontSize: Theme.sizes.lg,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.bg,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Theme.sizes.xl,
    },
    signupText: {
        fontSize: Theme.sizes.md,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
    },
    signupLink: {
        fontSize: Theme.sizes.md,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.primary,
    },
})