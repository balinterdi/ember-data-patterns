import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForFindAll(modelName) {
    return this.buildURL(modelName) + '?sort=name';
  }
});
