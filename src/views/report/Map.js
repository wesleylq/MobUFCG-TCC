import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { View, Text, Colors, Card, Image, Button, Toast } from 'react-native-ui-lib';
import MapView, { Polygon, Marker } from 'react-native-maps';
import MapStyle from "./MapStyle"
import { SwipeablePanel } from 'rn-swipeable-panel';
import firestore from '@react-native-firebase/firestore';



const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -7.214767;
const LONGITUDE = -35.909089;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default function Map({ navigation }) {

  const [reportDenied, setReportDenied] = useState(false)
  const [visible, setVisible] = useState(false)
  const [report, setReport] = useState(false)
  const [markers, setMarkers] = useState([])
  const [coord, setCoord] = useState({ latitude: 0, longitude: 0 })

  //Report
  const [panelActive, setPanelActive] = useState(false)
  const [pic, setPic] = useState(null)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [type, setType] = useState()
  const [status, setStatus] = useState()
  const [reportId, setReportId] = useState()

  useEffect(() => {
    firestore()
      .collection('Reports')
      .get()
      .then(documentSnapshot => {
        setMarkers(documentSnapshot._docs);
      });
  }, [])

  onMapPress = (e) => {
    report && setCoord(e.nativeEvent.coordinate)
  }

  viewMarker = (id) => {
    setReport(false)
    setPanelActive(true)
    setReportId(id)
    firestore()
      .collection('Reports')
      .doc(id)
      .get()
      .then(documentSnapshot => {
        const report = documentSnapshot._data
        setPic(report.pic == null ? "https://www.camaramatozinhos.mg.gov.br/wp-content/uploads/2018/05/sem-foto.jpg": report.pic)
        setTitle(report.title)
        setDescription(report.description)
        setType(report.type)
        setStatus(report.status)
      });
  }

  handleReport = () => {
    if (coord.latitude == 0) {
      setReportDenied(true)
    } else {
      navigation.navigate("RegisterReport", { coord: coord })
    }
  }


  return (
    <View style={styles.container}
    >
      <MapView
        onPress={onMapPress}
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
        {!report ? markers.map(marker => (
          <Marker
            coordinate={marker._data.coordinate}
            pinColor={marker._data.pinColor}


            onPress={() => viewMarker(marker._ref._documentPath._parts[1])}
          />
        )) :
          <Marker
            coordinate={coord}
            pinColor="blue"
          />
        }


      </MapView>


      <View style={styles.container}>

        <View flex row padding-10 margin-10 bottom right>
          <View margin-10>
            {report ?
              <Button label={"Confirmar"}
                onPress={() => handleReport()}
              />
              : null
            }
          </View>

          <View margin-10>
            <Button label={report ? "Cancelar" : "Reportar"}
              onPress={() => [setReport(!report),setType(null)]}
            />
          </View>
        </View>
      </View>

      {/** Toasts */}
      <Toast
        visible={report}
        position={'top'}
        backgroundColor={Colors.blue}
        message={"Marque no mapa o ponto do reporte"}
        onDismiss={() => setReport(false)}
      />

      <Toast
        visible={reportDenied}
        position={'top'}
        backgroundColor={Colors.orange10}
        message={"Marque um ponto no mapa para confirmar!"}
        onDismiss={() => setReportDenied(false)}
        autoDismiss={3000}
        showDismiss={true}
      />

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
            resizeMode={"contain"} source={{ uri: pic }} />


          <View center margin-10>
            <Text text60 blue20>{title}</Text>            
          </View>

          <View row center marginB-10>
            <Text grey40 text70 marginH-5>Status: <Text dark20>{status}</Text></Text>
            <Text grey40 text70 marginH-5>Tipo: <Text dark20>{type}</Text></Text>             
          </View>

          <Button label={"Ver Reporte e Discussões"}
            onPress={() => {
              navigation.navigate("Report", {
                id: reportId,
                pic: pic,
                title: title,
                description: description,                
                type: type,
                status: status
              })
            }}
          />



        </View>
      </SwipeablePanel>


    </View >
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
});


