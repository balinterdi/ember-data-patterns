/* jshint node: true */

module.exports = function(deployTarget) {
  return {
    pagefront: {
      app: 'data-patterns',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
