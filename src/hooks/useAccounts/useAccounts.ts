import { useAtomValue } from 'jotai/utils';
import {
  createWalletGaiaConfig,
  generateNewAccount,
  updateWalletConfig,
} from '@stacks/wallet-sdk/dist';
import {
  makeSTXTokenTransfer,
  broadcastTransaction,
  AnchorMode,
  SignedTokenTransferOptions,
  getNonce,
  setNonce,
  estimateTransaction,
} from '@stacks/transactions/dist';
import {
  accountAvailableStxBalanceState,
  accounts,
  selectedAccount,
  selectedAccountIndex,
} from './accountsStore';
import { useAtom } from 'jotai';
import { wallet } from '../useWallet/walletStore';
import { gaiaUrl } from '../../shared/constants';
import { selectedNetwork } from '../useNetwork/networkStore';
import { createTokenTransferPayload } from '@stacks/transactions/dist/payload';

export const useAccounts = () => {
  const network = useAtomValue(selectedNetwork);
  const walletAccounts = useAtomValue(accounts);
  const [currentWallet, setCurrentWallet] = useAtom(wallet);
  const [selectedAccountIndexState, setSelectedAccountIndexState] =
    useAtom(selectedAccountIndex);
  const selectedAccountState = useAtomValue(selectedAccount);

  const createAccount = async () => {
    if (currentWallet) {
      const newWallet = generateNewAccount(currentWallet);
      try {
        const updateConfig = async () => {
          const gaiaHubConfig = await createWalletGaiaConfig({
            gaiaHubUrl: gaiaUrl,
            wallet: newWallet,
          });
          await updateWalletConfig({
            wallet: newWallet,
            gaiaHubConfig,
          });
        };
        await updateConfig();
      } catch (e) {
        console.error('cant update wallet config', e);
      }
      setCurrentWallet(newWallet);
      setSelectedAccountIndexState(newWallet.accounts.length - 1);
    }
  };

  const switchAccount = (accountIndex: number) => {
    setSelectedAccountIndexState(accountIndex);
  };

  const estimateTransactionFees = async (
    recipientAddress: string,
    amount: number,
    memo?: string,
  ) => {
    const txOptions = {
      recipient: recipientAddress,
      amount: amount * 1000000, // To convert from micro STX to STX
      senderKey: selectedAccountState?.stxPrivateKey,
      memo: memo,
      anchorMode: AnchorMode.Any,
      network: network.stacksNetwork,
    } as SignedTokenTransferOptions;

    const transaction = await makeSTXTokenTransfer(txOptions);

    const estimatedLen = transaction.serialize().byteLength;
    const payload = createTokenTransferPayload(
      txOptions.recipient,
      txOptions.amount,
      txOptions.memo,
    );
    const txFee = await estimateTransaction(
      payload,
      estimatedLen,
      network.stacksNetwork,
    );

    return Number(txFee[1].fee) / 1000000;
  };

  const sendTransaction = async (
    recipientAddress: string,
    amount: number,
    fee: number,
    memo?: string,
  ) => {
    if (selectedAccountState?.address === undefined) {
      return;
    }

    const nonce =
      (await getNonce(selectedAccountState.address, network.stacksNetwork)) +
      BigInt(1);

    const txOptions = {
      recipient: recipientAddress,
      amount: amount * 1000000, // To convert from micro STX to STX
      senderKey: selectedAccountState?.stxPrivateKey,
      memo: memo,
      anchorMode: AnchorMode.Any,
      network: network.stacksNetwork,
      fee: fee * 1000000, // To convert from micro STX to STX,
      nonce,
    } as SignedTokenTransferOptions;

    const transaction = await makeSTXTokenTransfer(txOptions);

    const broadcastResponse = await broadcastTransaction(
      transaction,
      network.stacksNetwork,
    );

    await setNonce(transaction.auth, nonce);

    return broadcastResponse;
  };

  return {
    walletAccounts,
    selectedAccountState,
    selectedAccountIndexState,
    createAccount,
    switchAccount,
    estimateTransactionFees,
    sendTransaction,
  };
};

export function useAccountAvailableStxBalance(address: string) {
  return useAtomValue(accountAvailableStxBalanceState(address));
}
