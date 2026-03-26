import express from "express";

const app = express();

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.get("/", (req, res) => {
    res.send(`
        <h3> Instagram logo <h3>
        <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbeQEaLYtW8864NUrNmf8OtltgNKJSvhx5xA&s" alt="Instagram logo">
        <p> UserName : Rohan  </p>
        <p> Followers : 100 </p>
        <p> Following : 100 </p>
        <p> Posts : 100 </p>
        <p> Location : India </p>
        <p> Joined : 1 year ago </p>
        </div>
        `);
});
app.get("/post", (req, res) => {
    res.send(`
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
                background-color: #fafafa; 
                display: flex; 
                justify-content: center; 
                padding-top: 50px;
                margin: 0;
                
            }
            .post-card { 
                background: white; 
                border: 1px solid #dbdbdb; 
                border-radius: 3px; 
                width: 300px; 
                padding-bottom: 10px;
            }
            .post-card img { 
                width: 100%; 
                display: block; 
            }
            .actions { 
                padding: 10px; 
                display: flex; 
                justify-content: space-between;
                padding-left: 15px;
                padding-right: 15px;
            }
            button { 
                background: none; 
                border: none; 
                cursor: pointer; 
                font-size: 14px; 
                font-weight: 600; 
                color: #262626; 
                padding: 5px;
            }
            button:hover { 
                color: #8e8e8e; 
            }
        </style>
        <div class="post-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABbXr4i-QODqhy7tofHYmTYh05rYPktzacw&s" alt="Post">
            <div class="actions">
                <button>Like</button>
                <button>Comment</button>
                <button>Share</button>
                <button>Save</button>
            </div>
        </div>
    `);
});