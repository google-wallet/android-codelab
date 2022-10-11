const { GoogleAuth } = require('google-auth-library');

// TODO: Define issuer ID
let issuerId = 'ISSUER_ID';
let classSuffix = 'codelab_class';
let objectSuffix = 'codelab_object';
const objectId = `${issuerId}.${objectSuffix}`;
const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS || '/path/to/key.json';

const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

const credentials = require(keyFilePath);

const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
});

// Create a Generic pass object
let genericObject = {
  'id': `${objectId}`,
  'classId': `${issuerId}.${classSuffix}`,
  'genericType': 'GENERIC_TYPE_UNSPECIFIED',
  'hexBackgroundColor': '#4285f4',
  'logo': {
    'sourceUri': {
      'uri': 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg'
    }
  },
  'cardTitle': {
    'defaultValue': {
      'language': 'en-US',
      'value': 'Google I/O \'22  [DEMO ONLY]'
    }
  },
  'subheader': {
    'defaultValue': {
      'language': 'en-US',
      'value': 'Attendee'
    }
  },
  'header': {
    'defaultValue': {
      'language': 'en-US',
      'value': 'Alex McJacobs'
    }
  },
  'barcode': {
    'type': 'QR_CODE',
    'value': `${objectId}`
  },
  'heroImage': {
    'sourceUri': {
      'uri': 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-hero-demo-only.jpg'
    }
  },
  'textModulesData': [
    {
      'header': 'POINTS',
      'body': '1234',
      'id': 'points'
    },
    {
      'header': 'CONTACTS',
      'body': '20',
      'id': 'contacts'
    }
  ]
}

// Check if the object exists already
httpClient.request({
  url: `${baseUrl}/genericObject/${objectId}`,
  method: 'GET',
}).then(response => {
  console.log('Object already exists');
  console.log(response);

  console.log('Object ID');
  console.log(response.data.id);
}).catch(err => {
  if (err.response && err.response.status === 404) {
    // Object does not exist
    // Create it now
    httpClient.request({
      url: `${baseUrl}/genericObject`,
      method: 'POST',
      data: genericObject,
    }).then(response => {
      console.log('Object insert response');
      console.log(response);

      console.log('Object ID');
      console.log(response.data.id);
    });
  } else {
    // Something else went wrong
    console.log(err);
  }
});
