package com.wu.modules.toast

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = MyTurboModule.NAME) // 🔸 Use the constant correctly
class MyTurboModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), TurboModule {

  companion object {
    const val NAME = "MyTurboModule"
  }

  override fun getName(): String = NAME

  @ReactMethod
  fun showToast(message: String, status: String) {
    val emoji = when (status.lowercase()) {
      "success" -> "\u2705"
      "pending" -> "\u23F3"
      "error"   -> "\u274C"
      else      -> "\u2753"
    }

    Toast.makeText(reactApplicationContext, "$emoji $message", Toast.LENGTH_SHORT).show()
  }
}
