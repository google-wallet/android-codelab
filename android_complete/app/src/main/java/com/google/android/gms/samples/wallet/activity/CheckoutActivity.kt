/*
 * Copyright 2022 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.android.gms.samples.wallet.activity

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.appcompat.app.AppCompatActivity

import com.google.android.gms.samples.wallet.databinding.ActivityCheckoutBinding
import com.google.android.gms.pay.Pay
import com.google.android.gms.pay.PayApiAvailabilityStatus
import com.google.android.gms.pay.PayClient


/**
 * Checkout implementation for the app
 */
class CheckoutActivity : AppCompatActivity() {

    private lateinit var layout: ActivityCheckoutBinding
    private lateinit var addToGoogleWalletButton: View

    // TODO: Add a request code for the save operation
    private val addToGoogleWalletRequestCode = 1000

    // TODO: Create a client to interact with the Google Wallet API
    private lateinit var walletClient: PayClient

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // TODO: Instantiate the Pay client
        walletClient = Pay.getClient(this)

        // Use view binding to access the UI elements
        layout = ActivityCheckoutBinding.inflate(layoutInflater)
        setContentView(layout.root)

        // TODO: Check if the Google Wallet API is available
        fetchCanUseGoogleWalletApi()

        // TODO: Set an on-click listener on the "Add to Google Wallet" button
        addToGoogleWalletButton = layout.addToGoogleWalletButton.root
        addToGoogleWalletButton.setOnClickListener {
            walletClient.savePasses(newObjectJson, this, addToGoogleWalletRequestCode)
        }
    }

    // TODO: Create a method to check for the Google Wallet SDK and API
    private fun fetchCanUseGoogleWalletApi() {
        walletClient
            .getPayApiAvailabilityStatus(PayClient.RequestType.SAVE_PASSES)
            .addOnSuccessListener { status ->
                if (status == PayApiAvailabilityStatus.AVAILABLE)
                    layout.passContainer.visibility = View.VISIBLE
            }
            .addOnFailureListener {
                // Hide the button and optionally show an error message
            }
    }

    // TODO: Handle the result
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == addToGoogleWalletRequestCode) {
            when (resultCode) {
                RESULT_OK -> {
                    // Pass saved successfully. Consider informing the user.
                }
                RESULT_CANCELED -> {
                    // Save canceled
                }

                PayClient.SavePassesResult.SAVE_ERROR -> data?.let { intentData ->
                    val errorMessage = intentData.getStringExtra(PayClient.EXTRA_API_ERROR_MESSAGE)
                    // Handle error. Consider informing the user.
                }

                else -> {
                    // Handle unexpected (non-API) exception
                }
            }
        }
    }

    // TODO: Create the pass object definition
    private val issuerEmail = "SERVICE_ACCOUNT_EMAIL"
    private val issuerId = "ISSUER_ID"
    private val objectId = "codelab_object"

    private val newObjectJson = """
    {
        "iss": "$issuerEmail",
        "aud": "google",
        "typ": "savetowallet",
        "origins": [
            "https://www.example.com"
        ],
        "payload": {
            "genericObjects": [
                {
                    "id": "$issuerId.$objectId"
                }
            ]
        }
    }
    """
}
