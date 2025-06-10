import { ToastAndroid } from "react-native";
import Toast from "react-native-root-toast";

export function ToastApp(message, duration) {
    // "SHORT"
    Toast.show(message, {
        duration: Toast.durations[duration || "LONG"],
    });
}