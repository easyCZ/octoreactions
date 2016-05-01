import { expect } from 'chai';
import {
  getIdentifiers,
  isIssueListView,
  isIssueDetailView
} from '../../src/content/util';


describe('Util', () => {

  const ISSUE_LIST_PATH = '/easyCZ/octoreactions/issues'
  const ISSUE_DETAIL_PATH = [ISSUE_LIST_PATH, '1'].join('/')

  it('should get identifiers out of issue list location', () => {
    expect(getIdentifiers(ISSUE_LIST_PATH)).to.be.eql({
      user: 'easyCZ',
      repo: 'octoreactions',
      issue: undefined
    })
  })

  it('should get identifiers out of issue detail location', () => {
    expect(getIdentifiers(ISSUE_DETAIL_PATH)).to.be.eql({
      user: 'easyCZ',
      repo: 'octoreactions',
      issue: 1
    })
  })

  it('should identifiy a issue list view from issue list path', () => {
    expect(isIssueListView(ISSUE_LIST_PATH)).to.be.eql(true);
    expect(isIssueListView(ISSUE_DETAIL_PATH)).to.be.eql(false);
  })

  it('should identify issue lsit detail from issue detail path', () => {
    expect(isIssueDetailView(ISSUE_LIST_PATH)).to.be.eql(false)
    expect(isIssueDetailView(ISSUE_DETAIL_PATH)).to.be.eql(true)
  })

})