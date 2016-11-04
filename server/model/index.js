import { MongoClient } from 'mongodb';

const { DBHOST, DBPORT, DB } = process.env;

const db = DB||'test';
const dbPort = DBPORT||'27017';
const dbHost = DBHOST||'localhost';

const DBURL = `mongodb://${dbHost}:${dbPort}/${db}`;

// TODO: Refactor out common code

const resolveData = (db, resolve, err, data) => {
  if (err) {
    resolve({ err: err, data: [] });
  } else {
    resolve({ err: null, data: data })
  }
  db.close();
}
export default class Model {

  constructor(collection) {
    this.client = new MongoClient();
    this.DBURL  = DBURL;
    this.collection = collection;
  }

  get(query) {
    return new Promise((resolve, reject) => {
      this.client.connect(this.DBURL)
      .then((db) => {
        db.collection(this.collection)
        .find(query)
        .toArray(resolveData.bind(this, db, resolve))
      })
      .catch((err) => {
        resolve({err: err, data: []})
      });
    });
  }

  add(data) {
    return new Promise((resolve, reject) => {
      this.client.connect(this.DBURL)
      .then((db) => {
        db.collection(this.collection)
        .insertOne(data, (err, data) => {
          const status = err? false: true;
          resolveData(db, resolve, err, status)
        })
      })
      .catch((err) => {
        resolve({err: err, data: []})
      });
    })
  }

  update(query, data) {
    return new Promise((resolve, reject) => {
      this.client.connect(this.DBURL)
      .then((db) => {
        db.collection(this.collection)
        .updateOne(query,{
          $set: data,
        }, (err, data) => {
            let status = err? false: true;
            let errorMsg = data.result.n ? null : "Nothing to update";
            resolveData(db, resolve, (err || errorMsg), status)
        })
      })
      .catch((err) => {
        resolve({err: err, data: []})
      });
    })
  }

  del(query) {
    return new Promise((resolve, reject) => {
      this.client.connect(this.DBURL)
      .then((db) => {
        db.collection(this.collection)
        .deleteOne(query, (err, data) => {
            let status = err? false: true;
            let errorMsg = data.result.n ? null : "Nothing to delete";
            resolveData(db, resolve, (err || errorMsg), status)
        })
      })
      .catch((err) => {
        resolve({err: err, data: []})
      });
    })
  }

}
