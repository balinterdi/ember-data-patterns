// app/controllers/artists.js
import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  _loadedArtists: [],

  artists: computed('model.loadTask.{isFinished,value}',
                    '_loadedArtists', function() {
    if (this.get('model.loadTask.isFinished')) {
      return this.get('model.loadTask.value');
    } else {
      return this.get('_loadedArtists');
    }
  }),

  isFetchingMore: computed.readOnly('model.loadTask.isRunning'),
});


