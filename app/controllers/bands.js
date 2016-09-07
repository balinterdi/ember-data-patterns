import Ember from 'ember';

export default Ember.Controller.extend({
  name: '',
  isAddButtonDisabled: Ember.computed.empty('name'),
});
