import 'jest';
import supertest from 'supertest';
import app from '../src/app';
import { dbConnection, dbDropping } from '../src/test_helper';
import Hotel from '../src/services/models/hotel';

describe('Test hotels CRUD', () => {
  let hotelSea: any;
  let hotelPhilip: any;
  let hotelMark: any;
  beforeAll((done) => {
    dbConnection(done);
  });
  beforeEach((done: any) => {
    dbDropping(done);
  });
  beforeEach((done: any) => {
    hotelSea = new Hotel({ name: 'Hotel Sea', stars: 3 });
    hotelPhilip = new Hotel({ name: 'Hotel Philip', stars: 5 });
    hotelMark = new Hotel({ name: 'Hotel Mark', stars: 4 });
    Promise.all([hotelSea.save(), hotelPhilip.save(), hotelMark.save()]).then(
      () => done()
    );
  });
  it('should return every hotel', (done: any) => {
    supertest(app)
      .get('/api/hotels')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(3);
        done();
      });
  });
  // it('should return hotel by Id', (done: any) => {
  //   const id = hotelSea.id;
  //   supertest(app)
  //     .get(`/api/hotels/${id}`)
  //     .then((response) => {
  //       expect(response.statusCode).toBe(200);
  //       expect(response.body.id).toBe(id);
  //       done();
  //     });
  // });

  it('should return hotel by Id', (done) => {
    const id = hotelSea.id;
    supertest(app)
      .post('/oauth/token')
      .set('Authorization', 'Basic YXBwbGljYXRpb246c2VjcmV0')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        grant_type: 'password',
        username: 'blanca94',
        password: 'password',
      })
      .then((resp) => {
        supertest(app)
          .get(`/api/hotels/${id}`)
          .set('Authorization', `Bearer ${resp.body.accessToken}`)
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBe(id);
            done();
          });
      });
  });

  it('should create a hotel', (done: any) => {
    supertest(app)
      .post('/api/hotels')
      .send({ name: 'New Hotel', stars_q: 4 })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('New Hotel');
        Hotel.findById(response.body.id).then((hotelNew) => {
          expect(hotelNew.name).toBe('New Hotel');
          done();
        });
      });
  });
  it('should modify a hotel', (done: any) => {
    const id = hotelSea.id;
    supertest(app)
      .put(`/api/hotels/${id}`)
      .send({ name: 'Renewed Hotel Sea', stars_q: 5 })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        Hotel.findById(id).then((hotelNew) => {
          expect(hotelNew.name).toBe('Renewed Hotel Sea');
          expect(hotelNew.stars).toBe(5);
          done();
        });
      });
  });
  it('should delete a hotel', (done: any) => {
    const id = hotelPhilip.id;
    supertest(app)
      .delete(`/api/hotels/${id}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        Hotel.findById(id).then((hotelNew) => {
          expect(hotelNew).toBe(null);
          done();
        });
      });
  });
});
