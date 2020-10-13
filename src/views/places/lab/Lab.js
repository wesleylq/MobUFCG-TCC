import React from 'react'
import { ScrollView, ImageBackground,Image  } from 'react-native'
import { Button, Card, Text, StyleService, List } from '@ui-kitten/components';
import { View } from 'react-native-ui-lib';

const images = [
  {title:"photo1"},
  {title:"photo2"},
  {title:"photo3"},
]

export default function Lab({route}) {


  const {lab} = route.params;

  const renderImageItem = () => (
    <Image
      style={styles.imageItem}
      source={{uri:"https://i.pinimg.com/originals/a0/90/d1/a090d1a2a5df9261d8bc7149cd73a3c9.jpg"}}
    />
  );

  return (
    <ScrollView style={{backgroundColor:"#F2F6FF"}}>
      <ImageBackground
        source={{uri:lab.cover}}
        imageStyle={{resizeMode: 'contain',}}
        style={{
          flex:1,
          justifyContent: "center",
          height:250,
          marginVertical:10          
        }}
      />
      <View flex>
      <Card
        style={styles.bookingCard}
        appearance='filled'
        disabled={true}
        //footer={renderBookingFooter}
        >
        <Text
          style={styles.title}
          category='h6'>
          {lab.name}
        </Text>
        <Text
          style={styles.rentLabel}
          appearance='hint'
          category='p2'>
          Sala(s)
        </Text>
        <Text
          style={styles.priceLabel}
          category='h6'>
          {lab.room}
        </Text>
        <Button
          style={styles.bookButton}
          //onPress={onBookButtonPress}
          >
          LOCALIZAR
        </Button>
      </Card>

      <Text
        style={styles.sectionLabel}
        category='s1'>
        Professor Responsável
      </Text>
      <Text
        style={styles.description}
        appearance='hint'>
        {lab.coordinator}
      </Text>

      <Text
        style={styles.sectionLabel}
        category='s1'>
        Tipo do Laboratório
      </Text>
      <Text
        style={styles.description}
        appearance='hint'>
        {lab.labType}
      </Text>

      <Text
        style={styles.sectionLabel}
        category='s1'>
        Descrição
      </Text>
      <Text
        style={styles.description}
        appearance='hint'>
        {lab.description}
      </Text>

      <Text
        style={styles.sectionLabel}
        category='s1'>
        Area(s) de conhecimento
      </Text>
      <Text
        style={styles.description}
        appearance='hint'>
        {lab.knowlegdeArea}
      </Text>

      <Text
        style={styles.sectionLabel}
        category='s1'>
        Pessoas envolvidas
      </Text>
      <Text
        style={styles.description}
        appearance='hint'>
        {lab.people}
      </Text>
      

      <Text
        style={styles.sectionLabel}
        category='s1'>
        About
      </Text>
      <Text
        style={styles.description}
        appearance='hint'>
        saddddddddddsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdssddd
      </Text>



      <Text
        style={styles.sectionLabel}
        category='s1'>
        Fotos
      </Text>
      <List
        contentContainerStyle={styles.imagesList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={renderImageItem}
      />
      

      </View>
      
    </ScrollView>
  )
}

const styles = StyleService.create({
  container: {
    backgroundColor: "#F2F6FF",
  },
  image: {
    height: 360,
  },
  bookingCard: {
    marginTop: 0,
    margin: 16,
  },
  title: {
    width: '65%',
  },
  rentLabel: {
    marginTop: 24,
  },
  priceLabel: {
    marginTop: 8,
  },
  bookButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  detailsList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
    textAlign:"auto"
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  imagesList: {
    padding: 8,
    backgroundColor: "#F2F6FF",
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});