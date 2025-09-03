import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import Home from './app/index';
import Workouts from './app/workouts';
import Profile from './app/profile';
import Settings from './app/settings';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    // Esconde a splash screen quando o app estiver pronto
    SplashScreen.hide();
  }, []);

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
            options={{ title: 'Início' }}
          />
          <Tab.Screen 
            name="Workouts" 
            component={Workouts} 
            options={{ title: 'Treinos' }}
          />
          <Tab.Screen 
            name="Profile" 
            component={Profile} 
            options={{ title: 'Perfil' }}
          />
          <Tab.Screen 
            name="Settings" 
            component={Settings} 
            options={{ title: 'Configurações' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;