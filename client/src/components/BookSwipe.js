import React, { useState, useEffect } from 'react';
import {
  View, Pressable, SafeAreaView, Animated, Text, Dimensions, Image, PanResponder
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function BookSwipe({ data }) {
  const [books, setBooks] = useState([]);
  const [carousel, startCarousel] = useState(false);
  const [bookIndex, setBookIndex] = useState(0);
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

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });

  const rotateNtranslate = {
    transform: [{
      rotate: rotate
    },
    ...position.getTranslateTransform()
    ]
  };

  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp'
  });

  const nextBookOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  });

  const nextBookScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp'
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (event, gestureState) => true,
    onPanResponderMove: (event, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.spring(position, {
          toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
          useNativeDriver: true,
        }).start(() => {
          setBookIndex(bookIndex + 1);
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gestureState.dx < -120) {
        Animated.spring(position, {
          toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          useNativeDriver: true,
        }).start(() => {
          setBookIndex(bookIndex + 1);
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    }
  });

  const renderBookCovers = () => {
    return books.map((item, i) => {
      if (i < bookIndex) {
        return null;
      } else if (i === bookIndex) {
        return (
          <View>
          <Animated.View
          style={{
          opacity: likeOpacity,
          position: "absolute",
          top: 200,
          left: 50,
          zIndex: 1000
          }}
        >
          <Icon name='heart' size={300} color='red' solid />
        </Animated.View>
        <Animated.View
          style={{
          opacity: nopeOpacity,
          position: "absolute",
          top: 200,
          left: 100,
          zIndex: 1000
          }}
        >
          <Icon name='times' size={300} color='black' solid />
        </Animated.View>
          <Animated.View
            {...panResponder.panHandlers}
            key= {i}
            style={
              [rotateNtranslate,
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
          </View>
        );
      } else {
        return (
          <Animated.View
            key= {i}
            style={{
              opacity: nextBookOpacity,
              transform: [{ scale: nextBookScale }],
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
