import { View } from 'react-native'
import { Theme } from '../Components/Theme';
import { useContext } from 'react';
import { AppContext } from '../Components/globalVariables';
import { Paystack } from 'react-native-paystack-webview';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ToastApp } from '../Components/Toast';
import { errorMessage } from '../Components/formatErrorMessage';
import { db } from '../../Firebase/Settings';

export function Payment({ navigation, route }) {
    const { userUID, setPreloader, userInfo } = useContext(AppContext);
    const { amount } = route?.params

    return (
        <View style={{ flex: 1 }}>
            <Paystack
                paystackKey="pk_test_92fcc0077ec7f42a73ff01c87db79c3698b06dec"
                amount={amount + ((1.8 / 100) * amount)}
                firstName={userInfo.firstname}
                lastName={userInfo.lastname}
                billingEmail={userInfo.email}
                activityIndicatorColor={Theme.colors.green}
                onCancel={() => {
                    navigation.goBack()
                }}
                onSuccess={(data) => {
                    setPreloader(true)
                    addDoc(collection(db, "transactions"), {
                        user: userUID,
                        amount,
                        status: "success",
                        type: "debit",
                        title: "Contribution",
                        description: "Payment for contribution",
                        transactionRef: data.transactionRef,
                        timestamp: Date.now()
                    })
                        .then(() => {
                            setPreloader(false)
                            navigation.goBack()
                            ToastApp("Payment successful")
                        })
                        .catch((error) => {
                            setPreloader(false)
                            console.log(error);
                            ToastApp(errorMessage(error.code))
                            navigation.goBack()
                        })


                }}
                autoStart={true}
            />
        </View>
    )
}