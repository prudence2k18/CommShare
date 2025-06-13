import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StatusBar,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Theme } from '../Components/Theme';
import { AppContext } from '../Components/globalVariables';
import { formatTimeAgo } from '../Components/formatTimeAgo';


const GroupList = ({ navigation, user }) => {
  const { userUID, userInfo, setUserInfo, createdEstates, setEstate } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => { setEstate(item); navigation.navigate('Estate') }}
    >
      <Image source={item?.image ? { uri: item?.image } : require('../../assets/icon.png')} style={styles.avatar} />
      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.groupName}>{item?.name}</Text>
            <Text style={{ fontFamily: Theme.fonts.text500, color: Theme.colors.gray }}>Residents: {item?.users?.length}</Text>
          </View>
          <Text style={styles.timestamp}>{formatTimeAgo(item?.createdAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={userInfo?.image ? { uri: userInfo.image } : require('../../assets/user.png')} style={styles.profileAvatar} />
        </View>
        <Text style={styles.headerTitle}>Commshare Groups</Text>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate('CreateEstate')}
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
        data={createdEstates}
        keyExtractor={(item) => item.docID}
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
    paddingTop: StatusBar.currentHeight || (Platform.OS === 'android' ? 25 : 0),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Theme.sizes.xs,
    paddingHorizontal: Theme.sizes.md,
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
    borderRadius: Theme.sizes.xl,
    marginRight: Theme.sizes.xs,
  },
  profileName: {
    fontSize: Theme.sizes.lg,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: Theme.sizes.xl,
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
    borderRadius: Theme.sizes.xs,
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
    paddingVertical: Theme.sizes.md,
    paddingHorizontal: Theme.sizes.xxs,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: Theme.sizes.xxl,
    marginRight: Theme.sizes.md,
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