import sqlite3 from 'sqlite3';
const sql3 = sqlite3.verbose(); //connects to the program.

//const DB = new sql3.Database(':memory:', sqlite3.OPEN_READWRITE, connected) // creates new instance of db and aliases. Takes three arguements, name of database, purpose and callback. :memory: here is asking that the db be kept in temp memeory.
//const DB = new sql3.Database('', sqlite3.OPEN_READWRITE, connected) // empty string asks for an anon file be created and used somewhere
const DB = new sql3.Database('./mydata.db', sqlite3.OPEN_READWRITE, connected) // or you can name it and choose location

function connected(err){
    if(err){
        console.log(err.message)
        return
    }
    console.log('db creation success');
}

let sql = `CREATE TABLE IF NOT EXISTS enemies(
    enemy_id INTEGER PRIMARY KEY,
    enemy_name TEXT NOT NULL,
    enemy_reason TEXT NOT NULL
)`;

DB.run(sql, [], (err) =>{
    //callback
    if(err) {console.log('error creating table');
        return
    };
    console.log('Table Created');
});


export default DB; //makes db object available for import into other locations.
