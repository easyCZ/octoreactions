import $ from 'jquery';
import { REACTION_SELECTORS, DISCUSSION_BUCKET } from './constants.js';


const parseReaction = (dom) => (selector) => $(dom)
  .find(selector)
  .map((i, elem) => elem.nextSibling.nodeValue.trim())
  .get()
  .map(e => parseInt(e))
  .reduce((a, b) => a + b, 0)


export function parseIssue(dom) {
  const parser = parseReaction($(dom).find(DISCUSSION_BUCKET))
  const counts = Object.keys(REACTION_SELECTORS)
    .map(key => {
      const value = REACTION_SELECTORS[key]
      return { [key]: parser(value) }
    })
  return Object.assign({}, ...counts)
}