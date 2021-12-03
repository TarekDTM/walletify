import { StyleSheet } from 'react-native';

import { PADDING_HORIZONTAL } from '../../shared/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 24,
  },
  title: { textAlign: 'center' },
  buttonsContainer: { width: '100%', marginBottom: '25%' },
  bottomButton: { marginTop: 12 },
});

export default styles;