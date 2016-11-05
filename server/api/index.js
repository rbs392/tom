import Folder from '../folder';
import Bookmark from '../bookmark';

const Api = (app) => (req, res, next) => {

  app.get('/api/bookmark', Bookmark.get);
  app.post('/api/bookmark', Bookmark.add);
  app.put('/api/bookmark/:id', Bookmark.update);
  app['delete']('/api/bookmark/:id', Bookmark.del);

  app.get('/api/folder', Folder.get);
  app.post('/api/folder', Folder.add);
  app['delete']('/api/folder/:id', Folder.del);
  next()

}
export default Api
