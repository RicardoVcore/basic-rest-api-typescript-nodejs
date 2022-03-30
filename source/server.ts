import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

const router: Express = express();

router.use(morgan('dev'));

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

//API rules
router.use((req, res, next) => {
    //CORS
    res.header('Access-Control-Allow-Origin', '*');
    //CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    //CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

//Routes
router.use('/', routes);

router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

//Server
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6666;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
