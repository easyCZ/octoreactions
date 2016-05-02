// Redux Action Types
export const SET_REACTIONS = 'SET_REACTIONS';

// GitHub reactions selectors
export const REACTION_SELECTORS = {
  '+1': 'g-emoji[alias~="+1"].mr-1',
  '-1': 'g-emoji[alias~="-1"].mr-1',
  smile: 'g-emoji[alias~="smile"].mr-1',
  thinking: 'g-emoji[alias~="thinking_face"].mr-1',
  tada: 'g-emoji[alias~="tada"].mr-1',
  heart: 'g-emoji[alias~="heart"].mr-1'
}

export const DISCUSSION_BUCKET = '#discussion_bucket'