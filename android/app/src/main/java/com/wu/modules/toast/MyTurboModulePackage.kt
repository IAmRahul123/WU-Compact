package com.wu.modules.toast

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.bridge.NativeModule
import com.facebook.react.module.annotations.ReactModule

class MyTurboModulePackage : TurboReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      "MyTurboModule" -> MyTurboModule(reactContext)
      else -> null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      mapOf(
        "MyTurboModule" to ReactModuleInfo(
          "MyTurboModule",
          "MyTurboModule",
          false,
          false,
          false,
          true // isTurboModule
        )
      )
    }
  }
}
