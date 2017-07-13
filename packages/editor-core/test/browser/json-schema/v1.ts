import { expect } from 'chai';
import { name } from '../../../package.json';
import * as v1schema from '../../../dist/json-schema/v1/full.json';
import * as Ajv from 'ajv';

const ajv = new Ajv();
const validate = ajv.compile(v1schema);

describe(`${name} json-schema v1`, () => {
  const validReq = require.context('./v1-reference/valid', false, /\.json$/);
  for (const name of validReq.keys()) {
    it(`validates '${name}'`, () => {
      const referenceSource = validReq(name);
      validate(referenceSource);
      expect(validate.errors).to.equal(null);
    });
  }

  const invalidReq = require.context('./v1-reference/invalid', false, /\.json$/);
  for (const name of invalidReq.keys()) {
    it(`does not validate '${name}'`, () => {
      const referenceSource = invalidReq(name);
      expect(validate(referenceSource)).to.equal(false);
    });
  }
});
