// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function DeleteAccount({navigation}) {

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.info}>Delete your Account.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F0',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 30,
    left: 20,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B2E83',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
});
