import { expect } from 'chai';
import * as actions from '../../src/content/Actions.js';
import { SET_REACTIONS } from '../../src/content/constants';


describe('Actions', () => {

  const KEY = 'easyCZ:octoreactions:1'
  const REACTIONS = { '+1': 1, '-1': 2}

  describe('setReactions', () => {

    it('should have a method to setReactions', () => {
      expect(actions).to.have.property('setReactions');
    })

    it('should pass through the reactions and set the type', () => {
      const action = actions.setReactions(KEY, REACTIONS)
      expect(action.type).to.be.eql(SET_REACTIONS)
      expect(action.payload).to.have.all.keys('+1', '-1', 'timestamp');
    })

    it('should set the timestamp', () => {
      const timestamp = 123
      const action = actions.setReactions(KEY, REACTIONS, timestamp)
      expect(action.payload.timestamp).to.be.eql(timestamp);
    })

  })

})