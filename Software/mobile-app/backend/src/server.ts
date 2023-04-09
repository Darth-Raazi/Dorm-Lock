import express from 'express';
import { userRouter } from  './routes/userRoutes'
import { connectToDB } from './DB/connect'

//use cmd in terminal to start mongodb server : mongod --config /opt/homebrew/etc/mongod.conf --fork
//
const app = express();
app.use(express.json());

let port = 3000;
connectToDB()
    .then(() => {

        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            next();
          });
          
        app.use('/userAuth', userRouter);    

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
        
    }).catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });


