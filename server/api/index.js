import Bookmark from '../bookmark';

const Api = (app) => (req, res, next) => {

  app.get('/api/bookmark', Bookmark.get);
  app.post('/api/bookmark', Bookmark.add);
  app.put('/api/bookmark/:id', Bookmark.update);
  app['delete']('/api/bookmark/:id', Bookmark.del);
  next()

}
export default Api
