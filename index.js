const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = 4000 || process.env.PORT;

app.use(express.json());
app.use(fileUpload());

let courses = [
    {
        id: "11",
        name: "Learn ReactJs",
        price: 290
    },
    {
        id: "22",
        name: "Learn Angular",
        price: 290
    },
    {
        id: "33",
        name: "Learn Djanjo",
        price: 300
    },
];

app.get("/api/v1/wale", (req, res)=>{
    res.send("Hello from Wale Developer");
});
app.get("/api/v1/waleObject", (req, res)=>{
    res.json({
        id: "11",
        name: "Learn Backend",
        price: 290
    });
});
app.get("/api/v1/courses", (req, res)=>{
    res.json(courses);
});

app.get("/api/v1/mycourses/:courseId", (req, res)=>{
    const myCourse = courses.find((course)=> course.id === req.params.courseId);
    res.send(myCourse);
});

app.get("/", (req, res)=>{
    res.send("Hello Wale");
});

app.post("/api/v1/addCourse", (req, res)=>{
    console.log(req.body);
    courses.push(req.body);
    res.send(courses);
});

app.get("/api/v1/courseQuery", (req, res)=>{

    let location = req.query.location;
    let device = req.query.device;

    res.send({
        location,
        device
    });
});
app.get("/api/v1/courseQuery", (req, res)=>{

    let location = req.query.location;
    let device = req.query.device;

    res.send({
        location,
        device
    });
});

app.post("/api/v1/courseUpload", (req, res)=>{
    const file = req.files.file;
    let path = __dirname + "/images/" + Date.now() + ".jpg";

    file.mv(path, (err)=>{
        res.send(true);
    });
});

app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}...`);
});