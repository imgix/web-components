import {convertDataSetupStringToObject} from '../../src/converters';

describe('convertDataSetupStringToObject', () => {
  it('should return an empty object if no input is provided', () => {
    expect(convertDataSetupStringToObject(undefined)).to.deep.equal({});
  });
  it('should return an empty object if input is invalid JSON', () => {
    expect(convertDataSetupStringToObject('{invalid json}')).to.deep.equal({});
  });
  it('should return an object if input is valid JSON', () => {
    expect(convertDataSetupStringToObject('{"foo": "bar"}')).to.deep.equal({
      foo: 'bar',
    });
  });
});
