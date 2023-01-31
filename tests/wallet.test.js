import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database.js';
import '../src/setup.js';

beforeEach(async () => {
    await connection.query(`DELETE FROM banco_da_aplicação`);
  });
  

describe("POST /test", ()=> {
    it("returns status 200 for valid params", async () => {
    const body = {
            
    };
    const result = await supertest(app).post("/receitas").send(body);
    const status = result.status;
        
    expect(status).toEqual(200);
    })
})

afterAll(() => {
    connection.end();
  });
  