/*!
 * Copyright (c) 2022-2024 Digital Bazaar, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
// Rename this file to .localConfig.cjs
// you can specify a BASE_ISSUER_URL before running the tests such as:
// BASE_ISSUER_URL=http://localhost:40443/zDdfsdfs npm test
const baseIssuerUrl = process.env.BASE_ISSUER_URL || 'http://localhost:5000/api/v1';
const baseVerifierUrl = process.env.BASE_VERIFIER_URL || 'http://localhost:9000';

const issuerEndpoint = `${baseIssuerUrl}/credentials/issue/mocknet`;
const verifierEndpoint = `${baseVerifierUrl}/credentials/verify`;

module.exports = {
  issuerEndpoint,
  verifierEndpoint,
  settings: {
    enableInteropTests: false, // default
    testAllImplementations: false // default
  },
  implementations: [{
    name: 'Blockcerts',
    implementation: 'Blockcerts',
    issuers: [{
      id: 'did:myMethod:implementation:issuer:id',
      endpoint: issuerEndpoint,
      supports: {
        vc: ['1.1', '2.0']
      },
      tags: ['merkle-proof-2019', 'localhost']
    }],
    verifiers: [{
      id: 'did:myMethod:implementation:verifier:id',
      endpoint: verifierEndpoint,
      tags: ['merkle-proof-2019', 'localhost']
    }]
  }]
};
