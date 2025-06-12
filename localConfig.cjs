/*!
 * Copyright (c) 2022-2024 Digital Bazaar, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
// Rename this file to .localConfig.cjs
// you can specify a BASE_URL before running the tests such as:
// BASE_URL=http://localhost:40443/zDdfsdfs npm test
const baseUrl = process.env.BASE_URL || 'http://localhost:5000/api/v1';

module.exports = {
  settings: {
    enableInteropTests: false, // default
    testAllImplementations: false // default
  },
  implementations: [{
    name: 'Blockcerts',
    implementation: 'Blockcerts',
    issuers: [{
      id: 'did:myMethod:implementation:issuer:id',
      endpoint: `${baseUrl}/credentials/issue/ethereum/sepolia`,
      supports: {
        vc: ['1.1', '2.0']
      },
      tags: ['merkle-proof-2019', 'localhost']
    }],
    verifiers: [{
      id: 'did:myMethod:implementation:verifier:id',
      endpoint: `${baseUrl}/credentials/verify`,
      tags: ['merkle-proof-2019', 'localhost']
    }]
  }]
};
