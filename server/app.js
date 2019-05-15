import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import router from './routes/index';

const app = express();
const port = process.env.PORT || 4000;
const swaggerDoc = YAML.load(path.join(process.cwd(), './server/docs/docs.yaml'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1', router);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Resource not found',
  });
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
export default app;
