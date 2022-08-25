import express, { Application, Request, Response } from 'express';

// Modules
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

//= Routes
import routes from './routes';

//= Error Handler
import errorHandlerMiddleware from './middlewares/error.handler.middleware';

//= Read .env file
dotenv.config();

//= Server Port and Host
const PORT = process.env.PORT || 9999;

//= Create express app
export const app: Application = express();

// Setting JSON in Body Of Requests
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ 
  limit: '50mb',
  extended: true
}));
// Req & Res Compressor
app.use(compression());
// Helmet Protector
app.use(helmet());
// Set Morgan Logger
app.use(morgan(':method :url :status - :response-time ms'));
// Cross-Origin Resource Sharing
app.use(cors());


/*******************|  App Routes  |*******************/
app.get('/', (req: Request, res: Response) => {
  res.json({
    "API": "Storefront API",
    "Author": "Hassan Ali",
    "Created At": "2022-08-24",
    "Last Update": "2022-08-24",
    "Contact Me": "7assan.3li1998@gmail.com"
  });
});

//= App Routes
app.use('/api', routes);

/***** Error handler middleware *****/
app.use(errorHandlerMiddleware);

//= Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
