import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  logo: {
    fontFamily: 'Gillsans',
    fontSize: 50,
    // fontWeight: 'bold',
    textAlign: 'center',
    color: '#f18c8e',
    marginBottom: 20,
    // animation: ${blinkingEffect} 7s linear infinite;
  },
});

const button = StyleSheet.create({
  main: {
    fontFamily: 'Hiragino Sans',
    fontSize: 20,
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2
  },
  open: {
    backgroundColor: '#ffa372',
  },
  close: {
    backgroundColor: '#cee397',
  }
});

const modal = StyleSheet.create({
  view: {
    marginTop: 300,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2
  }
});

module.exports = { styles, button, modal };
