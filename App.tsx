import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, PermissionsAndroid, Platform } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import TaskHeader from './TaskScreens/TaskHeader';
import TabNavigation from './TaskScreens/TabNavigation';
import AssetButton from './TaskScreens/AssetButton';
import AssetDropdown from './TaskScreens/AssetDropdown';
import ChecklistItem from './TaskScreens/ChecklistItem';
import data from '../CollapsibleCard/PM_updatedTaskListJSON.json';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native-elements';


const Stack = createStackNavigator();

const MainView = ({ navigation }) => {
  const { tasks, lineItems, assets } = data;
  const [expandedAssetIndex, setExpandedAssetIndex] = useState(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');


  const handleAssetButtonPress = (index: number | null) => {
    setExpandedAssetIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const navigateToCamera = () => {
    navigation.navigate('CameraView');
  };

  return (
    <ScrollView style={styles.container}>
      <TaskHeader task={tasks[0]} />
      <TabNavigation />

      {/* Render Asset Buttons */}
      <View style={styles.assetButtonsContainer}>
        {assets.map((asset, index) => (
          <AssetButton
            key={asset.id}
            index={index}
            onPress={() => handleAssetButtonPress(index)}
          />
        ))}
      </View>

      {/* Render AssetDropdown and Line Items */}
      {assets.map((asset, index) =>
        expandedAssetIndex === index ? (
          <View key={asset.id} style={styles.expandedContainer}>
            <AssetDropdown asset={asset} tasks={tasks} progress={0.7} lineItems={undefined} />

            {/* Render Line Items for the Expanded Asset */}
            {tasks
              .filter((task) => task.assetId === asset.id)
              .map((task) =>
                task.taskCheckLists.map((checkList) => (
                  <ChecklistItem
                    key={checkList.lineItemId}
                    checkList={checkList}
                    lineItems={lineItems} index={undefined}                  />
                ))
              )}
          </View>
        ) : null
      )}
      
    </ScrollView>
  );
};

const CameraView = () => {
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [capturedImages, setCapturedImages] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  // Request camera permissions
  async function requestCameraPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message: 'We need access to your camera',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permission granted');
            setHasPermission(true);
        } else {
            console.log('Camera permission denied');
            setHasPermission(false);
        }
    } catch (err) {
        console.warn(err);
        setHasPermission(false);
    }
}

// Request storage permissions (for saving and accessing photos)
async function requestStoragePermission() {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission',
                message: 'We need access to your storage to save images',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS does not require manual permissions for storage access
}

useEffect(() => {
    requestCameraPermission();
    requestStoragePermission(); // Request storage permission for Android
}, []);

  const handleCapture = async () =>{
    if(cameraRef.current) {
      const capturedPhoto = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality', // prioritizing quality over speed
    });
    const label = `Photo ${capturedImages.length + 1}`;
        setCapturedImages(prevImages => [...prevImages, capturedPhoto]); 
    }
  };

  const handleCloseCamera = () => {
    navigation.goBack();
    // navigation.navigate('MainView', { images: capturedImages });
  };
  console.log( "capturedImages",capturedImages);

  if (!device) return <Text>Loading camera...</Text>;
  return (
    <View style={styles.cameraContainer}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} ref={cameraRef} photo={true}/>
      <View style={styles.cameraControls}>
        {capturedImages && <FlatList
                        data={capturedImages} // Pass the array of photos
                        renderItem={({ item }) => ( // Correctly destructure 'item' from renderItem
                            <Image source={{ uri: `file://${item.path}` }} style={{ width: 50, height: 50, margin : 5}} />
                        )}
                        
                        keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
                        horizontal={true}
                    />
                    }
        <View style={{flexDirection : 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity onPress={handleCapture} style={styles.captureButton}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCloseCamera} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
    // <CameraView/>
  );
};

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="MainView" component={MainView} />
      <Stack.Screen name="CameraView" component={CameraView} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    padding: 16,
  },
  assetButtonsContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  expandedContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
  },
  addImageButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addImageText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
  },
  captureButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  imageOverlayText: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    paddingHorizontal: 4,
    borderRadius: 4,
  },
});

export default App;
