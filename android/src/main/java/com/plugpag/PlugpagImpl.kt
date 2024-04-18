package com.plugpag

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagActivationData
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagCustomPrinterLayout
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagEventListener
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPaymentData
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.plugpag.utils.PlugpagUtils

class PlugpagImpl(
  reactContext: ReactApplicationContext,
  private val activationCode: String
) {
  private val plugPag = PlugPag(reactContext)

  fun getActivationCode(): String {
    return activationCode
  }

  fun pay(
    rechargeValue: Int,
    transactionType: String,
    eventListener: PlugPagEventListener,
    promise: Promise
  ) {
    plugPag.setEventListener(eventListener)

    Thread {
      run {
        val paymentData = PlugpagUtils.resolveTransactionType(transactionType)?.let {
          PlugPagPaymentData(
            it,
            rechargeValue,
            PlugPag.INSTALLMENT_TYPE_A_VISTA,
            1,
            null
          )
        }

        val terminalResult = plugPag.initializeAndActivatePinpad(
          PlugPagActivationData(activationCode)
        )

        if (terminalResult.result == PlugPag.RET_OK) {
          val paymentResult = paymentData?.let { plugPag.doPayment(it) }
          promise.resolve(paymentResult)
        } else {
          throw Exception("Error on initialize and activate pinpad. Maybe your activationCode is not valid!")
        }
      }
    }.start()
  }

  fun abortTransaction() {
    Thread {
      run {
        plugPag.abort()
      }
    }.start()
  }

  fun printEstablishmentReceipt() {
    plugPag.reprintStablishmentReceipt()
  }

  fun printClientReceipt() {
    plugPag.reprintCustomerReceipt()
  }

  fun customDialogClientViaPrinter(color: String) {
    Thread {
      run {
        val customPrinter = PlugPagCustomPrinterLayout()
        customPrinter.buttonBackgroundColor = color
        plugPag.setPlugPagCustomPrinterLayout(customPrinter)
      }
    }.start()
  }
}
