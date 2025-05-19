import fetch from 'node-fetch';

const response = await fetch('https://deno.land/x/sqlite/mod.ts');
const data = await response.json();

const db = new DB("blog.db");
db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, user TEXT, time DATETIME DEFAULT CURRENT_TIMESTAMP)");

const posts = [
    {title:'Exam week has arrived', content:'Hopefully I will be successful, I should be able to do all the exams.', user: 'By Edi'},
    {title:'Does anyone have this?', content:'If you have an algebra book, I really need it. Meet me at the library today.', user: 'By Tana'},
    {title:'Need to eat a lot!', content:'Yes, I need a lot of food intake before the exam.', user: 'By Cava'}
];


for (const post of posts)
  db.query("INSERT INTO posts (title, content, user) VALUES (?,?,?)", [post.title, post.content, post.user]);


for (const [id, title, content, user, time] of db.query("SELECT id, title, content, user, time FROM posts"))
  console.log(id, title, content, user, time);


db.close();