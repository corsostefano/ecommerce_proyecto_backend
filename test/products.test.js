import app from '../src/app.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import Product from '../src/models/schema/product.model.js';
import mongoDB from './db.js';

chai.use(chaiHttp);
const expect = chai.expect;

before(async () => {
  try {
    await mongoDB();
    console.log('Test database connected!');
  } catch (err) {
    console.log(err);
  }
});

after(async () => {
  try {
    await Product.deleteMany();
    console.log('Test database disconnected!');
  } catch (err) {
    console.log(err);
  }
});

describe('Products Router', () => {
  describe('GET /productos', () => {
    it('should return an array of products', done => {
      chai
        .request(app)
        .get('/productos')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an error when not authenticated', done => {
      chai
        .request(app)
        .get('/products')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('No token provided');
          done();
        });
    });
  });

  describe('POST /productos', () => {
    const token = 'my_test_token';

    it('should create a new product', done => {
      chai
        .request(app)
        .post('/productos')
        .set('Authorization', 'Bearer ' + token)
        .send({
          name: 'Product Test',
          price: 10,
          description: 'Test description',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.name).to.equal('Product Test');
          expect(res.body.price).to.equal(10);
          expect(res.body.description).to.equal('Test description');
          done();
        });
    });

    it('should return an error when missing required fields', done => {
      chai
        .request(app)
        .post('/productos')
        .set('Authorization', 'Bearer ' + token)
        .send({
          name: 'Product Test',
          price: 10,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('"description" is required');
          done();
        });
    });
  });

})
