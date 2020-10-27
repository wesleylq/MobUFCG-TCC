import React, { useState } from 'react'
import {
  StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, View, KeyboardAvoidingView,
  Alert, NativeModules, SafeAreaView, ImageBackground
} from 'react-native';
import { Layout, Button, CheckBox, Datepicker, Input, Text, Icon, Avatar, TopNavigation, Select, SelectItem } from '@ui-kitten/components'
import ImagePicker from 'react-native-image-picker';
import { AuthContext } from './context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export default function SignUp({ navigation }) {

  const { signIn } = React.useContext(AuthContext);

  const [avatar, setAvatar] = React.useState("https://media.salon.com/2013/01/Facebook-no-profile-picture-icon-620x389.jpg");
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [user, setuser] = React.useState();
  const [email, setEmail] = React.useState();
  const [course, setCourse] = React.useState();
  const [type, setType] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = useState()
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const options = {
    title: 'Selecione seu avatar',
    takePhotoButtonTitle: "Câmera",
    chooseFromLibraryButtonTitle: "Galeria de Fotos",
    cancelButtonTitle: "cancelar",
    storageOptions: {
      skipBackup: true,
      path: 'Imagens',
    },
  };


  const handleSignUp = async () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {        
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });

      firestore()
          .collection('Users')
          .doc(email)
          .set({
            avatar: avatar,
            email: email,
            user: user,
            course: course,
            type: "student"
          }).then(() => {
            signIn({ email: email })
            console.log('User Added!');
          }).catch(error => console.error(error));
  }

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };


  const renderPassIcons = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} />
    </TouchableWithoutFeedback>
  );

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, marginTop:20 }}>


        <View style={styles.headerContainer}>
          <Avatar
            style={styles.profileAvatar}
            shape='round'
            //resizeMode='center'
            source={{ uri: avatar }}
          />
          <Button onPress={() => ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = response.uri;
              setAvatar(source);
            }
          })
          }
            style={styles.editAvatarButton} size="tiny"
            status='primary' accessoryLeft={PlusIcon} />
        </View>

        <View style={styles.loginContainer}>
          <Text category='h2' status='primary' style={styles.loginText}>
            Cadastro
          </Text>

          <Input
            style={styles.input}
            status='info'
            placeholder='Usuário'
            value={user}
            onChangeText={setuser}
            autoCapitalize="none"
          />
          <Input
            style={styles.input}
            status='info'
            placeholder='E-mail'
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Input
            style={styles.input}
            status='info'
            placeholder='Curso'
            value={course}
            onChangeText={setCourse}
            autoCapitalize="none"
          />

          <Input
            style={styles.input}
            status='info'
            placeholder='Senha'
            value={password}
            accessoryRight={renderPassIcons}
            secureTextEntry={secureTextEntry}
            onChangeText={setPassword}
            onIconPress={() => onPasswordIconPress()}
            caption='Deve conter ao menos 6 caracteres'
            captionIcon={AlertIcon}
          />

          <Input
            style={styles.input}
            status='info'
            placeholder='Confirme Senha'
            value={confirmPassword}
            accessoryRight={renderPassIcons}
            secureTextEntry={secureTextEntry}
            onChangeText={setConfirmPassword}
            onIconPress={() => onPasswordIconPress()}

          />


          <Button 
          style={{marginTop:10, borderRadius: 30,}}
            onPress={() => handleSignUp()}
          ><Text style={{ color: "white" }}>Cadastrar</Text>
          </Button>

        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: "column",
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "20%",
  },
  profileAvatar: {
    width: 116,
    height: 116,
    alignSelf: 'center',
    backgroundColor: 'grey',
    //tintColor: 'white',
  },
  editAvatarButton: {
    height: 25,
    width: 25,
    borderRadius: 100,
    marginTop: -30,
    marginRight: -80
  },
  controlContainer: {
    borderRadius: 30,
  },
  loginContainer: {
    height: "60%",
    marginHorizontal: "10%",
    alignItems: "center",
    justifyContent: "space-evenly",

  },
  loginText: {
    alignSelf: "center",
    color: "black",

  },
  input: {
    borderRadius: 10,
    backgroundColor: "white"
  },


});

const EmailIcon = (props) => (
  <Icon name='email' {...props} />
);

const PlusIcon = (props) => (
  <Icon name='plus' {...props} />
);

const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline' />
);