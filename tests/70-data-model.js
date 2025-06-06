/*!
 * Copyright (c) 2022-2024 Digital Bazaar, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {
  diProofs,
  verificationMethods
} from './suites/data-model.js';
import {config} from './helpers.js';
import {endpoints} from 'vc-test-suite-implementations';

const cryptosuites = ['merkle-proof-2019'];

for(const suiteName of cryptosuites) {
  const {tags} = config.suites[suiteName];
  const {match} = endpoints.filterByTag({
    tags: [...tags],
    property: 'issuers'
  });
  diProofs({
    suiteName,
    match,
    cryptosuites: [suiteName]
  });
  // not exactly applicable to merkle-proof-2019
  // verificationMethods({
  //   suiteName,
  //   match
  // });
}
