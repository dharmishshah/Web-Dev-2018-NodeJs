var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}


function unEnrollStudentInSection(enrollmentId){
  enrollmentModel.remove({ _id : enrollmentId},function(err){});

}

function findSectionsForStudent(studentId) {
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

function removeAllEnrollmentsBySectionId(sectionId){
    return enrollmentModel.remove({ section : sectionId},function(err){});
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    unEnrollStudentInSection: unEnrollStudentInSection,
    removeAllEnrollmentsBySectionId : removeAllEnrollmentsBySectionId
};