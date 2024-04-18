export interface PlugpagAPI {
  initPlugpag: (activationCode: string) => void;
  destroyPlugpag: () => void;
  pay: (
    rechargeValue: number,
    transactionType: TransactionTypes,
    eventListener: PlugPagEventListener
  ) => Promise<PlugPagTransactionResult>;
  abortPayment: () => void;
  printEstablishmentReceipt: () => void;
  printClientReceipt: () => void;
  customDialogClientViaPrinter: () => void;
}

export type TransactionTypes = 'debitCard' | 'creditCard' | 'pix' | 'voucher';

export interface PlugPagEventListener {
  onEvent(data: PlugPagEventData): void;
}

export interface PlugPagEventData {
  readonly EVENT_CODE_ACTIVATION_SUCCESS: number;
  readonly EVENT_CODE_AUTHORIZING: number;
  readonly EVENT_CODE_CAR_BIN_OK: number;
  readonly EVENT_CODE_CAR_BIN_REQUESTED: number;
  readonly EVENT_CODE_CAR_HOLDER_OK: number;
  readonly EVENT_CODE_CAR_HOLDER_REQUESTED: number;
  readonly EVENT_CODE_CONTACTLESS_ERROR: number;
  readonly EVENT_CODE_CONTACTLESS_ON_DEVICE: number;
  readonly EVENT_CODE_CUSTOM_MESSAGE: number;
  readonly EVENT_CODE_CVV_OK: number;
  readonly EVENT_CODE_CVV_REQUESTED: number;
  readonly EVENT_CODE_DEFAULT: number;
  readonly EVENT_CODE_DIGIT_PASSWORD: number;
  readonly EVENT_CODE_DOWNLOADING_TABLES: number;
  readonly EVENT_CODE_INSERTED_CARD: number;
  readonly EVENT_CODE_NO_PASSWORD: number;
  readonly EVENT_CODE_PIN_OK: number;
  readonly EVENT_CODE_PIN_REQUESTED: number;
  readonly EVENT_CODE_RECORDING_TABLES: number;
  readonly EVENT_CODE_REMOVED_CARD: number;
  readonly EVENT_CODE_SALE_APPROVED: number;
  readonly EVENT_CODE_SALE_END: number;
  readonly EVENT_CODE_SALE_NOT_APPROVED: number;
  readonly EVENT_CODE_SOLVE_PENDINGS: number;
  readonly EVENT_CODE_SUCCESS: number;
  readonly EVENT_CODE_USE_CHIP: number;
  readonly EVENT_CODE_USE_TARJA: number;
  readonly EVENT_CODE_WAITING_CARD: number;
  readonly EVENT_CODE_WAITING_REMOVE_CARD: number;
  customMessage?: string;
  eventCode: number;
}

export interface PlugPagTransactionResult {
  message?: string;
  errorCode?: string;
  transactionCode?: string;
  transactionId?: string;
  date?: string;
  time?: string;
  hostNsu?: string;
  cardBrand?: string;
  bin?: string;
  holder?: string;
  userReference?: string;
  terminalSerialNumber?: string;
  amount?: string;
  availableBalance?: string;
  cardApplication?: string;
  label?: string;
  holderName?: string;
  extendedHolderName?: string;
  cardIssuerNationality?: string;
  result?: number;
  readerModel?: string;
  nsu?: string;
  autoCode?: string;
  installments?: number;
  originalAmount?: number;
  buyerName?: string;
  paymentType?: number;
  typeTransaction?: string;
  appIdentification?: string;
  cardHash?: string;
  preAutoDueDate?: string;
  preAutoOriginalAmount?: string;
  userRegistered?: number;
  accumulatedValue?: string;
  consumerIdentification?: string;
  currentBalance?: string;
  consumerPhoneNumber?: string;
  clubePagScreensIds?: string;
  partialPayPartiallyAuthorizedAmount?: string;
  partialPayRemainingAmount?: string;
}
