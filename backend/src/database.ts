import mongoose from 'mongoose';

import config from './config/config'

const mongoURIString: string = <string> config.mongoURI;

const connect = mongoose.connect(mongoURIString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

export default connect;