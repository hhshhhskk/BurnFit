import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import LibraryScreen from './screens/LibraryScreen';
import MyPageScreen from './screens/MyPageScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
      <StatusBar style="auto" />
        <Tab.Navigator
         screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Calendar'){
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Library'){
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'MyPage'){
              iconName = focused ? 'people' : 'people-outline';
            } 
            return <Ionicons name={iconName} size={size}  color={color}/>;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{
        headerShown: false }}/>
        <Tab.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="MyPage" component={MyPageScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
      </NavigationContainer>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
