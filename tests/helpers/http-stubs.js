function songsUrlForBand(id) {
  return `/bands/${id}/songs`;
}

function responseItemForBand(data, id) {
  let bandId = id || data.id;
  return {
    id: bandId,
    type: 'bands',
    attributes: data.attributes,
    relationships: {
      songs: {
        links: {
          related: songsUrlForBand(data.id)
        }
      }
    }
  };
}

function responseItemForSong(data, id) {
  let songId = id || data.id;
  return {
    id: songId,
    type: "songs",
    attributes: data.attributes,
  };
}

export default {
  stubBands: function(pretender, data) {
    let response = data.map(function(band) {
      return responseItemForBand(band);
    });
    pretender.get('/bands', function() {
      return [200, {'Content-Type': 'application/vnd.api+json'}, JSON.stringify({ data: response }) ];
    });
  },

  stubSongs: function(pretender, bandId, data) {
    let response = data.map(function(song) {
      return responseItemForSong(song);
    });
    pretender.get(songsUrlForBand(bandId), function() {
      return [200, {'Content-Type': 'application/vnd.api+json'}, JSON.stringify({ data: response }) ];
    });
  },

  stubCreateBand: function(pretender, newId) {
    pretender.post('/bands', function(request) {
      let response = [ responseItemForBand(JSON.parse(request.requestBody), newId) ];
      return [200, {'Content-Type': 'application/vnd.api+json'}, JSON.stringify({ data: response }) ];
    });
  },

  stubCreateSong: function(pretender, newId) {
    pretender.post('/songs', function(request) {
      let response = [ responseItemForSong(JSON.parse(request.requestBody), newId) ];
      return [200, {'Content-Type': 'application/vnd.api+json'}, JSON.stringify({ data: response }) ];
    });
  },
};
