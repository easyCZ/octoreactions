// import { expect } from 'chai';
// import * as content from '../../src/content/index.js';


// describe('content', () => {

//   const USER = 'easyCZ'
//   const REPO = 'octoreactions'
//   const ISSUES_URL = `/${USER}/${REPO}/issues`
//   const ISSUES_LIST = ISSUES_URL
//   const ISSUE_DETAIL = `${ISSUES_URL}/1`
//   const ISSUE_DETAIL_COMMENT_REF = `${ISSUES_URL}/1#issuecomment-195710351`

//   it('should parse the user out of issue list', () => {
//     const user = content.user(ISSUES_LIST)
//     expect(user).to.be.eql(USER)
//   })

//   it('should parse the user out of issue detail', () => {
//     const user = content.user(ISSUE_DETAIL)
//     expect(user).to.be.eql(USER)
//   })

//   it('should parse the repository out of issue list url', () => {
//     const repo = content.repository(ISSUES_LIST);
//     expect(repo).to.be.eql(REPO);
//   })

//   it('should parse the repository out of issue detail url', () => {
//     const repo = content.repository(ISSUE_DETAIL)
//     expect(repo).to.be.eql(REPO)
//   })

//   it('should parse the issue id out of an issue detail url', () => {
//     const issue = content.issue(ISSUE_DETAIL)
//     expect(issue).to.be.eql('1')
//   })

//   it('should parse the issue if out of an issues url with additional args', () => {
//     const issue = content.issue(ISSUE_DETAIL_COMMENT_REF);
//     expect(issue).to.be.eql('1');
//   })

//   it('should fail with a non-issue detil url', () => {
//     const issue = content.issue.bind(null, ISSUES_URL);
//     expect(issue).to.throw(TypeError);
//   })
// })
