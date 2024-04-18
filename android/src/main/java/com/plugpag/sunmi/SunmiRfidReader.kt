package com.plugpag.sunmi

import android.os.Bundle
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.plugpag.utils.SunmiUtils
import com.sunmi.pay.hardware.aidl.AidlConstants
import com.sunmi.pay.hardware.aidlv2.readcard.CheckCardCallbackV2
import sunmi.paylib.SunmiPayKernel
import sunmi.paylib.SunmiPayKernel.ConnectCallback

class SunmiRfidReader(
  private val reactContext: ReactApplicationContext
) {
  private val payKernel = SunmiPayKernel.getInstance()
  private var attempt: Int = 0

  fun bindService() {
    payKernel.initPaySDK(reactContext, object : ConnectCallback {
      override fun onConnectPaySDK() {}

      override fun onDisconnectPaySDK() {}
    })
  }

  fun searchCard(promise: Promise) {
    try {
      cancelSearch()
      payKernel.mReadCardOptV2.checkCard(
        AidlConstants.CardType.MIFARE.value,
        object : CheckCardCallbackV2.Stub() {
        override fun findMagCard(bundle: Bundle) {
          handleOnFail("findMagCard", promise)
        }

        override fun findICCard(s: String) {
          handleOnFail("findICCard", promise)
        }

        override fun findRFCard(s: String) {
          promise.resolve(SunmiUtils.resolveRFIDBySerialNumber(s))
          cancelSearch()
        }

        override fun onError(i: Int, s: String) {
          handleOnFail("$i - $s", promise)
        }

        override fun findICCardEx(bundle: Bundle) {
          handleOnFail("findICCardEx", promise)
        }

        override fun findRFCardEx(bundle: Bundle) {
          handleOnFail("findRFCardEx", promise)
        }

        override fun onErrorEx(bundle: Bundle) {
          handleOnFail("onErrorEx", promise)
        }
      },
      0
            )
    } catch (e: Exception) {
      e.printStackTrace()
      promise.reject(e)
      cancelSearch()
    }
  }

  fun cancelSearch() {
    payKernel.mReadCardOptV2.cancelCheckCard()
  }

  private fun handleOnFail(errorMessage: String, promise: Promise) {
    attempt++
    if (attempt == 5) {
      promise.reject("500", errorMessage)
      attempt = 0
    }
    else searchCard(promise)
  }
}
