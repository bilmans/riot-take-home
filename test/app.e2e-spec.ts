import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/encrypt (POST)', () => {
    it('encrypts all depth-1 properties (base64), per TODO scenario', () => {
      const input = {
        name: 'John Doe',
        age: 30,
        contact: { email: 'john@example.com', phone: '123-456-7890' },
      };
      const expectedOutput = {
        name: 'IkpvaG4gRG9lIg==',
        age: 'MzA=',
        contact:
          'eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJwaG9uZSI6IjEyMy00NTYtNzg5MCJ9',
      };

      return request(app.getHttpServer())
        .post('/encrypt')
        .send(input)
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual(expectedOutput);
        });
    });
  });

  describe('/decrypt (POST)', () => {
    it('decrypts base64 values back to the original payload', () => {
      return request(app.getHttpServer())
        .post('/decrypt')
        .send({
          name: 'IkpvaG4gRG9lIg==',
          age: 'MzA=',
          contact:
            'eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJwaG9uZSI6IjEyMy00NTYtNzg5MCJ9',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({
            name: 'John Doe',
            age: 30,
            contact: { email: 'john@example.com', phone: '123-456-7890' },
          });
        });
    });

    it('leaves non-encrypted values unchanged', () => {
      return request(app.getHttpServer())
        .post('/decrypt')
        .send({ name: 'IkpvaG4gRG9lIg==', birth_date: '1998-11-19' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({
            name: 'John Doe',
            birth_date: '1998-11-19',
          });
        });
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
