'use strict';

const {body} = require('./_fixture');
const {getBody} = require('../swaggerParser');

describe('swagger-to-md.swaggerParser', () => {
  const parsedBody = getBody(body);

  it('should generate a flat body', () => {

    expect(parsedBody).toBeInstanceOf(Object);
    const __meta = parsedBody['__meta'];
    expect(__meta['name']).toBe('foo');
    expect(__meta['required']).toBe(true);

    const data = parsedBody['data'];
    expect(data).toBeDefined();
    expect(data['type']).toBe('object');
    expect(data['description']).toBe('Foo Resource Object');

    const dataId = parsedBody['data.id'];
    expect(dataId).toBeDefined();
    expect(dataId['type']).toBe('string');
    expect(dataId['description']).toBe('Identifier of resource');

    const dataAttributes = parsedBody['data.attributes'];
    expect(dataAttributes).toBeDefined();
    expect(dataAttributes['type']).toBe('object');
    expect(dataAttributes['description']).toBe('The representation of foo.');

    const dataAttributesFooEasy = parsedBody['data.attributes.foo_easy'];
    expect(dataAttributesFooEasy).toBeDefined();
    expect(dataAttributesFooEasy['type']).toBe('string');
    expect(dataAttributesFooEasy['description']).toBe('The easy going foo');
    expect(dataAttributesFooEasy['required']).toBeUndefined();

    const dataAttributesFooRequired = parsedBody['data.attributes.foo_required'];
    expect(dataAttributesFooRequired).toBeDefined();
    expect(dataAttributesFooRequired['type']).toBe('string');
    expect(dataAttributesFooRequired['description']).toBe('The important foo.');
    expect(dataAttributesFooRequired['required']).toBe(true);


    const arrayData = parsedBody['arrayData'];
    expect(arrayData).toBeDefined();
    expect(arrayData['type']).toBe('array');
    expect(arrayData['description']).toBeUndefined();

    const arrayDataObj = parsedBody['arrayData[]'];
    expect(arrayDataObj).toBeDefined();
    expect(arrayDataObj['type']).toBe('object');
    expect(arrayDataObj['description']).toBe('Array object');

    const arrayDataObjType = parsedBody['arrayData[].type'];
    expect(arrayDataObjType).toBeDefined();
    expect(arrayDataObjType['type']).toBe('string');
    expect(arrayDataObjType['description']).toBe('Type of resource');
    expect(arrayDataObjType['required']).toBe(true);

    const enumData = parsedBody['enumData'];
    expect(enumData).toBeDefined();
    expect(enumData['type']).toBe('enum');
    expect(enumData['description']).toBe('This is an enum');
    expect(enumData['values']).toBeInstanceOf(Array);
    expect(enumData['values'][0]).toBe('option1');
    expect(enumData['values'][1]).toBe('option2');

  });

  it('should return empty object for no body', () => {
    const parsedBody = getBody(undefined);
    expect(parsedBody).toBeDefined();
    expect(parsedBody).toBeInstanceOf(Object);
    expect(Object.keys(parsedBody).length).toBe(0);
  });

});