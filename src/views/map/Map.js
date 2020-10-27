import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { View, Text, Colors, Toast, Image, Button } from 'react-native-ui-lib';
import MapView, { Polygon, Marker } from 'react-native-maps';
import MapStyle from "./MapStyle"
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
//import labs from '../../labs.json'


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

  const [panelActive, setPanelActive] = useState(false)
  const [toast, setToast] = useState(true)

  //search
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(buildings);

  
  _onClick = (place) => {
    console.log(place)
    setclick(place.id)

    setBuildingCover(place.cover == null || place.cover == "" ?
      "https://www.camaramatozinhos.mg.gov.br/wp-content/uploads/2018/05/sem-foto.jpg"
      : place.cover)
    setBuildingName(place.name)
    setMarkerCoord(place.coord)
    setShowMarker(true)
    setPanelActive(true)

  }

  const onSelect = (index) => {
    //setValue(buildings[index]._data.name);
    _onClick(buildings[index]._data)
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(buildings.filter(item => filter(item, query)));
  };


  useEffect(() => {
    firestore()
      .collection('Buildings')
      .get()
      .then(documentSnapshot => {
        setBuildings(documentSnapshot._docs);
      });
  }, [])



  const renderOption = (item, index) => ( 
    <AutocompleteItem
      key={index}
      title={item._data.name}
    />
  );

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

        <View margin-10 center >
          <Autocomplete
            style={{ width: "75%" }}
            placeholder='Procurar...'
            value={value}
            onSelect={onSelect}
            onChangeText={onChangeText}>
            {buildings.map(renderOption)}
          </Autocomplete>
        </View>

        <SwipeablePanel
          onlySmall={true}
          fullWidth={true}
          showCloseButton={true}
          isActive={panelActive}
          onClose={() => setPanelActive(false)}
          onPressCloseButton={() => setPanelActive(false)}
        >
          <View flex center>

            <Image style={{ height: 125, width: "100%", borderRadius: 10 }}
              resizeMode={"contain"} source={{ uri: buildingCover }} />


            <View center margin-10>
              <Text text70 style={{ fontWeight: "bold" }}>{buildingName}</Text>
            </View>

            <Button label={"Ver Salas"}
              onPress={() => { navigation.navigate("Building", { buildingId: click }) }}
            />



          </View>
        </SwipeablePanel>
        <Toast
          visible={toast}
          position={'bottom'}
          //backgroundColor={Colors.orange10}
          message={"Selecione um bloco e conheça todos os laboratórios!"}
          onDismiss={() => setToast(false)}
          autoDismiss={3000}
          showDismiss={true}
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
  }
});


