import jsdom, { rerequire } from 'mocha-jsdom'
import { expect } from 'chai'
import fs from 'fs';
import Parser from '../../src/content/Parser.js';


const ISSUE_LIST = './test/content/html/IssueList.html'
const ISSUE_DETAIL = './test/content/html/IssueDetail.html'


describe('Parser', function () {

  let $;

  jsdom()

  before(function () {
    $ = rerequire('jquery')
  })

  describe('Issues List', () => {

    let $dom

    before(() => {
      $dom = $(fs.readFileSync(ISSUE_LIST, 'utf-8'));
    })

    it('should have a method to retriee a list of issues from a page', () => {
      expect(Parser.getIssues).to.be.ok;
    })

    it('should retrieve all the issues and their ids', () => {
      const issues = Parser.getIssues($dom)
      expect(issues.length).to.be.eql(15)

      const ids = issues.map(i => i.id);
      expect(ids).to.be.eql([265, 264, 258, 257, 256, 254, 250, 232, 227, 219, 216, 214, 168, 167, 157])

    })

  })


  describe('Issue Detail', () => {

    let $dom

    before(() => {
      $dom = $(fs.readFileSync(ISSUE_DETAIL, 'utf-8'));
    })

    it('should be able to get reactions container from the DOM', () => {
      const reactionsContainer = Parser.getReactionsContainers($dom);
      expect(reactionsContainer.length).to.be.eql(5);
    })

    it('should be able to get reaction counts from a reactions container', () => {
      const $reactionsContainer = Parser.getReactionsContainers($dom)[3]
      const reactionsCounts = Parser.getReactionsCountsFromContainer($reactionsContainer)

      expect(reactionsCounts).to.be.eql({
        '+1': 3, heart: 0, '-1': 0, smile: 1, thinking_face: 0, tada: 0
      })

    })

    it('should be able to fetch all reactions on a page', () => {
      const reactions = Parser.getReactions($dom);
      expect(reactions).to.be.eql({
        '+1': 10, heart: 1, '-1': 0, smile: 1, thinking_face: 0, tada: 0
      })
    })


  })



})