import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ThemeContext } from '../../contexts/Theme/theme';
import { useWallet } from '../../hooks/useWallet/useWallet';
import Header from '../../components/shared/Header';
import { RootStackParamList } from '../../navigation/types';
import HomeTabs from './HomeTabs';
import AccountBalanceCard from './AccountBalanceCard';
import Wise from '../../assets/wise.svg';
import Settings from '../../assets/images/settings/settings.svg';
import { styles } from './styles';
import { useAccounts } from '../../hooks/useAccounts/useAccounts';
import { Typography } from '../../components/shared/Typography';
import SwitchAccountBottomSheet from '../../components/Accounts/SwitchAccountBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import SwitchAccountButton from './SwitchAccountButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = (props: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { restoreWallet } = useWallet();
  const { dispatch } = useNavigation();
  const { switchAccount } = useAccounts();
  const bottomSheetModalRef = useRef<BottomSheet>(null);

  const { password, seedPhrase } = props.route.params;

  useEffect(() => {
    restoreWallet(seedPhrase, password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToSettings = () => dispatch(StackActions.push('Settings'));

  const handlePressSwitchAccount = useCallback(() => {
    bottomSheetModalRef.current?.snapToIndex(0);
  }, []);

  const handleCancelSwitchAccount = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSwitchAccount = useCallback((accountIndex: number) => {
    switchAccount(accountIndex);
    handleCancelSwitchAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <View style={styles.contentContainer}>
        <Header
          leftComponent={<Wise width={92} height={36} />}
          rightComponent={
            <TouchableOpacity
              onPress={goToSettings}
              activeOpacity={0.5}
              style={styles.settingsButton}>
              <Settings />
            </TouchableOpacity>
          }
        />
        <Typography
          type="commonText"
          style={[styles.pickAccountText, { color: colors.primary40 }]}>
          Pick an Account
        </Typography>
        <SwitchAccountButton
          handlePressSwitchAccount={handlePressSwitchAccount}
        />
        <AccountBalanceCard />
        <View style={styles.walletOperationsTabs}>
          <HomeTabs />
        </View>
      </View>
      <SwitchAccountBottomSheet
        bottomSheetRef={bottomSheetModalRef}
        onSwitch={handleSwitchAccount}
        onCancel={handleCancelSwitchAccount}
      />
    </View>
  );
};

export default Home;
