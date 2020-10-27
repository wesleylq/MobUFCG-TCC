import React, { useState } from 'react';
import { View, Colors, Button, TouchableOpacity, RadioButton, RadioGroup, Text } from 'react-native-ui-lib';
import { ScrollView, Image, Alert } from 'react-native';
import { Input } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

const options = {
  title: 'Selecione uma imagem',
  takePhotoButtonTitle: "Câmera",
  chooseFromLibraryButtonTitle: "Galeria de Fotos",
  cancelButtonTitle: "cancelar",
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


export default function RegisterReport({ navigation, route }) {

  const { coord } = route.params;

  const [pic, setPic] = useState(null)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [type, setType] = useState("")
  const [place, setPlace] = useState('')

  sendReport = () => {
    const pinColor = type == "Problema" ? Colors.red20 : Colors.blue20
    firestore()
      .collection('Reports')
      .add({
        pic: pic,
        title: title,
        description: description,
        type: type,
        place: place,
        coordinate: coord,
        status:"Reportado",
        pinColor: pinColor
      }).then(() => {
        console.log('Report Added!');
        Alert.alert("Seu reporte foi registrado!")
        setPic(null)
        setType("")
        setPlace("")
        setDescription("")
        navigation.push("ReportMap")
      });
  }


  const openPicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;
        setPic(source)
      }
    });
  }

  return (
    <ScrollView style={{ flex: 1 }}>

      <View flex center margin-20>

        <Text text60 blue20 >
          Registre o seu reporte
      </Text>


        <TouchableOpacity
          flex
          bg-white
          br20
          center
          margin-15
          style={{ height: 300, width: 300, borderWidth: 1, borderColor: Colors.grey50 }}
          onPress={() => openPicker()}>
          {pic == null ?
            <Icon name={"ios-add-circle"} color={Colors.black} size={50} />
            :
            <Image style={{ height: "100%", width: "100%", borderRadius: 5 }} resizeMode={"cover"} source={{ uri: pic }} />
          }
        </TouchableOpacity>


        <View flex center marginH-15>
          <Input
            placeholder='Título'
            value={title}
            onChangeText={nextValue => setTitle(nextValue)}
          />

          <Input
            multiline={true}
            textStyle={{ minHeight: 64 }}
            placeholder='Descrição'
            value={description}
            onChangeText={nextValue => setDescription(nextValue)}
          />

          <Input
            placeholder='Local'
            value={place}
            onChangeText={nextValue => setPlace(nextValue)}
          />
        </View>

        <View flex row>
          <RadioGroup row marginT-10 initialValue={type} onValueChange={type => setType(type)}>
            <View center><Text text70 grey40>Tipo do Reporte: </Text></View>
            <View row margin-5>
              <Text text70 dark10>
                Sugestão
              </Text>
              <RadioButton marginH-5 value={"Sugestão"} />
            </View>
            <View row margin-5>
              <Text text70 dark10>
                Problema
              </Text>
              <RadioButton marginH-5 value={"Problema"} />
            </View>
          </RadioGroup>
        </View>

        <View margin-10>
          <Button label={"Enviar"}
            onPress={() => sendReport()}
          />
        </View>

      </View>
    </ScrollView>
  )
}
