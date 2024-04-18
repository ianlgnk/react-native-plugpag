package com.plugpag.utils

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag

class PlugpagUtils {
  companion object {
    fun resolveTransactionType(type: String): Int? {
      return when(type) {
        "debitCard" -> PlugPag.TYPE_DEBITO
        "creditCard" -> PlugPag.TYPE_CREDITO
        "voucher" -> PlugPag.TYPE_VOUCHER
        "pix" -> PlugPag.TYPE_PIX
        else -> null
      }
    }
  }
}
