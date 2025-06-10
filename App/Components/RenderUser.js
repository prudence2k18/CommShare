import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { formatTimeAgo } from './formatTimeAgo'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Theme } from './Theme'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../Firebase/Settings'
import { AppContext } from './globalVariables'

export function RenderUser({ item }) {
    const { userUID, userInfo, setUserInfo, createdEstates, docID } = useContext(AppContext);
    const [userData, setUserData] = useState({});

    const estate = createdEstates.find(item => item.docID == docID)

    // Fetch user's data and display it in the list

    useEffect(() => {
        getDoc(doc(db, "users", item)).then((userDoc) => {
            setUserData(userDoc.data());
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, [item]);



    return (
        <View style={styles.itemContainer}>
            <View style={styles.headerRow}>
                <Image source={userData?.image ? { uri: userData?.image } : require('../../assets/icon.png')} style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text style={styles.groupName}>{userData?.firsname} {userData?.lastname}</Text>
                    <Text style={styles.timestamp}>{userData?.bio || "-"}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faTrashAlt} color={Theme.colors.red} size={25} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.line,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    groupName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    timestamp: {
        fontSize: 12,
        color: Theme.colors.text2,
    },
})