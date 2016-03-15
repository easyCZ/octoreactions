const PLUS_SELECTOR = '.reaction-summary-item[value~="+1"]'
const MINUS_SELECTOR = '.reaction-summary-item[value~="-1"]'
const SMILE_SELECTOR = '.reaction-summary-item[value~="smile"]'
const THINKING_SELECTOR = '.reaction-summary-item[value~="thinking_face"]'
const TADA_SELECTOR = '.reaction-summary-item[value~="tada"]'
const HEART_SELECTOR = '.reaction-summary-item[value~="heart"]'


const REACTION_OPTION_SELECTORS = [
  PLUS_SELECTOR,
  MINUS_SELECTOR,
  SMILE_SELECTOR,
  THINKING_SELECTOR,
  TADA_SELECTOR,
  HEART_SELECTOR
]

const STORAGE = 'octoreactions';
const OCTOREACTIONS_CLASS = 'Octoreactions';
const OCTOREACTIONS_COUNT_CLASS = 'Octoreactions-Count';
const OCTOREACTIONS_CONTAINER = '.Octoreactions';

const GITHUB_PLUS = '<g-emoji class="emoji mr-1" fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png">👍</g-emoji>'

const EVENT = {
  LOCATION_CHANGE: 'octoreactions:location_change'
}