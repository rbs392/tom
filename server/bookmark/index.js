import Model from '../model';
import { ObjectID } from 'mongodb';

const model = new Model('bookmark');

class Bookmark {

  get(req, res) {
    const q = req.query.q;
    const query = q ? { name: {$regex: q } } : {};
    model.get(query).then((result) => {
      const status = result.err? 500 : 200;
      res.status(status).json(result.data);
    })
  }

  add(req, res) {
    const { title, url, folder } = req.body;
    model.get({ title, url})
    .then((result) => {
      if (result.data.length) {
        throw new Error("Data already present");
      } else {
        return model.add({ title, url, folder });
      }
    })
    .then((result) => {
      const status = result.err ? 500 : 200;
      const msg = result.err ? {msg: result.err} : {msg: "Data added"};
      res.status(status).json(msg);
    })
    .catch((err) => {
      res.status(500).json({msg: err.message})
    })
  }

  update(req, res) {
    const { title, url, folder } = req.body;
    const _id = ObjectID(req.params.id);
    model.update({ _id }, { title, url, folder })
    .then((result) => {
      const status = result.err ? 500 : 200;
      const msg = result.err ? {msg: result.err} : {msg: "Data updated"};
      res.status(status).json(msg);
    })
    .catch((err) => {
      res.status(500).json({msg: err.message})
    })
  }

  del(req, res) {
    const _id = ObjectID(req.params.id);
    model.del({ _id })
    .then((result) => {
      const status = result.err ? 500 : 200;
      const msg = result.err ? {msg: result.err} : {msg: "Data deleted"};
      res.status(status).json(msg);
    })
    .catch((err) => {
      res.status(500).json({msg: err.message})
    })
  }

}

export default new Bookmark()
