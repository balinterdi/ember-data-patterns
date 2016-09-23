import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQuery(params) {
    let { q, bandId } = params;
    delete params.q;
    delete params.bandId;
    return this.buildURL('bands', bandId) + '/songs?filter[title]=' + q;
  }
});
