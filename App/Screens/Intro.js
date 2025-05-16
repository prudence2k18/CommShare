import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts } from 'expo-font';
import { Theme } from '../Components/Theme';

export function Intro({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <Text style={{fontFamily: Theme.fonts.brand, fontSize: 30}}>CommShare</Text>
      <Button title="Tap To Enter" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({

});