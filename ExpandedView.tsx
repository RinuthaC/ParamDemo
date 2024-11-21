import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';


const ExpandedView = () => {
  const [images, setImages] = useState([]);

  const navigation = useNavigation()

  const handleAddImage = () => {
    navigation.navigate('CameraView', {
      onCapture: (image) => {
        setImages((prevImages) => [...prevImages, image]);
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Add Image Button */}
      <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
        <Text style={styles.addImageText}>Add Image</Text>
      </TouchableOpacity>

      {/* Display Captured Images */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScrollContainer}>
        {images.map((image, index) => (
          <View key={`image-${index}`} style={styles.imageThumbnailContainer}>
            <Image source={{ uri: image }} style={styles.imageThumbnail} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  addImageButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addImageText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  imageScrollContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageThumbnailContainer: {
    marginRight: 10,
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

export default ExpandedView;
