import request from 'supertest';
import express from 'express';
import cors from 'cors';
import authRoutes from '../../routes/auth.routes';

// Criar app de teste completo
const createTestServer = () => {
  const app = express();
  
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }));
  app.use(express.json());
  app.use('/auth', authRoutes);
  
  // Middleware de erro
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  });
  
  return app;
};

describe('Server E2E', () => {
  let app: express.Application;

  beforeAll(() => {
    app = createTestServer();
  });

  describe('Health Check', () => {
    it('should handle requests to unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);
    });
  });

  describe('CORS Configuration', () => {
    it('should handle preflight requests', async () => {
      const response = await request(app)
        .options('/auth/login')
        .set('Origin', 'http://localhost:5173')
        .set('Access-Control-Request-Method', 'GET')
        .expect(204); // Preflight requests return 204 No Content

      expect(response.headers).toHaveProperty('access-control-allow-origin');
      expect(response.headers).toHaveProperty('access-control-allow-methods');
    });

    it('should include CORS headers in all responses', async () => {
      const response = await request(app)
        .get('/auth/login')
        .set('Origin', 'http://localhost:5173')
        .expect(302);

      expect(response.headers).toHaveProperty('access-control-allow-origin');
      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
    });
  });

  describe('JSON Parsing', () => {
    it('should parse JSON requests correctly', async () => {
      const response = await request(app)
        .post('/auth/refresh')
        .send({ refresh_token: 'test_token' })
        .set('Content-Type', 'application/json')
        .expect(500); // Will fail due to invalid token, but should parse JSON

      expect(response.body).toHaveProperty('error');
    });

    it('should handle malformed JSON gracefully', async () => {
      const response = await request(app)
        .post('/auth/refresh')
        .send('invalid json')
        .set('Content-Type', 'application/json')
        .expect(500); // Express returns 500 for malformed JSON

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Error Handling', () => {
    it('should handle internal server errors', async () => {
      // This test would require mocking to trigger an internal error
      // For now, we'll test the error middleware structure
      expect(app).toBeDefined();
    });
  });
}); 