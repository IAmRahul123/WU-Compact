package com.wu.modules.toast

import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule
//import com.wu.modules.toast.NativeMyTurboModuleSpec // ✅ import the correct generated interface

@ReactModule(name = MyTurboModule.NAME)
// class MyTurboModule(
//   reactContext: ReactApplicationContext
// ) : NativeMyTurboModuleSpec(reactContext), TurboModule { // ✅ extends the generated interface
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

    Log.d("MyTurboModule", "Showing toast: $emoji $message")
    Toast.makeText(reactApplicationContext, "$emoji $message", Toast.LENGTH_SHORT).show()
  }
}
