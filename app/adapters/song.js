import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQuery(params) {
    let { searchTerm, sort, pageNumber, pageSize=10, bandId } = params;
    delete params.searchTerm;
    delete params.sort;
    delete params.pageNumber;
    delete params.pageSize;
    delete params.bandId;
    let urlParams = `sort=${sort}&page[number]=${pageNumber}&page[size]=${pageSize}`;
    if (searchTerm) {
      urlParams += '&filter[title]=' + searchTerm;
    }
    return `${this.buildURL('bands', bandId)}/songs?${urlParams}`;
  }
});
