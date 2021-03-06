const mongoose = require('mongoose');
// mongoose.connect('mongodb://admin:notairbnb@ds159129.mlab.com:59129/campaign-module');
mongoose.connect('mongodb://localhost/quickstarter');

// query for insertion
// db.users.insert({username: "mo", projectsBacked: [{projectId: 77, amount: "77.00"}, {projectId: 777, amount: "777.00"}]});
// query for update 
// db.users.findOneAndUpdate({username: "mo"}, { $set: {projectsBacked: [{projectId:77, amount: "8888"}]}});
// query for last item in project
// db.projects.find().limit(1).sort({$natural: -1}).explain("executionStats");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  levels: [
    {
      id: Number,
      cutoffAmount: Number,
      name: String,
      description: String,
      includes: [String],
      estimatedDelivery: Date,
      shipsTo: String,
      numberOfBackers: Number,
      maxBackers: Number,
    },
  ],
  aboutInfo: String,
  numberOfBackers: Number,
});

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  projectsBacked: [{ projectId: Number, amount: Number }],
});

const Project = mongoose.model('Project', projectSchema);
const User = mongoose.model('User', userSchema);

// saveProjects & saveUsers are for data generation
const saveProjects = (projects) => {
  const promiseArray = [];
  for (let i = 0; i < projects.length; i++) {
    promiseArray.push(new Promise((resolve, reject) => {
      const projectData = new Project(projects[i]);
      projectData.save((err) => {
        if (err) {
          console.log('ERROR in saveProjects', err);
          reject(err);
        } else {
          resolve(1);
        }
      });
    }));
  }
  return Promise.all(promiseArray);
};

const saveUsers = (users) => {
  const promiseArray = [];
  for (let i = 0; i < users.length; i++) {
    promiseArray.push(new Promise((resolve, reject) => {
      const userData = new User(users[i]);
      userData.save((err) => {
        if (err) {
          console.log('ERROR in saveUsers', err);
          reject(err);
        } else {
          resolve(1);
        }
      });
    }));
  }
  return Promise.all(promiseArray);
};


// queries for GET request
const getLevels = projectId => new Promise((resolve, reject) => {
  projectId = Number(projectId);
  const query = {};
  query.id = projectId;
  Project.find(query)
    .exec((err, project) => {
      if (err) {
        reject(err);
      } else {
        console.log('project', project);
        const levels = project[0].levels;
        console.log('levels', levels);
        levels.sort((a, b) => ((a.cutoffAmount > b.cutoffAmount) ? 1 : ((b.cutoffAmount > a.cutoffAmount) ? -1 : 0)));
        resolve(JSON.stringify(levels));
      }
    });
});

const getAboutInfo = projectId => new Promise((resolve, reject) => {
  projectId = Number(projectId);
  const query = {};
  query.id = projectId;
  Project.find(query)
    .exec((err, project) => {
      if (err) {
        reject(err);
      } else {
        const aboutInfo = project[0].aboutInfo;
        resolve(aboutInfo);
      }
    });
});

const getUser = username => new Promise((resolve, reject) => {
  const query = {};
  query.username = username;
  User.find(query)
    .exec((err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.stringify(user[0]));
      }
    });
});


// query for POST request
const saveUserNewBackedProjects = user =>
  // might want to consider adjusting to allow user to upgrade (or downgrade) pledge amount
  new Promise((resolve, reject) => {
    const username = user.username;
    getUser(username)
      .then((userData) => {
        userData = JSON.parse(userData);
        const projectsBacked = userData.projectsBacked;
        projectsBacked.push({ projectId: user.projectId, amount: user.amount });
        const query = {};
        query.username = username;
        const updatedValue = {};
        updatedValue.projectsBacked = projectsBacked;
        User.findOneAndUpdate(query, updatedValue)
          .exec((err, user) => {
            if (err) {
              reject(err);
            } else {
              resolve(1);
            }
          });
      });
  });



module.exports.Project = Project;
module.exports.User = User;
module.exports.saveUsers = saveUsers;
module.exports.saveProjects = saveProjects;
module.exports.getLevels = getLevels;
module.exports.getAboutInfo = getAboutInfo;
module.exports.saveUserNewBackedProjects = saveUserNewBackedProjects;
