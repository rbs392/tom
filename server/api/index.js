const Api = (app) => (req, res, next) => {

  app.get('/api/bookmark', (req, res) => res.end("ok get"));
  app.post('/api/bookmark', (req, res) => res.end("ok"));
  app['delete']('/api/bookmark', (req, res) => res.end("ok"));
  next()

}
export default Api
