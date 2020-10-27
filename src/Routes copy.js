import React from 'react';
import { statusBar, StyleSheet  } from 'react-native';
import { View, TextField, Text, Button, Colors, Typography } from 'react-native-ui-lib';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './views/home/Home'
import MapScreen from './views/map/Map' 
import ReportMapScreen from './views/report/Map' 
import BuildingScreen from './views/places/building/Building'
import LabScreen from './views/places/lab/Lab'
import ReportScreen from './views/report/Report'
import RegisterReportScreen from './views/report/RegisterReport'

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

const Stack = createStackNavigator();

export default Screens = () => (
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

    <Stack.Screen name="Home" component={HomeScreen} options={{ header: Title }}/>
    <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Mapa do Campus' }}/>
    <Stack.Screen name="ReportMap" component={ReportMapScreen} options={{ title: 'Mapa de Reporte' }}/>
    <Stack.Screen name="Building" component={BuildingScreen} options={{ title: 'Bloco' }}/>
    <Stack.Screen name="Lab" component={LabScreen} options={{ title: 'Laboratório' }}/>
    <Stack.Screen name="Report" component={ReportScreen} options={{ title: 'Discussões' }}/>
    <Stack.Screen name="RegisterReport" component={RegisterReportScreen} options={{ title: 'Registrar Reporte' }}/>
  </Stack.Navigator>
);
