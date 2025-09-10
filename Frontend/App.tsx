import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import Home from './app/index';
import Workouts from './app/workouts';
import Profile from './app/profile';
import SettingsModal from './app/components/SettingsModal';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const openSettings = () => {
    setSettingsModalVisible(true);
  };

  const closeSettings = () => {
    setSettingsModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FF305B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarActiveTintColor: '#FF305B',
            tabBarInactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{ 
              title: 'Início',
              tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={openSettings}>
                  <Text style={{ fontSize: 24, color: '#fff' }}>⚙️</Text>
                </TouchableOpacity>
              )
            }}
          />
          <Tab.Screen 
            name="Workouts" 
            component={Workouts} 
            options={{ 
              title: 'Treinos',
              tabBarIcon: () => <Text style={{ fontSize: 20 }}>💪</Text>,
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={openSettings}>
                  <Text style={{ fontSize: 24, color: '#fff' }}>⚙️</Text>
                </TouchableOpacity>
              )
            }}
          />
          <Tab.Screen 
            name="Profile" 
            component={Profile} 
            options={{ 
              title: 'Perfil',
              tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text>,
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={openSettings}>
                  <Text style={{ fontSize: 24, color: '#fff' }}>⚙️</Text>
                </TouchableOpacity>
              )
            }}
          />
        </Tab.Navigator> 
      </NavigationContainer>

      <SettingsModal 
        visible={settingsModalVisible} 
        onClose={closeSettings} 
      />

    </SafeAreaProvider>
  );
}

export default App;