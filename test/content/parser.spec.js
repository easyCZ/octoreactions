import { expect } from 'chai';
import $ from 'jquery';
import fs from 'fs';
import path from 'path';
import { parseIssue } from '../../src/content/parser.js';


describe('Parser', () => {

  describe('Issue Detail', () => {

    const detailPath = path.resolve(__dirname, './html/issue-detail.html');
    const issueDetailHTML = fs.readFileSync(detailPath, 'utf-8');

    it('should have a parseIssue method', () => {
      expect(parseIssue).to.be.ok;
    })

    it('should be retrieve the total counts of reactions', () => {
      expect(parseIssue($(issueDetailHTML))).to.be.eql({
        heart: 1,
        '-1': 1,
        smile: 1,
        thinking: 1,
        tada: 2,
        '+1': 3
      })
    })

  })





})