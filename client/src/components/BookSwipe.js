import React, { useState, useEffect } from 'react';
import {
  View, Pressable, SafeAreaView, Animated, Text, Dimensions, Image, PanResponder
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function BookSwipe({ data }) {
  const [books, setBooks] = useState([]);
  const [carousel, startCarousel] = useState(false);
  const [bookIndex, setBookIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();

  useEffect(() => {
    const setSlider = (query, callback) => {
      setBooks(query);
      callback();
    };
    setSlider(data, () => {
      if (data.length > 0) {
        startCarousel(true);
      }
    });
  }, [data]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
       position.setValue({ x: gestureState.dx, y: gestureState.dy });
  },
    onPanResponderRelease: (evt, gestureState) => {
    }
  });

  const renderBookCovers = () => {
    return books.map((item, i) => {
      if (i < currentIndex) {
        return null;
      } else if (i === currentIndex) {
        return (
          <Animated.View
            {...panResponder.panHandlers}
            key= {i}
            style={
              [{ transform: position.getTranslateTransform() },
              {
              height: SCREEN_HEIGHT - 120,
              width: SCREEN_WIDTH ,
              padding: 10,
              position: 'absolute'
              }]
            }
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 20,
              }}
              source={{ uri: `${item.volumeInfo.imageLinks.thumbnail}` }}
            />
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key= {i}
            style={{
              height: SCREEN_HEIGHT - 120,
              width: SCREEN_WIDTH ,
              padding: 10,
              position: 'absolute'
            }}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 20,
              }}
              source={{ uri: `${item.volumeInfo.imageLinks.thumbnail}` }}
            />
          </Animated.View>
        );
      }
    }).reverse();
  };

  return (
    <SafeAreaView>
      <View style={{ flex: 1 }}>
        <View style={{ height: 30, width: SCREEN_WIDTH }} />
        <View style={{ flex: 1 }}>
          {renderBookCovers()}
        </View>
        <View style={{ height: 60 }} />
      </View>
    </SafeAreaView>
  );
}
