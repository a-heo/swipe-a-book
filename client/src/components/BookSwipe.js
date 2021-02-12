import React, { useState } from 'react';
import { View, Pressable, SafeAreaView } from 'react-native';

export default function BookSwipe() {
  const [books, setBooks] = useState([]);
  const [carousel, startCarousel] = useState(false);
  const [bookIndex, setBookIndex] = useState(0);


  return (
    <View>
      <Pressable>
      </Pressable>
    </View>
  );
};