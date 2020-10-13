import React, { useState } from 'react';
import { View, Colors, Image, Card, Carousel } from 'react-native-ui-lib';
import { FlatList, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { Button, Text, List } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';

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
          <Text text70 color={Colors.white}>AÇÕES</Text>
        </Card>
        <View row>
          <Card
            flex
            margin-10
            onPress={() => { navigation.navigate("Complain") }}>
            <Card.Image height={120}
              imageSource={require('../../assets/megaphone.jpg')} />
            <View padding-5 center>
              <Text center text90 grey30 style={{ fontWeight: "bold" }}>
                RECLAMAR
              </Text>

            </View>
          </Card>
          <Card
            flex
            margin-10
            onPress={() => { navigation.navigate("Complain") }}>
            <Card.Image height={120}
              imageSource={require('../../assets/warning.jpg')} />
            <View padding-5 center>
              <Text center text90 grey30 style={{ fontWeight: "bold" }}>
                SUGERIR
              </Text>

            </View>
          </Card>
        </View>
      </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  readButton: {
    width: '50%',
    marginTop: 32,
  },
  headingArticleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 320,
  },
  headingArticleTitle: {
    zIndex: 1,
    textAlign: 'center',
  },
  headingArticleDescription: {
    zIndex: 1,
  },
  item: {
    flexDirection: 'row',
    minHeight: 188,
  },
  itemReverse: {
    flexDirection: 'row-reverse',
  },
  itemSection: {
    flex: 1,
    padding: 16,
  },
  itemReactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginHorizontal: -8,
  },
  itemTitle: {
    flex: 1,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});