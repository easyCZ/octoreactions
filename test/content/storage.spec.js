import { expect } from 'chai';


describe('Storage', function () {

  const storage = require('../../src/content/storage.js');

  it('should bootstrap the store and export it', () => {
    expect(storage).to.have.property('store')
  });

  it('should export a method to load data from local storage', () => {
    expect(storage).to.have.property('loadLocalStorage')
  })

});
