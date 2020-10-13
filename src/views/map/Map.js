import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { View, Text, Colors, Card, Image } from 'react-native-ui-lib';
import MapView, { Polygon, Marker } from 'react-native-maps';
import MapStyle from "./MapStyle"
import BottomSheet from 'reanimated-bottom-sheet'
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
//import labs from '../../labs.json'

const movies = [
  { title: 'Star Wars' },
  { title: 'Back to the Future' },
  { title: 'The Matrix' },
  { title: 'Inception' },
  { title: 'Interstellar' },
];

const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -7.214767;
const LONGITUDE = -35.909089;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default function Map({ navigation }) {

  const [buildings, setBuildings] = useState([])

  const [markerCoord, setMarkerCoord] = useState({ latitude: 0, longitude: 0 })
  const [showMarker, setShowMarker] = useState(false)
  const [buildingCover, setBuildingCover] = useState(null)
  const [buildingName, setBuildingName] = useState(null)

  const [click, setclick] = useState(false)

  //search
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);

  const onSelect = (index) => {
    setValue(movies[index].title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(movies.filter(item => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
    />
  );

/*
  useEffect(() => {
    firestore()
      .collection('Buildings')
      .doc("LSP")
      .set({
        id: "LSP",
        name: "LSP",
        department: "CEEI",
        unity: "UAEE",
        logo: null,
        cover: null,
        coord: { latitude: -7.212354, longitude: -35.907784 },
        coords: [
          { latitude: -7.212293, longitude: -35.907858 },
          { latitude: -7.212294, longitude: -35.907715 },
          { latitude: -7.212418, longitude: -35.907714 },
          { latitude: -7.212420, longitude: -35.907859 },
         
                
        ]     
      })
      .then(() => {
        Alert.alert("Building cadastrado!")
      }).catch(error => console.error(error));
  }, [])
  */
  /*
  useEffect(() => {
    labs.LARCA.forEach(lab => {
      
      firestore()
      .collection('Buildings')
      .doc("CH1")
      .collection('Labs')
      .doc(lab.id)      
      .set({
        id: lab.id,
        name: lab.name,
        labType: lab.labType,
        coordinator: lab.coordinator,  
        department: "CEEI",
        unity: "UAEE",
        room: lab.room,
        description: lab.description,
        knowlegdeArea: lab.knowlegdeArea,
        people: lab.people,
        initDate: lab.initDate,
        logo: "",
        cover: "",
        images: [
        ]

      })
      .then(() => {
        Alert.alert("Lab cadastrado!")
      }).catch(error => console.error(error));


    });
    
  }, [])
*/
  useEffect(() => {

    firestore()
      .collection('Buildings')
      .get()
      .then(documentSnapshot => {
        setBuildings(documentSnapshot._docs);
      });
    this.bottomSheetRef = React.createRef();
    //console.log(labs.CC[0].coordinator)
    //_onClick(buildings[0]._data)

  }, [])


  _onClick = (place) => {
    setclick(place.id)

    setBuildingCover( place.cover == null || place.cover == "" ?
    "https://www.camaramatozinhos.mg.gov.br/wp-content/uploads/2018/05/sem-foto.jpg" 
    : place.cover)
    setBuildingName(place.name)
    setMarkerCoord(place.coord)
    setShowMarker(true)


    this.bottomSheetRef?.current?.snapTo(50);
  }


  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  )


  return (
    <View style={styles.container}
    >
      <MapView
        customMapStyle={MapStyle}
        //provider={this.props.provider}
        style={styles.map}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {buildings.map((building, index) => {
          return (
            <Polygon
              key={building._data.name}
              coordinates={building._data.coords}
              tappable={true}
              onPress={() => _onClick(building._data)}
              fillColor={"#237CBF"}
              strokeColor={click == building._data.name ? "#959595" : "#d5d5d5"}
              strokeWidth={1}
            />
          )
        })
        }

        {showMarker ?
          <Marker
            style={{ width: 48, height: 48 }}
            coordinate={markerCoord}
            pinColor={Colors.blue}
          />
          : null}


      </MapView>


      <View style={styles.container}>
        <View margin-10>
          <Autocomplete
            placeholder='Place your Text'
            value={value}
            onSelect={onSelect}
            onChangeText={onChangeText}>
            {data.map(renderOption)}
          </Autocomplete>
        </View>

        <BottomSheet
          ref={this.bottomSheetRef}
          snapPoints={[240, 40]}
          renderContent={() =>
            <View flexG bg-white paddingV-20>
              <View row left margin-10 marginV-20>
                <Image
                  style={{ height: 100, width: 200, borderRadius: 10, resizeMode:"cover" }}
                  source={{ uri: buildingCover }}
                />
                <View margin-10>
                  <Text text70>{buildingName}</Text>
                  <Text text70>Nome do Bloco</Text>
                </View>

              </View>


              <View row>
                <Card
                  flex
                  center
                  margin-5
                  style={{ backgroundColor: Colors.blue }}
                  onPress={() => { navigation.navigate("Building", {buildingId:click}) }}>
                  <Text>Saiba Mais</Text>
                </Card>
                <Card
                  flex center
                  margin-5
                  style={{ backgroundColor: Colors.blue }}
                  onPress={() => { navigation.navigate("Building", {buildingId: click}) }}>
                  <Text>Rota</Text>
                </Card>

              </View>
            </View>
          }
          renderHeader={() => renderHeader()}
        />
      </View>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    //justifyContent: 'flex-end',
    //alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  box: {
    width: 300,
    height: 200,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: '#f7f5eee8',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },

});


