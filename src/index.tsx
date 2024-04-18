import { NativeModules, Platform } from 'react-native';
import type {
  API,
  SunmiAPI,
  PlugpagAPI,
  PlugPagEventListener,
  TransactionTypes,
} from './@types';
import { IOS_ERROR, LINKING_ERROR } from './errorMessages';

if (Platform.OS === 'ios') throw new Error(IOS_ERROR);

export const api: API = NativeModules.Plugpag
  ? NativeModules.Plugpag
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const readRfidCardInSunmi = () => api.readRfidCardInSunmi();
const cancelRfidCardSearchInSunmi = () => api.cancelRfidCardSearchInSunmi();
const initPlugpag = (activationCode: string) => api.initPlugpag(activationCode);
const destroyPlugpag = () => api.destroyPlugpag();
const pay = (
  rechargeValue: number,
  transactionType: TransactionTypes,
  eventListener: PlugPagEventListener
) => api.pay(rechargeValue, transactionType, eventListener);
const abortPayment = () => api.abortPayment();
const printEstablishmentReceipt = () => api.printEstablishmentReceipt();
const printClientReceipt = () => api.printClientReceipt();
const customDialogClientViaPrinter = () => api.customDialogClientViaPrinter();

const Sunmi: SunmiAPI = {
  readRfidCardInSunmi,
  cancelRfidCardSearchInSunmi,
};

const Plugpag: PlugpagAPI = {
  initPlugpag,
  destroyPlugpag,
  abortPayment,
  printEstablishmentReceipt,
  printClientReceipt,
  customDialogClientViaPrinter,
  pay,
};

export {
  Sunmi,
  readRfidCardInSunmi,
  cancelRfidCardSearchInSunmi,
  Plugpag,
  initPlugpag,
  destroyPlugpag,
  abortPayment,
  printEstablishmentReceipt,
  printClientReceipt,
  customDialogClientViaPrinter,
  pay,
};
