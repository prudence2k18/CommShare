import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Theme } from '../Components/Theme'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Firebase/Settings'
import { errorMessage } from '../Components/formatErrorMessage'

const validation = Yup.object({
    email: Yup.string().email().required(),
})

export function ForgotPassword({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>Enter you email to continue</Text>

                <Formik
                    initialValues={{ email: "", }}
                    onSubmit={(values) => {
                        // console.log(values)
                        sendPasswordResetEmail(auth, values.email)
                            .then(() => {
                                Alert.alert("Success", "Password reset email sent. Please check your inbox.");
                                navigation.goBack();
                            })
                            .catch((error) => {
                                console.log("Error signing up:", error);
                                Alert.alert("Sign Up Error", errorMessage(error.code));
                            });
                    }}
                    validationSchema={validation}
                >
                    {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                        <View style={styles.form}>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor={Theme.colors.text2}
                                    autoCapitalize="none"
                                    autoCorrect={false}
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
                                <Text style={styles.loginButtonText}>Send mail</Text>
                            </TouchableOpacity>

                            <View style={styles.signupContainer}>
                                <Text style={styles.signupText}>I rememeber my password </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                                    <Text style={styles.signupLink}>Log In</Text>
                                </TouchableOpacity>
                            </View>
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