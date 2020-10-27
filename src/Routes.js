import React, { useState } from 'react';
import { View, TextField, Text, Button, Colors, Typography, TouchableOpacity } from 'react-native-ui-lib';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from './views/login/context'
import { DrawerPage } from './views/home/DrawerPage'

import HomeScreen from './views/home/Home'
import MapScreen from './views/map/Map'
import ReportMapScreen from './views/report/Map'
import BuildingScreen from './views/places/building/Building'
import LabScreen from './views/places/lab/Lab'
import ReportScreen from './views/report/Report'
import RegisterReportScreen from './views/report/RegisterReport'
import SignInScreen from './views/login/SignIn'
import SignUpScreen from './views/login/SignUp'

Colors.loadColors({
  blue: '#659CEC',
  white: '#ffffff',
  grey: '#666666',
});

const Stack = createStackNavigator();
const { Navigator, Screen } = createDrawerNavigator();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESIGN':
          return {
            ...prevState,
            email: action.email,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            email: action.email,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            email: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      email: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let email;
      try {
        email = await AsyncStorage.getItem('@email');
      } catch (e) {
      }
      dispatch({ type: 'RESIGN', email: email });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        await AsyncStorage.setItem('@email', data.email);
        dispatch({ type: 'SIGN_IN', email: JSON.stringify(data.email)});
      },
      signOut: async () => {
        await AsyncStorage.clear()
        dispatch({ type: 'SIGN_OUT', email: null});
      }
    }),
    []
  );

  function Title({ navigation }) {
    return (
      <View row center padding-5 bg-white>
        <TouchableOpacity flex margin-5 onPress={() => navigation.openDrawer()}>
          <Icon fill="black" name='menu' size={25} />
        </TouchableOpacity>      
        <View flexG>
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
      </View>
    );
  }

  function RootApp() {
    return (  
      <Stack.Navigator
        initialRouteName="Home"
        //headerMode="none"
        screenOptions={{
          headerTransparent: true,
          headerTitle: false,
          headerStyle: {
            elevation: 0
          }
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerTransparent: false,  header: Title }}/>
        <Stack.Screen name="Map" component={MapScreen}  />
        <Stack.Screen name="ReportMap" component={ReportMapScreen} />
        <Stack.Screen name="Building" component={BuildingScreen} />
        <Stack.Screen name="Lab" component={LabScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="RegisterReport" component={RegisterReportScreen} />
      </Stack.Navigator> 
    )
  }

  return (
    <>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>

          {state.email ? (

            <Navigator
              drawerContent={props => <DrawerPage {...props} />}
            >
              <Screen name='Root' component={RootApp} />
            </Navigator>

          ) : (
              <Stack.Navigator
                initialRouteName="SignIn"
                //headerMode="none"
                screenOptions={{
                  headerTransparent: true,
                  headerTitle: false,
                }}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerTransparent: true}}/>
              </Stack.Navigator>

            )}

        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}


