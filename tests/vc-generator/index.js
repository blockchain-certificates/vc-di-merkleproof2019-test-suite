/*!
 * Copyright (c) 2022-2024 Digital Bazaar, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {getMultikey} from './helpers.js';
import {validVc} from './validVc.js';
import {vcGenerators} from './generators.js';

// cache test data for a single run
const vcCache = new Map([
  ['validVc', structuredClone(validVc)]
]);

/**
 * Calls the vc generators and then returns a Map
 * with the test data.
 *
 * @returns {Promise<Map>} Returns a Map of test data.
 */
export async function generateTestData() {
  const credential = structuredClone(validVc);
  credential.issuer = 'did:tdw:Qmcox8WT7JK9zaWWcmVFyQE3npmxSzHsB54GZjFp5uFBRn:blockcerts.org';
  for(const [id, generator] of vcGenerators) {
    if(vcCache.get(id)) {
      continue;
    }
    const testData = await generator({credential});
    vcCache.set(id, testData);
  }
  return {
    clone(key) {
      return structuredClone(vcCache.get(key));
    }
  };
}
