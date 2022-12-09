const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require("cors");
const fileUpload = require('express-fileupload')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MySQLStore = require('connect-mysql')(session)
const fs = require('fs');

const bcrypt = require('bcrypt')
const {
    v4: uuidv4,
    parse: uuidParse,
    stringify: uuidStringify
} = require('uuid')

const app = express()

// app.use(cors({
//     origin: ['http://localhost:3000]'],
//     methods: ['GET', 'POST'],
//     credentials: true
// }))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname + "public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

const PORT = process.env.PORT || 8000
const saltNumber = 10

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'HrFirmDB',
    user: 'root',
    password: 'Cs@mysql'
})

const options = {
    config: {
        user: 'root',
        password: 'Cs@mysql',
        database: 'HrFirmDB',
        host: 'localhost'
    }
}

connection.connect((err) => {
    if (err) {
        console.log('Error Connecting : ' + err.stack);
        return;
    }
    console.log('Connected to Database Successfully with id : ' + connection.threadId);
})

app.use(session({
    key: 'userId',
    secret: "This is top secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    },
    // store: new MySQLStore(options)
}));

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        return res.send({ status: 'not valid user' })
    }
}
// console.log(__dirname);

app.post('/upload', (req, res) => {

    const FNAME = req.body.fName;
    const LNAME = req.body.lName;
    const EMAIL = req.body.email;
    const PHONE = req.body.phone;
    const MESSAGE = req.body.message;
    const STATUS = 'Pending';

    // console.log(FNAME + " " + LNAME + " " + EMAIL + " " + PHONE + " " + MESSAGE);

    //Generating uuids and coverting them into string
    let CAND_ID = uuidv4().toString();
    CAND_ID = CAND_ID.replaceAll('-', '')
    let FILE_ID = uuidv4();
    FILE_ID = FILE_ID.replaceAll('-', '')
    let APPL_ID = uuidv4();
    APPL_ID = APPL_ID.replaceAll('-', '')

    if (!req.files) {
        return res.status(400).json({ status: "No Files Were Uploaded", });
    }

    const FILE_NAME = FILE_ID + '.pdf';
    // const uploadPath = __dirname + '/public/uploadedFiles/' + FILE_NAME;
    const uploadPath = __dirname + '/public/uploadedFiles/' + FILE_NAME;

    const FILE = req.files.resume;

    FILE.mv(uploadPath, (err) => {
        if (err)
            return res.status(500).send(err)
    })

    //queries to insert data into database
    const cQuery = `INSERT INTO candidate VALUES("${CAND_ID}","${FNAME}","${LNAME}","${EMAIL}","${PHONE}");`;
    const fQuery = `INSERT INTO file VALUES("${FILE_ID}","${CAND_ID}","${FILE_NAME}");`;
    const aQuery = `INSERT INTO application VALUES("${APPL_ID}","${CAND_ID}","${FILE_ID}","${MESSAGE}","${STATUS}");`;

    res.setHeader('Content-Type', 'text/html');

    connection.query(cQuery, (err, rows) => {
        if (!err) {
            res.write('Inserted Values to candidate table');
        } else {
            console.log(err);
        }
    });

    connection.query(fQuery, (err, rows) => {
        if (!err) {
            res.write('Inserted Values to file table');
        } else {
            console.log(err);
        }
    });

    connection.query(aQuery, (err, rows) => {
        if (!err) {
            res.write('Inserted Values to pending_candidate table');
        } else {
            console.log(err);
        }
    });

    // res.status(200).send();
    console.log('Application Added to Database');
    res.status(200).json({ status: "Records are inserted into DB", });
});

app.post('/login', (req, res, err) => {
    const userName = req.body.username
    const userPassword = req.body.password;

    connection.query(`SELECT password FROM HrFirmDB.user WHERE username="${userName}";`, (err, row) => {
        if (row.length > 0) {
            bcrypt.compare(userPassword, row[0].password, function (err, result) {
                if (result) {
                    req.session.isAuth = result;
                    console.log('Successful Login');
                    return res.status(200).send({ status: 'LoggedIn' });
                }

            });
        } else {
            console.log('unsuccessful Login');
            res.status(400).send({ status: 'User not Found' })
            console.log('');
        }
    })
})

app.get('/count', (req, res, err) => {
    const countQuery = "SELECT COUNT(APPL_ID) AS count FROM application WHERE STATUS='Pending';"
    connection.query(countQuery, (err, count) => {
        if (!err) {
            console.log('Sent Count of Pending application to frontend');
            res.send(count)
        } else {
            // res.json({'count' : })
        }
    })
})

app.get('/admin', (req, res, err) => {
    const retrieveQuery = "SELECT APPL_ID,FNAME,LNAME,FILE_NAME,EMAIL,PHONE,MESSAGE,STATUS FROM candidate,file,application WHERE C_ID=CAND_ID AND F_ID=FILE_ID;"
    const countQuery = "SELECT COUNT(*) AS count FROM application WHERE STATUS='Pending';"

    connection.query(retrieveQuery, (err, rows) => {
        if (!err) {
            let userDetails = [];
            rows.forEach((row) => {
                let userDetail = {
                    fName: row.FNAME,
                    lName: row.LNAME,
                    fileName: row.FILE_NAME,
                    fileLocation: __dirname + "/public/uploadedFiles/" + row.FILE_NAME,
                    email: row.EMAIL,
                    phone: row.PHONE,
                    message: row.MESSAGE,
                    status: row.STATUS,
                    applId: row.APPL_ID
                }
                // console.log(userDetail);
                userDetails.push(userDetail)
            })
            // console.log(userDetails);
            console.log('Admin Logged In : Details are Sent');
            res.json({ data: userDetails })
        } else {
            console.log('Admin Logged In : Failed to send Details');
            console.log(err);
        }
    });

})

app.post('/update', (req, res) => {
    console.log(req.body);
    const applId = req.body.applId;
    const message = req.body.position;
    const updateQuery = `UPDATE application SET STATUS = "Reviewed",MESSAGE = "${message}" WHERE APPL_ID = "${applId}";`
    connection.query(updateQuery, (err, res) => {
        if (res)
            console.log('Updated Row in DB');
    })
    res.send({ status: 'update' })
})

app.post('/viewpdf', (req, res) => {
    console.log('PDF is sent to frontend');
    const fileName = req.body.fileName;
    var data = fs.readFileSync(`./public/uploadedFiles/${fileName}`);
    res.contentType("application/pdf");
    res.send(data);
})

app.get('/favicon.ico:1', (req, res) => {
    //do nothing because i dont care
})

app.get('/logo192.png', (req, res) => {

})

app.listen(PORT, () => {
    console.log('server running on port 8000')
})