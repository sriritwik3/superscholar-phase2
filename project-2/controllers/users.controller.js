// import db from '../models/userSchema.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// export const registerUser = async(req, res) => {
//     var errors = [];
//     try {
//         const { Username, Email, Password } = req.body;

//         if (!Username) {
//             errors.push('Username is missing');
//         }
//         if (!Email) {
//             errors.push('Email is missing');
//         }
//         if (errors.length) {
//             res.status(400).json({ error: errors.join(',') });
//             return;
//         }
//         let userExists = false;

//         var sql = 'SELECT * FROM Users WHERE Email = ?';
//         await db.all(sql, Email, (err, result) => {
//             if (err) {
//                 res.status(402).json({ error: err.message });
//                 return;
//             }

//             if (result.length === 0) {
//                 var salt = bcrypt.genSaltSync(10);

//                 var data = {
//                     Username: Username,
//                     Email: Email,
//                     Password: bcrypt.hashSync(Password, salt),
//                     Salt: salt,
//                     DateCreated: Date('now'),
//                 };

//                 var sql =
//                     'INSERT INTO Users (Username, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?)';
//                 var params = [
//                     data.Username,
//                     data.Email,
//                     data.Password,
//                     data.Salt,
//                     Date('now'),
//                 ];
//                 var user = db.run(sql, params, function(err, innerResult) {
//                     if (err) {
//                         res.status(400).json({ error: err.message });
//                         return;
//                     }
//                 });
//             } else {
//                 userExists = true;
//                 // res.status(404).send("User Already Exist. Please Login");
//             }
//         });

//         setTimeout(() => {
//             if (!userExists) {
//                 res.status(201).json('Success');
//             } else {
//                 res.status(201).json('Record already exists. Please login');
//             }
//         }, 500);
//     } catch (err) {
//         console.log(err);
//     }
// };


// export const loginUser = async(req, res) => {
//     try {
//         const { Email, Password } = req.body;
//         // Make sure there is an Email and Password in the request
//         if (!(Email && Password)) {
//             res.status(400).send('All input is required');
//         }

//         let user = [];

//         var sql = 'SELECT * FROM Users WHERE Email = ?';
//         db.all(sql, Email, function(err, rows) {
//             if (err) {
//                 res.status(400).json({ error: err.message });
//                 return;
//             }

//             rows.forEach(function(row) {
//                 user.push(row);
//             });

//             var PHash = bcrypt.hashSync(Password, user[0].Salt);

//             if (PHash === user[0].Password) {
//                 // * CREATE JWT TOKEN
//                 const token = jwt.sign({ user_id: user[0].Id, username: user[0].Username, Email },
//                     process.env.TOKEN_KEY, {
//                         expiresIn: '7d', // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
//                     }
//                 );
//                 global.isLoggedIn = true;
//                 user[0].Token = token;
//             } else {
//                 return res.status(400).send('No Match');
//             }

//             return res.status(200).send(user);
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };


import jwt from "jsonwebtoken";
import passport from "passport";
import '../config/passport.js';
import { hashSync, compareSync } from 'bcrypt';
import UserModel from '../models/userSchema.js';

export const registerUser = (req, res) => {
    console.log("dcfgvbh", req.body);
    const user = new UserModel({
        email: req.body.email,
        password: hashSync(req.body.password, 10)
    })

    user.save().then(user => {
        res.send({
            success: true,
            message: "User created successfully.",
            user: {
                id: user._id,
                email: user.email
            }
        })
    }).catch(err => {
        res.send({
            success: false,
            message: "Something went wrong",
            error: err
        })
    })
};
export const loginUser = (req, res) => {
    UserModel.findOne({ email: req.body.email }).then(user => {
        //No user found
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Could not find the user."
            })
        }

        //Incorrect password
        if (!compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = {
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(payload, "Random string", { expiresIn: "1d" })

        return res.status(200).send({
            success: true,
            message: "Logged in successfully!",
            token: "Bearer " + token
        })
    })
}