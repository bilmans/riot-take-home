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

  describe('/sign (POST)', () => {
    it('returns an HMAC signature', async () => {
      const res = await request(app.getHttpServer())
        .post('/sign')
        .send({ message: 'Hello World', timestamp: 1616161616 })
        .expect(201);
      expect(res.body.signature).toMatch(/^[a-f0-9]{64}$/);
    });

    it('produces the same signature regardless of property order', async () => {
      const a = await request(app.getHttpServer())
        .post('/sign')
        .send({ message: 'Hello World', timestamp: 1616161616 })
        .expect(201);
      const b = await request(app.getHttpServer())
        .post('/sign')
        .send({ timestamp: 1616161616, message: 'Hello World' })
        .expect(201);
      expect(a.body.signature).toMatch(/^[a-f0-9]{64}$/);
      expect(a.body.signature).toBe(b.body.signature);
    });
  });

  describe('/verify (POST)', () => {
    const data = { message: 'Hello World', timestamp: 1616161616 };
    const sign = (payload: Record<string, unknown>): Promise<string> =>
      request(app.getHttpServer())
        .post('/sign')
        .send(payload)
        .then((res) => res.body.signature);

    it('returns 204 for a valid signature', async () => {
      const signature = await sign(data);
      return request(app.getHttpServer())
        .post('/verify')
        .send({ signature, data })
        .expect(204);
    });

    it('returns 204 regardless of data property order', async () => {
      const signature = await sign(data);
      return request(app.getHttpServer())
        .post('/verify')
        .send({ signature, data: { timestamp: 1616161616, message: 'Hello World' } })
        .expect(204);
    });

    it('returns 400 for a tampered payload', async () => {
      const signature = await sign(data);
      return request(app.getHttpServer())
        .post('/verify')
        .send({ signature, data: { message: 'Goodbye World', timestamp: 1616161616 } })
        .expect(400);
    });

    it('returns 400 for a tampered signature', () => {
      return request(app.getHttpServer())
        .post('/verify')
        .send({ signature: 'deadbeef', data })
        .expect(400);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
