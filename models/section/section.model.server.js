var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
  return sectionModel.create(section);
}

function updateSection(sectionId, section){
    return sectionModel.update({
        _id: sectionId
    }, {
        $set: {name: section.sectionName,
            seats:section.sectionSeats}
    });
}

function deleteSection(sectionId){
  return sectionModel.remove({_id: sectionId}, function(err){})
}

function findSectionsForCourse(courseId) {
  return sectionModel.find({courseId: courseId}).populate('students').exec();
}

function decrementSectionSeats(sectionId) {
  return sectionModel.update({
    _id: sectionId
  }, {
    $inc: {availableSeats: -1}
  });
}

function incrementSectionSeats(sectionId) {
  return sectionModel.update({
    _id: sectionId
  }, {
    $inc: {availableSeats: +1}
  });
}

function addStudentInSection(sectionId, studentId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $push: {students: studentId}
    });
}


function removeStudentInSection(sectionId, studentId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $pull: {students: studentId}
    });
}

module.exports = {
  createSection: createSection,
  findSectionsForCourse: findSectionsForCourse,
  decrementSectionSeats: decrementSectionSeats,
  incrementSectionSeats: incrementSectionSeats,
    addStudentInSection : addStudentInSection,
    removeStudentInSection: removeStudentInSection,
    updateSection : updateSection,
    deleteSection : deleteSection
};