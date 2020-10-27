import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar} from 'react-native';
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components'
import Routes from './Routes';


console.disableYellowBox = true

export default function App() {
  return (
           
      <>
      <StatusBar 
      barStyle="dark-content" hidden={false} backgroundColor="#f5f5f5" translucent = {false}
      />
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={ eva.light}>          
            <Routes/>          
        </ApplicationProvider>
      </>     
    
  );
}