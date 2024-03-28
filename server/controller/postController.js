import db from "../db.js";

const post=(req, res)=>{
    const sql='INSERT INTO post (title, description, userId) VALUES($1, $2, $3)';
    console.log(req.body.userId);
    const post=[
        req.body.title,
        req.body.description,
        req.body.userId
    ];
    db.query(sql, post, (err, result)=>{
        if(err) return res.json({Error:'Database error'})
        return res.json({Status:'Success'});
    })
}

const updatePost=(req, res)=>{
    const query='UPDATE post SET title = $1, description = $2 WHERE id = $3';
    const post=[
        req.body.title,
        req.body.description,
        req.body.id
    ]
    db.query(query, post, (err, result)=>{
        if(err){
            return res.json({Error:'Database error'});
        }else{
            return res.json({Status:'Success'});
        }
    })
}

const deletePost=(req, res) => {
    const postId = req.params.postId; // Ottenere l'ID del post dalla richiesta
    const sql = 'DELETE FROM post WHERE id = $1';
    db.query(sql, [postId], (err, result) => {
        if (err) {
            return res.json({ Error: err.message });
        } else {
            return res.json({Status: 'Success' });
        }
    });
}

const myPosts= (req, res)=>{
    const sql='SELECT * FROM post WHERE userId=$1 ORDER BY created_at DESC';
    db.query(sql, [req.id], (err, data)=>{
        const datas=data.rows;
        if(err){
            return res.json({Error:'No posts found'});
        }
        if(datas.length>0){
            const myPosts = datas.map(post => ({  id:post.id, title: post.title, description: post.description, userId: post.userId }));
            return res.json({Status:'Success', myPosts: myPosts});
        }
    })
}

const searchPosts= (req, res)=>{
    const searchTerm = `%${req.body.value}%`;
    const searchTerm2 = `%${req.body.value}%`;
    const sql="SELECT * FROM post WHERE title ILIKE $1 OR description ILIKE $2 ORDER BY created_at DESC";
    db.query(sql, [searchTerm, searchTerm2], (err, data)=>{
        const datas=data.rows;
        if(err){
            return res.json({Error:'No posts found'});
        }
        if(datas.length>0){
            const posts = datas.map(post => ({  id:post.id, title: post.title, description: post.description, userId: post.userId }));
            return res.json({Status:'Success', posts: posts});
        }
    })
};

const allPosts=(req, res)=>{
    const sql='SELECT * FROM post ORDER BY created_at DESC';
    db.query(sql, (err, data)=>{
        const datas=data.rows;
        if(err){
            return res.json({Error:'No posts found'});
        }
        if(datas.length>0){
            const posts = datas.map(post => ({  id:post.id, title: post.title, description: post.description, userId: post.userId }));
            return res.json({Status:'Success', posts: posts});
        }
    })
}

export { post, updatePost, deletePost, myPosts, searchPosts, allPosts };