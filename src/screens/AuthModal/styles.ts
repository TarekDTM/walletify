import {StyleSheet} from 'react-native';
import {theme} from '../../../theme';

export const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    color: theme.colors.black,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blockstackText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  blockstackIdText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 28,
  },
  centeredView: {
    flex: 1,
    paddingVertical: 40,
    paddingTop: 50,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  modalView: {
    borderRadius: 20,
    paddingVertical: 35,
    alignItems: 'center',
  },
  loginButton: {
    padding: 16,
    backgroundColor: '#FFE6E3',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF0000',
    marginBottom: 20,
  },
  loginLogo: {width: 24, height: 24, marginRight: 9},
  buttonText: {color: '#FF0000', fontSize: 16, fontWeight: 'bold'},
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  contentWarning: {
    flexDirection: 'row',
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 16,
    width: '100%',
    marginRight: 10,
  },
  image: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
    borderRadius: 36,
    marginTop: -50,
  },
  warningText: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  flatlist: {
    width: '100%',
    padding: 16,
    borderRadius: 20,
    marginTop: 20,
    maxHeight: '100%',
  },
  cancel: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});
