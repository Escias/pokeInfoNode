import express from 'express';
import crypto from "crypto";
let db_handler = require('./db_handler')
const connexion = db_handler.connexion

function hash(message) {
    return crypto.createHash("sha256").update(message).digest("hex")
}

function setUser(firstname, lastname, email, password, confirmpassword){
    if (password === confirmpassword) {
        if (password.match("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$")) {
            let hashpassword = hash(password)
            connexion.query("INSERT INTO minesr_110916.users (firstname, lastname, email, password) VALUES ('"+ firstname +"', '"+ name +"', '"+ email +"', '"+ hashpassword +"')", function(err, res){
                if(err){
                    if (err.code == "ER_DUP_ENTRY"){
                        console.log('ADD ERROR EMAIL ALREADY EXIT')
                    }
                    else{
                        throw err
                    }
                }else{
                    console.log("User created");
                }
            })
            console.log("The passwrd respect the regex !")
        }
        else
            console.log("Does not respect the regex")
        console.log("Passwords are the same")
    }
    else
        console.log("Passwords are not the same")
}

function getUser(email, password){
    connexion.query("SELECT email, password FROM itescia.users WHERE email = '" + email + "'", function (err, result) {
        if (err) throw err;
        console.log(result);
        if(result[0] !== undefined){
            if(hash(password) === result[0].password){
                console.log('user logged')

                const token = crypto.randomBytes(8).toString('hex')

                connexion.query("UPDATE itescia.users SET token = '"+ token +"' WHERE email = '" + email + "'", function (err, result){
                    if(err) throw err
                })

                req.session.token = token
            }else{
                console.log('error')
            }
        }
        else{
            console.log('email non trouvé')
        }
    });
}