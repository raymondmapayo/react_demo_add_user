const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react_node"
});

app.get('/login', (request, response)=>{
    const sql = "SELECT * FROM login";
    db.query(sql,(error, data)=>{
        if(error) return response.json(error);
        return response.json(data)
    });
});

//----------------------------USERLIST-----------------------------------//
app.post('/add_user', (request, response)=>{
    const {name, email, password, gender,status,bday} = request.body;
    const sql = 'INSERT INTO login (name, email, password, gender, status, bday) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql,[name,email,password, gender, status, bday], (error, result)=>{
        if(error) throw error;
        response.send('User added');
    });
});

app.delete('/login/:id', (request, response)=>{
    const id = request.params.id;
    const sql = 'DELETE FROM login WHERE id = ?';
    db.query(sql,[id], (error, result)=>{
        if(error) throw error;
        response.send('User deleted');
        
    });
});

app.get('/login/:id', (request, response)=>{
    const id = request.params.id;
    console.log("id:" + id);
    const sql = 'SELECT * FROM login WHERE id=?';
    db.query(sql, [id], (error, data)=>{
        if(error) return response.json(error);
        return response.json(data)
    });
});

app.put('/login/:id', (request, response) => {
    const id = request.params.id;
    const { name, email, gender, status } = request.body;
    const sql = 'UPDATE login SET name = ?, email = ?, gender = ?, status = ? WHERE id = ?';
    db.query(sql, [name, email, gender, status, id], (error, result) => {
        if (error) throw error;
        response.send('User Updated');
    });
});


app.post('/login', (request, response) => {
    const { email, password } = request.body;
    const sql = 'SELECT * FROM login WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (error, data) => {
        if (error) return response.json(error);

        if (data.length > 0) {
            return response.json({ success: true, message: 'Login successful' });
        } else {
            return response.json({ success: false, message: 'Invalid login credentials' });
        }
    });
});

app.post('/add_register', (request, response)=>{
    const {name, email, password, gender, status, bday} = request.body;
    const sql = 'INSERT INTO login (name, email, password, gender, status, bday) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql,[name,email,password, gender, status, bday], (error, result)=>{
        if(error) throw error;
        response.send('User added');
    });
});
//----------------------------END OF USERLIST-----------------------------------//


//---------------------------------ROOMS--------------------------------------//

app.get('/', (request, response)=> {
    return response.json("The server started.");

});

app.listen(8081, ()=>{
    console.log("Listening...");
});