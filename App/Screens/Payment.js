import { View } from 'react-native'
import { Theme } from '../Components/Theme';
import { useContext } from 'react';
import { AppContext } from '../Components/globalVariables';
import { Paystack } from 'react-native-paystack-webview';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ToastApp } from '../Components/Toast';
import { errorMessage } from '../Components/formatErrorMessage';
import { db } from '../../Firebase/Settings';

// console.log("Pastack:", Paystack);
export function Payment({ navigation, route }) {
    const { userUID, setPreloader, userInfo, estate } = useContext(AppContext);
    const { contribution } = route?.params

    return (
        <View style={{ flex: 1 }}>
            <Paystack
                paystackKey="pk_test_92fcc0077ec7f42a73ff01c87db79c3698b06dec"
                amount={contribution.amount + ((1.8 / 100) * contribution.amount)}
                firstName={userInfo.firstname}
                lastName={userInfo.lastname}
                billingEmail={userInfo.email}
                activityIndicatorColor={Theme.colors.green}
                onCancel={() => {
                    navigation.goBack()
                }}
                onSuccess={(data) => {
                    setPreloader(true)
                    updateDoc(doc(db, "contributions", contribution.docID), {
                        paidUsers: [...contribution.paidUsers, userUID],
                    }).finally(() => {
                        addDoc(collection(db, "transactions"), {
                            user: userUID,
                            amount: contribution.amount,
                            status: "success",
                            type: "debit",
                            title: contribution.name,
                            contributionID: contribution.docID,
                            username: `${userInfo.firstname} ${userInfo.lastname}`,
                            estateName: estate.name,
                            estateID: estate.docID,
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
                    }).catch((error) => {
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