const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDb...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
    const courses = await Course
        //.find({ author: 'Mosh', isPublished: true })
        //.limit(10)
        .find()
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course){
        console.log('Course not found :', id);
        return;
    }     
    course.isPublished = true;
    course.author = 'Another author';

    const result = await course.save();    
    console.log(result);
}

async function updateCourse2(id) {
    const result = await Course.updateOne({ _id: id}, {
        $set: {        
            author: 'Mosh',
            isPublished: false    
        }
    }, {new: true});
    console.log(result);
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id});
    console.log(result);
}

//getCourses();
//updateCourse('5a68ff090c553064a218a547');
removeCourse('5a68ff090c553064a218a547');
