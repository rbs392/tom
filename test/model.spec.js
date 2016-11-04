import { expect } from 'chai';
import Model from '../server/model';

const model = new Model('test');

describe('Model', function(){

  it('Should add entries', function(done){
    model.add({test: 1}).then((result) => {
      expect(result.err).to.be.null;
      expect(result.data).to.be.true;
      model.get({test: 1}).then((data) => {
        expect(data.data).to.have.length.above(0);
        expect(data.data[0].test).to.equal(1);
        done();
      })
    })
  });

  it('Should get all the entries', function(done){
    model.get({}).then((result) => {
      expect(result.err).to.be.null;
      expect(result.data).to.have.length.above(0);
      done();
    })
  });

  it('Should update a specific entries', function(done){
    model.update({test: 1}, {test: 2}).then((result) => {
      expect(result.err).to.be.null;
      expect(result.data).to.be.true;
      model.get({test: 2}).then((data) => {
        expect(data.data).to.have.length.above(0);
        expect(data.data[0].test).to.equal(2);
        done();
      })
    })
  });

  it('Should throw error on invalid update ', function(done){
    model.update({test: 3}, {test: 4}).then((result) => {
      expect(result.err).to.equal('Nothing to update');
      expect(result.data).to.be.empty;
      done();
    })
  });

  it('Should delete entries from the given database', function(done){
    model.del({test: 2}).then((result) => {
      expect(result.err).to.be.null;
      expect(result.data).to.be.true;
      model.get({test: 2}).then((data) => {
        expect(data.data).to.be.empty;
        done();
      })
    })
  });

  it('Should throw error on invalid delete', function(done){
    model.del({test: 3}, {test: 4}).then((result) => {
      expect(result.err).to.equal('Nothing to delete');
      expect(result.data).to.be.empty;
      done();
    })
  });

})
