import DB from './connect.js';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.status(200);
    res.send('Online')
});

app.get('/api', (req, res) => {
    // get all enemies from table
    res.set('content-type', 'application/json');
    const sql = 'SELECT * FROM enemies';
    let data = {enemies: []};
    try{
        DB.all(sql, [], (err, rows) =>{
            if(err){
                throw err;
            }
            rows.forEach(row => {
                data.enemies.push({id:row.enemy_id, name:row.enemy_name, reason: row.enemy_reason })
            })

            let content = JSON.stringify(data);
            res.send(content);
        })
    }catch(err){
        console.log(err.message);
        res.status(467);
        res.send(`{"code": 467, "status": "${error.message}"}`);
    }   
});

app.post('/api', (req, res) => 
{
    console.log(req.body);

    res.set('content-type', 'application/json');
    const sql = 'INSERT INTO enemies(enemy_name, enemy_reason) VALUES (?, ?)';
    let newId;
    try{

        DB.run(sql, [req.body.name, req.body.reason], function(err){
            if(err) throw err;
        
            newId = this.lastID // built in func that provides last created ID
            res.status(201);
            let data = { status: 201, message: `Mortal Enemy ${newId} saved`};
            let content = JSON.stringify(data);
            res.send(content);

        })
    }
        catch(err)
        {
            console.log(err.message);
            res.status(468);
            res.send(`{"code": 468, "status": "${err.message}"}`);
        }
    
});

app.delete('/api', (req, res) => {
    res.set('content-type', 'application/json');
    const sql = 'DELETE FROM enemies WHERE enemy_id=?';
    try{
        
        DB.run(sql, [req.query.id], function(err){
            if(err) throw err;
            if(this.changes === 1){
                res.status(200);
                res.send(`{"message":" one item deleted "}`)
            }else{
                res.status(200);
                res.send(`{"message" : "No operation performed"}`)
            }
        })
    
    }catch(err){
        console.log(err.message);
            res.status(469);
            res.send(`{"code": 469, "status": "${err.message}"}`);
    }
});

app.listen(3000, (err) => {
    if(err){
        console.log(err.message);
    }
    console.log('Listening on port 3000')
});
