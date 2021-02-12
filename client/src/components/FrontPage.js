import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text, View, Pressable
} from 'react-native';
import { styles, text, button } from '../../dist/styles';

import BookSwipe from './BookSwipe';

const axios = require('axios');


export default function FrontPage({ userBooks, userId, username }) {
  const [data, setData] = useState([]);
  const [genreButton, clickButton] = useState(false);
  const [genre, changeGenre] = useState('');

  useEffect(() => {
    if (genreButton) {
      loadSlider(genre);
    }
  }, [genre]);

  const handleClick = (e) => {
    e.preventDefault();
    changeGenre(e._dispatchInstances.memoizedProps.name);
    clickButton(!genreButton);
    // console.log(e._dispatchInstances.memoizedProps.name, 'handleclick');
  };

  console.log(genreButton, 'genreButton status');

  const loadSlider = (genreName) => {
    axios.get(`http://localhost:3000/api/books/${genreName}`)
      .then((response) => {
        // filter data with only those that have volumeinfo
        const books = response.data.filter(
          (book) => book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail,
        );
        setData(books);
      })
      .catch((error) => {
        console.log(error, 'loadslider unable to be retrieve');
      });
  };

  return (
    <View>
      {genreButton ? (<BookSwipe data={data}/>)
        : (
          <View>
            <Text>
              Hello
              {username}
            </Text>
            <Text>Select Your Genre</Text>
            <Pressable
              style={[button.main, button.close]}
              name="fiction"
              onPress={handleClick}
            >
              <Text>Fiction</Text>
            </Pressable>
            <Pressable
              style={[button.main, button.close]}
              onPress={() => { console.log('clicked'); }}
            >
              <Text>Children</Text>
            </Pressable>
            <Pressable
              style={[button.main, button.close]}
              onPress={() => { console.log('clicked'); }}
            >
              <Text>YA</Text>
            </Pressable>
            <Pressable
              style={[button.main, button.close]}
              onPress={() => { console.log('clicked'); }}
            >
              <Text>Graphic Novel</Text>
            </Pressable>
            <Pressable
              style={[button.main, button.close]}
              onPress={() => { console.log('clicked'); }}
            >
              <Text>Fantasy</Text>
            </Pressable>
            <Pressable
              style={[button.main, button.close]}
              onPress={() => { console.log('clicked'); }}
            >
              <Text>Mystery</Text>
            </Pressable>
          </View>
        )}
    </View>
  );
}
