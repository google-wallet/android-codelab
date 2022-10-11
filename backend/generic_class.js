const { GoogleAuth } = require('google-auth-library');

// TODO: Define issuer ID
let issuerId = 'ISSUER_ID';
let classSuffix = 'codelab_class';
const classId = `${issuerId}.${classSuffix}`;
const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS || '/path/to/key.json';

const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

const credentials = require(keyFilePath);

const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
});

// Create a Generic pass class
let genericClass = {
  'id': `${classId}`,
  'classTemplateInfo': {
    'cardTemplateOverride': {
      'cardRowTemplateInfos': [
        {
          'twoItems': {
            'startItem': {
              'firstValue': {
                'fields': [
                  {
                    'fieldPath': 'object.textModulesData["points"]',
                  },
                ],
              },
            },
            'endItem': {
              'firstValue': {
                'fields': [
                  {
                    'fieldPath': 'object.textModulesData["contacts"]',
                  },
                ],
              },
            },
          },
        },
      ],
    },
    'detailsTemplateOverride': {
      'detailsItemInfos': [
        {
          'item': {
            'firstValue': {
              'fields': [
                {
                  'fieldPath': 'class.imageModulesData["event_banner"]',
                },
              ],
            },
          },
        },
        {
          'item': {
            'firstValue': {
              'fields': [
                {
                  'fieldPath': 'class.textModulesData["game_overview"]',
                },
              ],
            },
          },
        },
        {
          'item': {
            'firstValue': {
              'fields': [
                {
                  'fieldPath': 'class.linksModuleData.uris["official_site"]',
                },
              ],
            },
          },
        },
      ],
    },
  },
  'imageModulesData': [
    {
      'mainImage': {
        'sourceUri': {
          'uri': 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-2021-card.png',
        },
        'contentDescription': {
          'defaultValue': {
            'language': 'en-US',
            'value': 'Google I/O 2022 Banner',
          },
        },
      },
      'id': 'event_banner',
    },
  ],
  'textModulesData': [
    {
      'header': 'Gather points meeting new people at Google I/O',
      'body': 'Join the game and accumulate points in this badge by meeting other attendees in the event.',
      'id': 'game_overview',
    },
  ],
  'linksModuleData': {
    'uris': [
      {
        'uri': 'https://io.google/2022/',
        'description': 'Official I/O \'22 Site',
        'id': 'official_site',
      },
    ],
  },
};

// Check if the class exists already
httpClient.request({
  url: `${baseUrl}/genericClass/${classId}`,
  method: 'GET',
}).then(response => {
  console.log('Class already exists');
  console.log(response);

  console.log('Class ID');
  console.log(response.data.id);
}).catch(err => {
  if (err.response && err.response.status === 404) {
    // Class does not exist
    // Create it now
    httpClient.request({
      url: `${baseUrl}/genericClass`,
      method: 'POST',
      data: genericClass,
    }).then(response => {
      console.log('Class insert response');
      console.log(response);

      console.log('Class ID');
      console.log(response.data.id);
    });
  } else {
    // Something else went wrong
    console.log(err);
  }
});
