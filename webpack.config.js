module.exports = {
  context: __dirname + '/client',
  entry: './client',
  output: {
    path: __dirname + '/static',
    filename: 'bundle.js'
  },
  watch: true
}
