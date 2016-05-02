import { expect } from 'chai';
import {
  setReactions
} from '../../src/content/Actions.js';
import {
  reactions as reactionsReducer,
  reactionsDefaultState
} from '../../src/content/reducers.js';


describe('Reactions Reducer', () => {

  const KEY = 'easyCZ:octoreactions:1'
  const KEY_2 = 'easyCZ:octoreactions:2'
  const REACTIONS = { '+1': 1, '-1': 2}
  const REACTIONS_2 = { 'smile': 1, 'tada': 3}

  it('should return the initial state on invalid action', () => {
    expect(reactionsReducer(undefined, { type: 'test' })).to.be.eql({});
  })

  it('should add the reactions to the state with key', () => {
    const state = reactionsDefaultState
    const action = setReactions(KEY, REACTIONS)
    const newState = reactionsReducer(state, action);

    expect(newState).to.have.property(KEY)
    expect(newState[KEY]).to.have.all.keys('+1', '-1', 'timestamp');
  })

  it('should add a second key to the state', () => {
    const state = reactionsReducer(reactionsDefaultState, setReactions(KEY, REACTIONS));
    const action = setReactions(KEY_2, REACTIONS_2)
    const newState = reactionsReducer(state, action);

    expect(newState).to.have.all.keys([KEY, KEY_2])
    expect(newState[KEY]).to.have.all.keys('+1', '-1', 'timestamp')
    expect(newState[KEY_2]).to.have.all.keys('smile', 'tada', 'timestamp')
  })

})