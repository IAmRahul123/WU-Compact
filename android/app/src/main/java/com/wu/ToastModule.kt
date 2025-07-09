package com.wu

import android.graphics.Color
import android.graphics.Typeface
import android.os.Handler
import android.os.Looper
import android.view.Gravity
import android.widget.TextView
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ToastModule(private val context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {

    override fun getName(): String = "ToastModule"

    @ReactMethod
    fun showToast(message: String, status: String) {
        Handler(Looper.getMainLooper()).post {
            val toast = Toast.makeText(context, message, Toast.LENGTH_SHORT)
            val view = toast.view
            val text = view?.findViewById<TextView>(android.R.id.message)

            // === Styling ===
            text?.apply {
                gravity = Gravity.CENTER
                textSize = 16f
                setPadding(24, 16, 24, 16)
                setTypeface(typeface, Typeface.BOLD)
            }

            // === Background & Text Color based on Status ===
            when (status.lowercase()) {
                "success" -> {
                    view?.setBackgroundColor(Color.parseColor("#4CAF50")) // Green
                    text?.setTextColor(Color.WHITE)
                }
                "error" -> {
                    view?.setBackgroundColor(Color.parseColor("#F44336")) // Red
                    text?.setTextColor(Color.WHITE)
                }
                "pending" -> {
                    view?.setBackgroundColor(Color.parseColor("#FF9800")) // Orange
                    text?.setTextColor(Color.WHITE)
                }
                else -> {
                    view?.setBackgroundColor(Color.DKGRAY)
                    text?.setTextColor(Color.WHITE)
                }
            }

            // === Show on Top of the Screen ===
            toast.setGravity(Gravity.TOP or Gravity.FILL_HORIZONTAL, 0, 120)
            toast.show()
        }
    }
}
