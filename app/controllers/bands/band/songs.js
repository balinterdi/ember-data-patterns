import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  songCreationStarted: false,

  sortBy: '-rating,title',

  searchInput: '',
  searchTerm: '',

  pageNumber: 1,

  noSongs:                  computed.equal('model.length', 0),
  searchTermEmpty:          computed.empty('searchTerm'),
  songCreationNotStarted:   computed.not('songCreationStarted'),
  promptToCreateFirstSong:  computed.and('noSongs', 'searchTermEmpty', 'songCreationNotStarted'),
  noMatchingSongs:          computed.and('noSongs', 'searchTerm'),

  isAddButtonDisabled: computed.empty('title'),

  updateSearchInput() {
    this.set('searchInput', this.get('searchTerm'));
  },

  actions: {
    searchSongs() {
      this.set('searchTerm', this.get('searchInput'));
    },

    enableSongCreation() {
      this.set('songCreationStarted', true);
    },

    setSorting(option) {
      this.set('sortBy', option);
    },

    updateRating(params) {
      let { item: song, rating } = params;
      if (song.get('rating') === rating) {
        rating = 0;
      }

      song.set('rating', rating);
      return song.save();
    }
  }
});
