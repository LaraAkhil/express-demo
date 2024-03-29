const express = require('express');
const Joi = require('@hapi/joi');
const app = express();
app.use(express.json());
const courses = [{
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    }
];

app.get('/', (req, res) => {
    res.send('hello!!');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.post('/api/courses', (req, res) => {


    const {
        error
    } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.get('/api/courses/:id', (req, res) => {
    // res.send(req.params.id);
    // req.query for query paras
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('not found');
        return;
    }
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('not found');
        return;
    }


    const {
        error
    } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;

    res.send(course);


})

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('not found');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);

})


function validateCourse(course) {

    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);

}

const port = process.env.NODEPORT || 3000;
console.log(process.env.NODEPORT);

app.listen(port, _ => {
    console.log(`runnung on port ${port}`);
});