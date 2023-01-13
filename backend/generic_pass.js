const { GoogleAuth } = require('google-auth-library');
const jwt = require('jsonwebtoken');

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
      'value': 'Google I/O \'22'
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

const claims = {
  iss: credentials.client_email, // `client_email` in service account file.
  aud: 'google',
  origins: ['http://localhost:3000'],
  typ: 'savetowallet',
  payload: {
    genericObjects: [genericObject],
  },
};

const token = jwt.sign(claims, credentials.private_key, {algorithm: 'RS256'});
console.log(token)