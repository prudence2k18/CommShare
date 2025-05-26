import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Theme } from "../Components/Theme";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { goBack } from 'expo-router/build/global-state/routing';

const yourEstateGroups = []; // { id: '1', name: 'Sunrise Apartments', members: 24 }

export function CreatedEstates({ navigation }) {
  return (
    <View style={styles.container}>
      {yourEstateGroups.length > 0 ? (
        <>
          <FlatList
            data={yourEstateGroups}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.card, styles.estateCard]}>
                <View style={styles.cardContent}>
                  <View style={styles.estateInfo}>
                    <Text style={styles.estateName}>{item.name}</Text>
                    <Text style={styles.estateMembers}>{item.members} members</Text>
                  </View>
                  <MaterialIcons 
                    name="chevron-right" 
                    size={24} 
                    color={Theme.colors.text2} 
                  />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateEstate')}
          >
            <Text style={styles.buttonText}>Create New Group</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyState}>
          <FontAwesome 
            name="group" 
            size={48} 
            color={Theme.colors.text2} 
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyTitle}>No Created communities</Text>
          <TouchableOpacity 
            style={styles.mainButton}
            onPress={() => navigation.navigate('CreateEstate')}
          >
            <Text style={styles.buttonText}>Create Your First?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ...StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.colors.bg,
      padding: 20,
      paddingTop: 50,
    },
    card: {
      backgroundColor: Theme.colors.layer,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    estateCard: {
      marginBottom: 12,
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    estateInfo: {
      flex: 1,
    },
    estateName: {
      fontSize: 16,
      fontFamily: Theme.fonts.text600,
      color: Theme.colors.text1,
      marginBottom: 4,
    },
    estateMembers: {
      fontSize: 14,
      fontFamily: Theme.fonts.text400,
      color: Theme.colors.text2,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyIcon: {
      opacity: 0.5,
      marginBottom: 24,
    },
    emptyTitle: {
      fontSize: 18,
      fontFamily: Theme.fonts.text400,
      color: Theme.colors.text1,
      marginBottom: 24,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 14,
      fontFamily: Theme.fonts.text400,
      color: Theme.colors.text2,
      marginBottom: 24,
      textAlign: 'center',
    },
    mainButton: {
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Theme.colors.primary,
    },
    goBackButton:{
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    createButton: {
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Theme.colors.layer,
      borderWidth: 1,
      borderColor: Theme.colors.primary,
      marginTop: 16,
    },
    buttonText: {
      fontSize: 16,
      fontFamily: Theme.fonts.text600,
      color: Theme.colors.text1,
    },
  }),
});