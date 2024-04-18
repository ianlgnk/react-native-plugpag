import { NativeModules, Platform } from 'react-native';

const IOS_ERROR =
  "⚠️ The package 'react-native-plugpag' doesn't work in iOS environment!";

const LINKING_ERROR =
  `⚠️ The package 'react-native-plugpag' doesn't seem to be linked. Make sure: \n\n` +
  ' - You rebuilt the app after installing the package\n' +
  ' - You are not using Expo Go\n';

if (Platform.OS === 'ios') throw new Error(IOS_ERROR);

const Plugpag = NativeModules.Plugpag
  ? NativeModules.Plugpag
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return Plugpag.multiply(a, b);
}

export default Plugpag;
