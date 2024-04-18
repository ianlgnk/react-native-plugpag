export interface SunmiAPI {
  readRfidCardInSunmi: () => Promise<string>;
  cancelRfidCardSearchInSunmi: () => void;
}
