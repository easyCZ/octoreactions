import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import * as content from '../src/content.js';


describe('content', () => {

  const ISSUES_LIST = '/easyCZ/octoreactions/issues'
  const ISSUE_DETAIL = '/easyCZ/octoreactions/issues/1'

  it('should parse the user out of issue list', () => {
    const user = content.user(ISSUES_LIST)
    console.log(user);
    expect(user).to.be.eql('easyCZ')
  })

  it('should parse the user out of issue detail', () => {
    const user = content.user(ISSUE_DETAIL)
    expect(user).to.be.eql('easyCZ')
  })

})
