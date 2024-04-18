package com.plugpag

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.plugpag.sunmi.SunmiRfidReader
import com.plugpag.utils.SunmiUtils

class PlugpagModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
  private var sunmiRfidReader: SunmiRfidReader? = null
  private var plugpagImpl: PlugpagImpl? = null

  init {
    if (SunmiUtils.isSunmiP2()) {
      sunmiRfidReader = SunmiRfidReader(reactContext)
      sunmiRfidReader!!.bindService()
    }
  }

  companion object {
    const val NAME = "Plugpag"
  }

  override fun getName(): String {
    return NAME
  }

  private fun checkPlugpag() {
    if (plugpagImpl == null)
      throw Exception("Plugpag is not initiated! Did you use initPlugpag(code: string) method before calling this method?")
  }

  @ReactMethod
  fun readRfidCardInSunmi(promise: Promise) {
    if (sunmiRfidReader == null)
      return promise.reject("500", "SunmiRfidReader is null! You may not working in a Sunmi P2!")
    this.sunmiRfidReader!!.searchCard(promise)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun cancelRfidCardSearchInSunmi() {
    this.sunmiRfidReader?.cancelSearch()
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun initPlugpag(code: String) {
    if (plugpagImpl != null)
      throw Exception("Plugpag has already been initiated with code: '" + plugpagImpl!!.getActivationCode() + "'!")
    plugpagImpl = PlugpagImpl(reactContext, code)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun destroyPlugpag() {
    plugpagImpl = null
  }

  @ReactMethod
  fun pay(
    rechargeValue: Int,
    transactionType: String,
    eventListener: PlugPagEventListener,
    promise: Promise
  ) {
    try {
      checkPlugpag()
      plugpagImpl!!.pay(rechargeValue, transactionType, eventListener, promise)
    } catch (e: Exception) {
     e.printStackTrace()
     promise.reject(e)
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun abortPayment() {
    checkPlugpag()
    plugpagImpl?.abortTransaction()
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun printEstablishmentReceipt() {
    checkPlugpag()
    plugpagImpl?.printEstablishmentReceipt()
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun printClientReceipt() {
    checkPlugpag()
    plugpagImpl?.printClientReceipt()
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun customDialogClientViaPrinter(color: String) {
    checkPlugpag()
    plugpagImpl?.customDialogClientViaPrinter(color)
  }
}
