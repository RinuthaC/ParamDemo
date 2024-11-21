import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { PermissionsAndroid, Platform, Text, View } from "react-native";
import { useCameraDevices } from "react-native-vision-camera";

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
      setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
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
    requestStoragePermission();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const capturedPhoto = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality', // prioritizing quality over speed
      });
      const label = `Photo ${capturedImages.length + 1}`; // Generate a label for the image
      setCapturedImages(prevImages => [
        ...prevImages,
        { ...capturedPhoto, label }, // Add label to the image object
      ]);
    }
  };

  const handleCloseCamera = () => {
    navigation.goBack();
  };

  if (!device) return <Text>Loading camera...</Text>;

  return (
    <View style={styles.cameraContainer}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        ref={cameraRef}
        photo={true}
      />
      <View style={styles.cameraControls}>
        {capturedImages.length > 0 && (
          <FlatList
            data={capturedImages} // Pass the array of photos
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                {/* Render Image */}
                <Image
                  source={{ uri: `file://${item.path}` }}
                  style={styles.capturedImage}
                />
                {/* Overlay Text */}
                <Text style={styles.imageOverlayText}>{item.label}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
            horizontal={true}
          />
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity onPress={handleCapture} style={styles.captureButton}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseCamera} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  imageContainer: {
    position: 'relative',
    margin: 5,
  },
  capturedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
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
});

export default CameraView;
