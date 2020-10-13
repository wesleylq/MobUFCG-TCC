import React from 'react';
import { statusBar } from 'react-native';
import { View, TextField, Text, Button, Colors, Typography } from 'react-native-ui-lib';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout } from '@ui-kitten/components';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './views/home/Home'
import MapScreen from './views/map/Map' 
import BuildingScreen from './views/places/building/Building'
import LabScreen from './views/places/lab/Lab'
import ComplainScreen from './views/complain/Complain'

Colors.loadColors({
    blue: '#659CEC',
    white: '#ffffff',
    grey: '#666666',    
  });

  Typography.loadTypographies({
    h1: {fontSize: 25},
    h2: {fontSize: 18},
    h3: {fontSize: 16},
    h4: {fontSize: 14},
    h5: {fontSize: 12},
    h6: {fontSize: 10},
  });

  function Title() {
    return (
      <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
        <Text style={{
          fontSize: 25,
          fontWeight: 'bold', fontStyle: "normal", color: 'black'
        }}>Mob
            <Text style={{
            fontSize: 25,
            fontWeight: 'bold', fontStyle: "normal", color: '#659CEC'
          }}>UFCG              
          </Text>
        </Text>
      </View>
    );
  }

  const HomeIcon = (props) => (
    <Icon name={'ios-home'} color={Colors.blue} size={25} />
  );

  const MapIcon = (props) => (
    <Icon name={'ios-map'} color={Colors.blue} size={25} />
  );

const Stack = createStackNavigator();

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='HOME'icon={HomeIcon}/>
    <BottomNavigationTab title='MAPA INTERATIVO' icon={MapIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Map' component={MapScreen}/>
  </Navigator>
);

const Screens = () => (
  <Stack.Navigator
  initialRouteName="Home"
    screenOptions={{
      animationTypeForReplace:"push",
      headerStyle: {
        backgroundColor: "white",
        elevation: 1
      },
      headerTitleAlign:"center",
      headerTintColor: Colors.blue,
      headerTitleStyle: {
        fontSize:18,
      }
    }}>

    <Stack.Screen name="Home2" component={TabNavigator} options={{ header: Title }}/>
    <Stack.Screen name="Building" component={BuildingScreen}/>
    <Stack.Screen name="Lab" component={LabScreen}/>
    <Stack.Screen name="Complain" component={ComplainScreen}/>
    
  </Stack.Navigator>
);


export default Screens;