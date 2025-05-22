import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Theme } from '../Components/Theme';

// Sample data for Commshare groups
const groups = [
  {
    id: '1',
    name: 'Estate Fuel Pool',
    timestamp: '2:45 PM',
  },
  {
    id: '2',
    name: 'Security Watch',
    timestamp: '1:15 PM',
  },
  {
    id: '3',
    name: 'Generator Maintenance',
    timestamp: 'Yesterday',
  },
  {
    id: '4',
    name: 'Event Planning',
    timestamp: 'May 18',
  }
];

const GroupList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('GroupChat', { groupId: item.id })}
    >
      <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.profileAvatar} />
        </View>
        <Text style={styles.headerTitle}>Commshare Groups</Text>
        <TouchableOpacity
          style={styles.createBtn}
          // onPress={() => navigation.navigate('CreateGroup')}
        >
          <FontAwesome name="plus-circle" size={28} />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} style={styles.searchIcon} />
        <TextInput
          placeholder="Search groups"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical:Theme.sizes.xs,
    paddingHorizontal:Theme.sizes.md,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f8f8f8',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius:Theme.sizes.xl,
    marginRight:Theme.sizes.xs,
  },
  profileName: {
    fontSize: Theme.sizes.lg,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize:Theme.sizes.xl,
    fontWeight: 'bold',
  },
  createBtn: {
    padding: Theme.sizes.xxs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Theme.sizes.xs,
    paddingHorizontal: Theme.sizes.xs,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:Theme.sizes.xs,
    backgroundColor: '#fafafa',
  },
  searchIcon: {
    marginRight: Theme.sizes.xxs,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  listContent: {
    paddingHorizontal: Theme.sizes.xs,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical:Theme.sizes.md,
    paddingHorizontal: Theme.sizes.xxs,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: Theme.sizes.xxl,
    marginRight:Theme.sizes.md,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupName: {
    fontSize: Theme.sizes.lg,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: Theme.sizes.sm,
    color: '#888',
  },
  lastMessage: {
    fontSize: Theme.sizes.sm,
    color: '#555',
    marginTop: Theme.sizes.xxs,
  },
});

export default GroupList;
