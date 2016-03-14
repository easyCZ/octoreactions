
class Octoreactions {

  constructor() {
    console.debug('[Octoreactions] Init');

    this.views = [new IssueDetail(), new IssueList()];

    $(document).on(EVENT.LOCATION_CHANGE, this.render.bind(this))
  }

  render() {
    this.views
      .filter(v => v.shouldRender())
      .forEach(v => v.render())
  }

}
