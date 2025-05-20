import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Theme } from "../Components/Theme";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// Mock data for recent transactions
const recentTransactions = [
  {
    id: '1',
    estate: 'Green Valley Estate',
    service: 'Security Fee',
    amount: '₦15,000',
    date: 'Today, 10:45 AM',
    icon: 'shield'
  },
  {
    id: '2',
    estate: 'Sunrise Apartments',
    service: 'Maintenance',
    amount: '₦8,500',
    date: 'Yesterday, 2:30 PM',
    icon: 'wrench'
  },
  {
    id: '3',
    estate: 'Sunrise Apartments',
    service: 'Electricity Bill',
    amount: '₦12,000',
    date: 'Oct 12, 9:15 AM',
    icon: 'bolt'
  },
];

const username = "John Doe";
const totalTransactions = 24;
const totalAmount = "₦156,800";
const joinedEstates = 3;

export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header with Profile and Welcome */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greetingText}>Hi, {username}</Text>
            <Text style={styles.welcomeText}>Welcome to Commshare</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.inboxIcon}>
          <FontAwesome name="inbox" size={24} color={Theme.colors.text1} />
        </TouchableOpacity>
      </View>

      {/* Transaction Summary Card */}
      <TouchableOpacity style={styles.summaryCard}>
        <Text style={styles.sectionHeader}>Transaction Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{totalTransactions}</Text>
            <Text style={styles.summaryLabel}>Total Transactions</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{totalAmount}</Text>
            <Text style={styles.summaryLabel}>Total Amount</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Manage Estates Card */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CreatedEstates')}>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>Created Estate Groups</Text>
            <Text style={styles.cardSubtext}>Manage or create estate groups</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={Theme.colors.text2} />
        </View>
      </TouchableOpacity>

      {/* Joined Estates Card */}
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardContent}>
          <View style={{ flex: 1 }}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.cardTitle}>Your Communities</Text>
              <Text style={styles.estateCount}>{joinedEstates}</Text>
            </View>
            <Text style={styles.cardSubtext}>Tap to view details</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={Theme.colors.text2} />
        </View>
      </TouchableOpacity>

      {/* Recent Transactions Section */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, styles.transactionCard]}>
            <View style={styles.transactionIconContainer}>
              <FontAwesome name={item.icon} size={16} color={Theme.colors.primary} />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.estateName}>{item.estate}</Text>
              <Text style={styles.serviceName}>{item.service}</Text>
            </View>
            <View style={styles.transactionAmountDate}>
              <Text style={styles.amountText}>{item.amount}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bg,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  greetingText: {
    fontSize: 18,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.text1,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
    marginTop: 2,
  },
  inboxIcon: {
    padding: 8,
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
    elevation: 3, // Android shadow
  },
  summaryCard: {
    backgroundColor: Theme.colors.greenLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    paddingVertical: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.text1,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 0.48
  },
  summaryNumber: {
    fontSize: 28,
    fontFamily: Theme.fonts.text700,
    color: Theme.colors.primary,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
  },
  verticalDivider: {
    width: 1,
    height: '80%',
    backgroundColor: Theme.colors.line,
    alignSelf: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.text1,
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 14,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.text1,
    marginBottom: 12,
  },
  estateCount: {
    fontSize: 16,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.primary,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transactionIconContainer: {
    backgroundColor: 'rgba(72, 207, 173, 0.1)', // Primary color with opacity
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  estateName: {
    fontSize: 16,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.text1,
    marginBottom: 2,
  },
  serviceName: {
    fontSize: 14,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
  },
  transactionAmountDate: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontFamily: Theme.fonts.text600,
    color: Theme.colors.primary,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    fontFamily: Theme.fonts.text400,
    color: Theme.colors.text2,
  },
});