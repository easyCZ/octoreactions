// import Storage from '../src/Storage';
// import '../src/Constants';


describe('Storage', () => {

  let store;

  beforeEach(() => store = new Storage());
  afterEach(() => localStorage.clear());


  const owner = 'easy';
  const repo = 'octoreactions';
  const issueId = '14';

  it('should have a method to get the key for the storage given owner and repo', () => {
    expect(store.getKey(owner, repo)).to.be.equal('octoreactions:easy:octoreactions');
  })


  it('shoudl be able to set a JS object', () => {
    const val = { a: 'a', b: 'b' };
    store.set('test', val)

    expect(store.get('test')).to.be.eql(val)
  })

  it('should be able to set an issue', () => {
    const issue = { plus: 10 };
    store.setIssue(owner, repo, issueId, issue);
    expect(store.getIssue(owner, repo, issueId)).to.be.eql(issue);
  })

})