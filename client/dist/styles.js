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

const text = StyleSheet.create({
  basic: {
    margin: 10,
  }
});

const button = StyleSheet.create({
  main: {
    fontFamily: 'Hiragino Sans',
    fontSize: 20,
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
    overflow: 'hidden'
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
    borderRadius: 60,
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
  },
  formview: {
    flexDirection: 'row',
  },
  form: {
    borderWidth: 1,
    width: 150,
    borderRadius: 10,
    borderColor: 'grey',
    padding: 3,
    marginBottom: 10,
  }
});

module.exports = {
  styles, text, button, modal
};
