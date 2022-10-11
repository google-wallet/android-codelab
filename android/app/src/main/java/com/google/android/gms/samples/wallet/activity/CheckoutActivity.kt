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

    // TODO: Create a client to interact with the Google Wallet API

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // TODO: Instantiate the Pay client

        // Use view binding to access the UI elements
        layout = ActivityCheckoutBinding.inflate(layoutInflater)
        setContentView(layout.root)

        // TODO: Check if the Google Wallet API is available

        // TODO: Set an on-click listener on the "Add to Google Wallet" button
    }

    // TODO: Create a method to check for the Google Wallet SDK and API

    // TODO: Handle the result

    // TODO: Create the pass object definition
}
