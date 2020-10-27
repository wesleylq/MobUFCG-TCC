import React, { Component, useState, useEffect } from 'react'
import { Text, Input, Button, Icon, } from '@ui-kitten/components'
import { View, Colors} from 'react-native-ui-lib';
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './context';
import firestore from '@react-native-firebase/firestore';


export default function SignIn({ navigation }) {

  const { signIn } = React.useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);


  handeLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
      })
      .catch(error => {
        console.log(error.code);
      });

    firestore()
      .collection('Users')
      .doc(email)
      .get()
      .then(documentSnapshot => {
        signIn({ email: email })
      });
  }

  onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  }

  onSignUpButtonPress = () => {
    navigation.navigate('SignUp')
  }

  toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderPassIcons = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} />
    </TouchableWithoutFeedback>
  );

  const PersonIcon = (props) => (
    <Icon name='person-outline' {...props} />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

      <View flexG spread>

        <View padding-20 center marginT-50 >
          <Text style={{
            fontSize: 40,
            fontWeight: 'bold', fontStyle: "normal", color: 'black'
          }}>Mob
            <Text style={{
              fontSize: 40,
              fontWeight: 'bold', fontStyle: "normal", color: '#659CEC'
            }}>UFCG
          </Text>
          </Text>
        </View>

        <View 
          style={styles.loginContainer}
        >
          <Text category='h4'>
            Login
          </Text>
          <Input
            style={styles.input}
            status='info'
            placeholder='E-mail'
            accessoryLeft={PersonIcon}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <Input
            style={styles.input}
            status='info'
            placeholder='Senha'
            value={password}
            accessoryLeft={renderPassIcons}
            secureTextEntry={secureTextEntry}
            onChangeText={setPassword}
            onIconPress={() => onPasswordIconPress()}
          />

          <Button
            style={styles.signInButton}
            //appearance='ghost'
            //status='control'
            onPress={() => handeLogin()}
          >
            LOGIN
          </Button>
          
        </View>
        <View margin-20 center>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text>
              Não tem uma conta? 
              <Text style={{color:Colors.blue}}> Registre-se! </Text>
          </Text>
          </TouchableOpacity>
        </View>
       
      </View>


    </TouchableWithoutFeedback>
  )
}



const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#F5F5F5"
  },
  controlContainer: {
    borderRadius: 30,
    margin: 10,
    //padding: 6,
    justifyContent: 'center',

  },
  logoContainer: {
    height: "20%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  logo: {
    width: "70%",
    height: "70%"

  },
  loginContainer: {
    height: "35%",
    marginHorizontal: "10%",
    alignItems: "center",
    justifyContent: "space-evenly",

  },
  loginText: {
    alignSelf: "center",
    color: "black",

  },
  input: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "white"
  },
  forgotPasswordContainer: {
    //paddingBottom: 20,//////
    height: "15%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center"
  },
  orContainer: {
    marginTop: 25,
    height: "10%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  socialAuthContainer: {
    height: "15%",
    alignItems: "center",
    justifyContent: 'center',
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',


  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginHorizontal: 10,
    color: "#959595"
  },
  divider: {
    borderBottomColor: "#959595",
    borderBottomWidth: 1,
    width: "15%"

  },
  signUpButton: {
    //margin: -12,

  },
  signInButton: {
    borderRadius: 30,


  }

});