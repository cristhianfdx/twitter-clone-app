import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../config/swagger.json';

const router = Router();

router.use('/api/docs', swaggerUi.serve);
router.get('/api/docs', swaggerUi.setup(swaggerOptions));

export default router;
