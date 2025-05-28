import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { Theme } from "../Components/Theme";
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Settings";
import { errorMessage } from "../Components/formatErrorMessage";
import * as Yup from "yup";

const SignUpSchema = Yup.object({
  firstname: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastname: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password cannot exceed 30 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export function SignUp({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us today</Text>

          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => {
              // console.log(values)
              createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
              )
                .then(() => {
                  navigation.replace("HomeScreen");
                })
                .catch((error) => {
                  console.log("Error signing up:", error);
                  Alert.alert("Sign Up Error", errorMessage(error.code));
                });
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor={Theme.colors.text2}
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={handleChange("firstname")}
                  value={values.firstname}
                />
                <Text style={styles.errorText}>
                  {touched.firstname && errors.firstname}
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor={Theme.colors.text2}
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={handleChange("lastname")}
                  value={values.lastname}
                />
                <Text style={styles.errorText}>
                  {touched.lastname && errors.lastname}
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={Theme.colors.text2}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={handleChange("email")}
                  value={values.email}
                />
                <Text style={styles.errorText}>
                  {touched.email && errors.email}
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={Theme.colors.text2}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  value={values.password}
                />
                <Text style={styles.errorText}>
                  {touched.password && errors.password}
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={Theme.colors.text2}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  onChangeText={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                />
                <Text style={styles.errorText}>
                  {touched.confirmPassword && errors.confirmPassword}
                </Text>

                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.loginLink}>Log In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bg,
  },
  content: {
    flex: 1,
    padding: Theme.sizes.padding * 1.5,
    justifyContent: "center",
  },
  title: {
    fontSize: Theme.sizes.xxl * 1.4,
    fontFamily: Theme.fonts.text700,
    color: Theme.colors.text1,
    textAlign: "center",
    marginBottom: Theme.sizes.xs,
  },
  subtitle: {
    fontSize: Theme.sizes.lg,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
    textAlign: "center",
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
  signupButton: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.sizes.borderRadius * 1.5,
    padding: Theme.sizes.padding,
    alignItems: "center",
    marginTop: Theme.sizes.lg,
  },
  signupButtonText: {
    fontSize: Theme.sizes.lg,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.bg,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Theme.sizes.xl,
  },
  loginText: {
    fontSize: Theme.sizes.md,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
  },
  loginLink: {
    fontSize: Theme.sizes.md,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.primary,
  },
  errorText: {
    color: "red",
    fontSize: Theme.sizes.sm,
    marginTop: -Theme.sizes.md,
  },
});
