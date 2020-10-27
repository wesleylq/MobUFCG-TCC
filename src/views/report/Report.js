import React, { useEffect, useState } from 'react';
import { View, Card, Avatar, Text, Button, Colors } from 'react-native-ui-lib';
import { Alert, ScrollView, StyleSheet, Image } from 'react-native';
import { Input, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';



export default function RegisterReport({ navigation, route }) {

  const { id } = route.params;
  const { pic } = route.params;
  const { title } = route.params;
  const { description } = route.params;
  const { type } = route.params;
  const { status } = route.params;

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState()

  const [avatar, setAvatar] = useState("https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png");
  const [user, setUser] = useState("")
  const [account, setAccount] = useState()

  const [selectedIndex, setSelectedIndex] = useState(status == "Reportado" ? new IndexPath(0) : selectedIndex == "Em andamento" ? new IndexPath(1) : new IndexPath(2));

  useEffect(() => {
    firestore()
      .collection('Reports')
      .doc(id)
      .collection('Comments')
      .get()
      .then(documentSnapshot => {
        setComments(documentSnapshot._docs);
      }).catch(error => console.error(error));
  }, [comment])

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

  sendComment = () => {
    this.scroll.scrollToEnd();
    firestore()
      .collection('Reports')
      .doc(id)
      .collection('Comments')
      .add({
        user: user,
        avatar: avatar,
        comment: comment,
        account: account,
        date: new Date
      })
      .then(() => {
        setComment("")
      }).catch(error => console.error(error));
  }

  updateStatus = () => {
    const status = selectedIndex.row == 0 ? "Reportado" : selectedIndex.row == 1 ? "Em andamento" : "Resolvido"
    const pinColor = selectedIndex.row == 0 ? Colors.blue20 : selectedIndex.row == 1 ? Colors.yellow20 : Colors.green20
    firestore()
    .collection('Reports')
    .doc(id)    
    .update({
      status: status,
      pinColor: pinColor 
    })
    .then(() => {
      navigation.push("ReportMap")
    }).catch(error => console.error(error));
  }
  const data = [
    'Reportado',
    'Em andamento',
    'Resolvido'
];
const displayValue = data[selectedIndex.row];

  return (
    <ScrollView style={{ flex: 1 }} ref={(scroll) => { this.scroll = scroll; }}>

      <Card margin-10 flexG>
        <Image style={{ height: 175, width: "100%", borderRadius: 5 }} resizeMode={"contain"} source={{ uri: pic }} />
        <View center padding-10>
          <Text text60 style={{ fontWeight: "bold", color: Colors.blue }}>{title}</Text>
          <Text>{description}</Text>
        </View>
        <View row center marginB-10>
          <Text grey40 text70 marginH-5>Status: <Text dark20>{status}</Text></Text>
          <Text grey40 text70 marginH-5>Tipo: <Text dark20>{type}</Text></Text>
        </View>
      </Card>


      <View center margin-20>
        <Text text60 style={{ fontWeight: "bold", color: Colors.blue }}>Mudar Status</Text>
        <View flexG center style={{ width: 300 }}>
          <Select   
            style={{ width: 300 }}
            value={displayValue}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <SelectItem title='Reportado' />
            <SelectItem title='Em andamento' />
            <SelectItem title='Resolvido' />
          </Select>
          <View margin-5>
          <Button label={"Atualizar"}
            onPress={() => updateStatus()}
          />
          </View>
         
        </View>
      </View>

      <View margin-10>
        <Input
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder='Escrever...'
          value={comment}
          onChangeText={(comment) => setComment(comment)}
        />

        <Button margin-10 label={"Comentar"}
          onPress={() => sendComment()}
        />

      </View>
      <View margin-10 center>
        <Text text60 blue20 marginB-5>
          Comentários e Discussões
        </Text>
      </View>



      {comments.map((comment, index) => {
        console.log(avatar, comment)
        return (
          <View row padding-10 margin-5>
            <View>
              <Avatar
                source={{ uri: avatar }}
                containerStyle={{ margin: 5 }}
              />
            </View>
            <View flex padding-10 br20 style={{ backgroundColor: comment._data.account == 1 ? Colors.blue20 : Colors.grey60 }}>
              <Text style={{ fontWeight: "bold", color: comment._data.account == 1 ? "white" : "black" }}>{comment._data.user}</Text>
              <Text style={{ color: comment._data.account == 1 ? "white" : "black" }}>{comment._data.comment}</Text>
            </View>
          </View>
        );
      })}


    </ScrollView>
  )
}
