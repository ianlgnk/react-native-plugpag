import { NativeModules, Platform } from 'react-native';
import {
  type API,
  type SunmiAPI,
  type PlugpagAPI,
  type TransactionTypes,
  type PlugPagEventData,
  type PlugPagTransactionResult,
  PlugPagEvent,
  PlugPagResult,
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
const pay = (rechargeValue: string, transactionType: TransactionTypes) =>
  api.pay(rechargeValue, transactionType);
const abortPayment = () => api.abortPayment();
const printEstablishmentReceipt = () => api.printEstablishmentReceipt();
const printClientReceipt = () => api.printClientReceipt();
const customDialogClientViaPrinter = (color: string) =>
  api.customDialogClientViaPrinter(color);
const resolveTransactionEvent = (data: PlugPagEventData): string =>
  api.resolveTransactionEvent(data);

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
  resolveTransactionEvent,
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
  resolveTransactionEvent,
  PlugPagEvent,
  PlugPagResult,
};

export default {
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
  PlugPagEvent,
  PlugPagResult,
};

export type { PlugPagEventData, PlugPagTransactionResult, TransactionTypes };
