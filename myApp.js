require('dotenv').config();
const mongoose = require('mongoose');
const { Schema, model } = mongoose;


mongoose.connect(process.env.MONGO_URI, 
{ useNewUrlParser: true, 
  useUnifiedTopology: true,
 }, () => {
console.log('DB Connection sucessful');
 });


//#1
const schema = new Schema ({
  name: {
    type: String,
    require: true,
  },
  age: Number,
  favoriteFoods: [String ],
});

let Person = model('Person', schema);



//#2
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "shiv",
    age: 36,
    favoriteFoods: ['Indian'],
  });
 
  person.save(function(err, data) {
    done(null, data);
  });
  
};

//#3
const arrayOfPeople = [
  { name: 'Rohan', age: 6, favoriteFoods: ['Icecream'] },
  { name: 'Rohan', age: 6, favoriteFoods: ['Icecream'] },
  { name: 'Rohan', age: 6, favoriteFoods: ['Icecream'] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
done(null, people);
  }); 
  
};

//#4
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName}, (err, person) => 
  {
    done(null,person);
  } );
};

//#5
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food}, (err, person) =>
  {
    done(null, person);
  });
  
};

//#6
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => 
  {
    done(null, person);
  });
  
};

//#7
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    person.favoriteFoods.push(foodToAdd)
    person.save((error, updatedPerson) => {
      done(null, updatedPerson);
    });
    
  });
};

//#8
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, person) => {
    done(null,person);
  }
  )
};

//#9
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    done(null, person);
  });
};

//#10
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
Person.remove({ name: nameToRemove }, (err, person) => {
  done(null, person);
});
};

//#11
// Modify the queryChain function to find people who like the food specified by 
// the variable named foodToSearch. Sort them by name, limit the results to two 
// documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec(). 
//Pass the done(err, data) callback to exec().

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch})
  .sort({name: 1})
.limit(2)
.select({ age: 0 })
.exec(( err, data) => {
  done(null, data);
}) 
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
