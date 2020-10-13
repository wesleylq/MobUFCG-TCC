import React, { useState, useEffect } from 'react';
import { View, Colors, Card, Image, Text } from 'react-native-ui-lib';
import { FlatList, NativeModules, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Button, List } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';



export default function Building({ navigation, route }) {

  const { buildingId } = route.params;

  const [labs, setLabs] = useState([])
  const [building, setBuilding] = useState({})

  useEffect(() => {

    firestore()
      .collection('Buildings')
      .doc(buildingId)
      .get()
      .then(documentSnapshot => {
        setBuilding(documentSnapshot._data);
      });

    firestore()
      .collection('Buildings')
      .doc(buildingId)
      .collection('Labs')
      .get()
      .then(documentSnapshot => {
        setLabs(documentSnapshot._docs);
      });

    this.bottomSheetRef = React.createRef();

  }, [])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.rose }} >

      <ImageBackground
        style={styles.headingArticleContainer}
        source={{ uri: building.cover }}>
        <View center bg-white br20 padding-10>
          <Text>
            {building.name}
        </Text>          
        </View>
      </ImageBackground>

      <FlatList
        data={labs}
        numColumns={2}
        renderItem={({ item, index }) => (
          <Card          
            key={index}
            flex
            margin-10
            onPress={() => navigation.navigate("Lab", { lab: item._data })}
          >
                        
            <View padding-5>
              <Image
                source={{ uri: item._data.cover == null || item._data.cover == "" ?
                 "https://www.camaramatozinhos.mg.gov.br/wp-content/uploads/2018/05/sem-foto.jpg" 
                 : item._data.cover }}
                style={{ height: 150, backgroundColor: "white" }}
                resizeMode={"contain"}

              />
            </View>            
            <View padding-10 center>
              <Text h4 black marginB-15 center>{item._data.name}</Text>
              <View row>
                <Text h5 grey40>Sala(s): </Text>
                <Text h5 black flex style={{flexWrap: 'wrap'}}>{item._data.room}</Text>
              </View>              
            </View>
          </Card>
        )}
      />
    </ScrollView>
  )
}



const styles = StyleSheet.create({    
  headingArticleContainer: {
    resizeMode:"contain",
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,  }
});