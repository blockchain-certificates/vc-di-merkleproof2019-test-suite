/*!
 * Copyright (c) 2022-2024 Digital Bazaar, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {
  checkDataIntegrityProofVerifyErrors
} from 'data-integrity-test-suite-assertion';
import {config} from './helpers.js';
import {LDMerkleProof2019} from 'jsonld-signatures-merkleproof2019';
import {endpoints} from 'vc-test-suite-implementations';

// only use implementations with `merkle-proof-2019` verifiers.
const cryptosuite = 'merkle-proof-2019';
const {tags} = config.suites[cryptosuite];
const {match} = endpoints.filterByTag({
  tags: [...tags],
  property: 'verifiers'
});

const key = {
  signer: () => ({
    id: 'did:tdw:Qmcox8WT7JK9zaWWcmVFyQE3npmxSzHsB54GZjFp5uFBRn:blockcerts.org',
    sign: () => {}
  }),
  controller: 'did:tdw:Qmcox8WT7JK9zaWWcmVFyQE3npmxSzHsB54GZjFp5uFBRn:blockcerts.org'
};
// options for the DI Verifier Suite
const testDataOptions = {
  suiteName: cryptosuite,
  cryptosuite: new LDMerkleProof2019({
    options: {
      issuerEndpoint: match.get('Blockcerts').implementation.settings.issuers[0].endpoint
    }
  }),
  key
};
const optionalTests = {
  proofChain: false
};

checkDataIntegrityProofVerifyErrors({
  implemented: match,
  testDescription: `Data Integrity (${cryptosuite} verifiers)`,
  testDataOptions,
  optionalTests
});
