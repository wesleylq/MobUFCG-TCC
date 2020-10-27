import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, StatusBar, Alert, NativeModules, SafeAreaView, ScrollView } from 'react-native';
import { Icon, Button, Text, TopNavigation, Avatar, } from '@ui-kitten/components';
import { Colors, View } from 'react-native-ui-lib';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../login/context'
import firestore from '@react-native-firebase/firestore';



export function DrawerPage({ navigation }) {
  const isDrawerOpen = useIsDrawerOpen();

  const { signOut } = useContext(AuthContext);

  const [avatar, setAvatar] = useState("https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png");
  const [user, setUser] = useState("")
  const [account, setAccount] = useState()


  useEffect(() => {
    async function fetchData() {
      const email = await AsyncStorage.getItem('@email');
      firestore()
        .collection('Users')
        .doc(email)
        .get()
        .then(documentSnapshot => {
          
          setAvatar(documentSnapshot._data.avatar)
          setUser(documentSnapshot._data.user)
          setAccount(documentSnapshot._data.account)
        });
    }
    fetchData();
  }, []);



  const handleSignOut = () => {
    signOut()
  }

  return (

    <View flex spread>

      <View style={styles.headerContainer}>
        <Avatar
          style={styles.profileAvatar}
          shape='round'
          source={{ uri: avatar }}
        //source={require('../login/assets/image-person.png')}
        />

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <Text category='h5'>{user}</Text>
        </View>
      </View>

     


      <View margin-20>
        <Button
          style={{ borderRadius: 30, }}
          onPress={() => handleSignOut()}>
          Sair
          </Button>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: Colors.blue
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginVertical: 0
  },
  profileAvatar: {
    width: 116,
    height: 116,
    alignSelf: 'center',
    backgroundColor: Colors.blue,

  },
  editAvatarButton: {
    height: 25,
    width: 25,
    borderRadius: 100,
    marginTop: -30,
    marginRight: -80
  },
  nameText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10
  },

  middleContainer: {
    marginVertical: 0,
    height: 450,
    marginHorizontal: "20%",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  middleButton: {
    marginVertical: 5,
    flexDirection: "row",
    height: 50, width: "100%",
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  middleButton2: {
    marginBottom: 15,
    marginHorizontal: 25,
    width: "100%",

  },
  middleText: {
    color: "white",
    paddingLeft: 20
  },
  icon: {
    height: 25,
    width: 25
  },
  divider: {
    borderBottomColor: "#540771",
    borderBottomWidth: 1.5,
    width: "100%"

  },
  footerContainer: {
    height: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomButton: {
    borderRadius: 30,
    width: "25%",
    marginHorizontal: "5%"

  }

});