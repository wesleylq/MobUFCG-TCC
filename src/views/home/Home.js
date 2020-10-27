import React, { useEffect, useState } from 'react';
import { View, Colors, Image, Card, Carousel, Text } from 'react-native-ui-lib';
import { FlatList, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { Button, List } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';


const images = [
  "https://paraibaonline.com.br/wp-content/uploads/2020/06/pr%C3%B3-reitoria-ufcg.jpg",
  "https://portal.ufcg.edu.br/images/conteudo/cadastramento_3.jpg",
  "http://sai.ufcg.edu.br/arquivos/images/conteudo/a-ufcg/campus_UFCG_aerea.JPG",
]


export default function Home({ navigation }) {

  return (
    <ScrollView>
      
      <View flex center backgroundColor={Colors.white} style={{ elevation: 1, justifyContent: "center", alignItems: "center" }}>

        <Carousel
          loop
          autoplay={true}
          containerStyle={{ height: 225, alignSelf: "center" }}
          itemSpacings={100}
          containerPaddingVertical={0}
          pageControlPosition={'under'}
          pageControlProps={{
            color: Colors.blue,
            containerStyle: {
              marginBottom: 15
            }
          }}
        >
          {images.map((image, index) => {
            return (
              <View key={index} paddingH-10 >
                <Image
                  style={{ borderRadius: 10 }}
                  cover={true}
                  source={{ uri: image }}
                />
              </View>
            );
          })}
        </Carousel>
      </View>

      <View>
        <Card row center marginH-10 marginT-20 marginB-10 style={{ backgroundColor: Colors.blue }}>
          <Text text70 color={Colors.white}>Mapas Interativos</Text>
        </Card>
      </View>

      <View flexG row>

        <Card
          flex
          margin-10
          onPress={() => { navigation.navigate("Map") }}>
          <Card.Image cover height={120}
            imageSource={require('../../assets/city.jpg')} />

          <View flex center padding-10 >
            <Text center text60 style={{ fontWeight: "bold" }}>
              Campus
            </Text>
            <Text center text90 style={{ fontWeight: "bold" }}>
              Saiba se localizar no Campus e conheça todas informações de blocos e laboratórios do campus da UFCG!
            </Text>
          </View>

        </Card>

        <Card
          flex
          margin-10
          onPress={() => { navigation.navigate("ReportMap") }}>
          <Card.Image cover height={120}
            imageSource={require('../../assets/pointer.jpg')} />
          <View flex center padding-10 >
            <Text center text60 style={{ fontWeight: "bold" }}>
              Reporte
            </Text>
            <Text center text90 style={{ fontWeight: "bold" }}>
              Veja, acompanhe e reporte sugestões, problemas e soluções para o Campus! Aqui você pode contribuir para o crescimento da Universidade! 
            </Text>
          </View>

        </Card>


      </View>



    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold"
  }
});