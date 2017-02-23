import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQuery(params) {
    let { q, sort, bandId } = params;
    delete params.q;
    delete params.sort;
    delete params.bandId;
    let urlParams = 'sort=' + sort;
    if (q) {
      urlParams += '&filter[title]=' + q;
    }
    return `${this.buildURL('bands', bandId)}/songs?${urlParams}`;
  }
});
