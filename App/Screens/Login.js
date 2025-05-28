import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Theme } from '../Components/Theme';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Settings';
import { errorMessage } from '../Components/formatErrorMessage';

const validation = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(30).required()
})

export function LogIn({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(values) => {
                        // console.log(values)
                        signInWithEmailAndPassword(auth, values.email, values.password)
                            .then((data) => {
                                console.log(data.user.uid);
                                navigation.replace("HomeScreen");
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
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
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

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor={Theme.colors.text2}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    value={values.password}
                                />
                                <Text style={{ color: Theme.colors.red }}>{touched.password && errors.password}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.forgotButton}
                                onPress={() => navigation.navigate("ForgotPassword")}
                            >
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.loginButtonText}>Log In</Text>
                            </TouchableOpacity>

                            <View style={styles.signupContainer}>
                                <Text style={styles.signupText}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                    <Text style={styles.signupLink}>Sign Up</Text>
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