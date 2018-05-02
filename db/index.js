const mongoose = require('mongoose');
// mongoose.connect('mongodb://admin:notairbnb@ds159129.mlab.com:59129/campaign-module');
mongoose.connect('mongodb://localhost/quickstarter');

const Schema = mongoose.Schema;

let projectSchema = new Schema({
  'id': {
    type: Number, 
    unique: true,
  },
  'levels': [{'id': Number, 'cutoffAmount': Number, 'name': String, 'description': String, 'includes': [String], 'estimatedDelivery': Date, 'shipsTo': String, 'numberOfBackers': Number, 'maxBackers': Number}],
  'aboutInfo': String,
  'numberOfBackers': Number,
});

let userSchema = new Schema({
  'username': {
    type: String, 
    unique: true,
  },
  'projectsBacked': [{'projectId': Number, 'amount': Number}],
});

let Project = mongoose.model('Project', projectSchema);
let User = mongoose.model('User', userSchema);

let saveProjects = (projects) => {
  var promiseArray = [];
  for (let i = 0; i < projects.length; i++) {
    promiseArray.push(new Promise((resolve, reject) => {
      let projectData = new Project(projects[i]);
      projectData.save(err => {
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

let saveUserNewBackedProjects = (user) => {
  // might want to consider adjusting to allow user to upgrade (or downgrade) pledge amount
  return new Promise((resolve, reject) => {
    var username = user.username;
    getUser(username)
      .then(userData => {
        userData = JSON.parse(userData);
        let projectsBacked = userData.projectsBacked;
        projectsBacked.push({'projectId': user.projectId, 'amount': user.amount});
        let query = {};
        query['username'] = username;
        let updatedValue = {};
        updatedValue['projectsBacked'] = projectsBacked;
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
}

var getUser = (username) => {
  return new Promise((resolve, reject) => {
    var query = {};
    query['username'] = username;
    User.find(query)
      .exec((err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.stringify(user[0]));
        }
      });
  });
};

let saveUsers = (users) => {
  var promiseArray = [];
  for (let i = 0; i < users.length; i++) {
    promiseArray.push(new Promise((resolve, reject) => {
      let userData = new User(users[i]);
      userData.save(err => {
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
}

let getLevels = (projectId) => {
  return new Promise((resolve, reject) => {
    projectId = Number(projectId);
    var query = {};
    query['id'] = projectId;
    Project.find(query).
      exec((err, project) => {
        if (err) {
          reject(err);
        } else {
          console.log('project', project);
          let levels = project[0]['levels'];
          console.log('levels', levels);
          levels.sort(function(a,b) {
          return (a.cutoffAmount > b.cutoffAmount) ? 1 : ((b.cutoffAmount > a.cutoffAmount) ? -1 : 0);
          }); 				
          resolve(JSON.stringify(levels));
        }
      });
  });
};

let getAboutInfo = (projectId) => {
  return new Promise((resolve, reject) => {
    projectId = Number(projectId);
    var query = {};
    query['id'] = projectId;
    Project.find(query).
      exec((err, project) => {
        if (err) {
          reject(err);
        } else {
          let aboutInfo = project[0]['aboutInfo'];				
          resolve(aboutInfo);
        }
      });
  });
};

module.exports.Project = Project;
module.exports.User = User;
module.exports.saveUsers = saveUsers;
module.exports.saveProjects = saveProjects;
module.exports.getLevels = getLevels;
module.exports.getAboutInfo = getAboutInfo;
module.exports.saveUserNewBackedProjects = saveUserNewBackedProjects;