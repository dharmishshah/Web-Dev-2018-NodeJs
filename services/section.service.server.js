module.exports = function (app) {

  app.post('/api/course/:courseId/section', createSection);
  app.put('/api/section/:sectionId', updateSection);
  app.delete('/api/section/:sectionId', deleteSection);
  app.get('/api/course/:courseId/section', findSectionsForCourse);
  app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
  app.get('/api/section/:sectionId/unenrollment/:enrollmentId', unenrollStudentInSection);
  app.get('/api/student/section', findSectionsForStudent);

  var sectionModel = require('../models/section/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');

  function findSectionsForStudent(req, res) {
    var currentUser = req.session['currentUser'];
    if(currentUser){
        var studentId = currentUser._id;
        enrollmentModel
            .findSectionsForStudent(studentId)
            .then(function(enrollments) {
                res.json(enrollments);
            });
    }else{
      res.json([])
    }

  }

  function enrollStudentInSection(req, res) {
    var sectionId = req.params.sectionId;
    var currentUser = req.session['currentUser'];
    var studentId = currentUser._id;
    var enrollment = {
      student: studentId,
      section: sectionId
    };

    sectionModel
      .decrementSectionSeats(sectionId).then(
        sectionModel.addStudentInSection(sectionId, studentId).then(function () {
            return enrollmentModel
                .enrollStudentInSection(enrollment)
        })
            .then(function (enrollment) {
                res.json(enrollment);
            })

    )

  }


    function unenrollStudentInSection(req, res){

        var enrollmentId = req.params.enrollmentId;
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;

        sectionModel.incrementSectionSeats(sectionId).then(
            sectionModel.removeStudentInSection(sectionId, studentId).then(function () {
                return enrollmentModel
                    .unEnrollStudentInSection(enrollmentId)
            })
        ).then(function(enrollment) {
          res.json("success")
        })

    }

  function findSectionsForCourse(req, res) {
    var courseId = req.params['courseId'];
    sectionModel
      .findSectionsForCourse(courseId)
      .then(function (sections) {
        res.json(sections);
      })
  }

  function createSection(req, res) {
    var section = req.body;
    section.availableSeats = section.seats;
    sectionModel
      .createSection(section)
      .then(function (section) {
        res.json(section);
      })
  }

    function updateSection(req, res) {
        var section = req.body;
        var sectionId = req.params.sectionId;
        sectionModel
            .updateSection(sectionId, section)
            .then(function (section) {
                res.json(section);
            })
    }

    function deleteSection(req, res) {
        var sectionId = req.params.sectionId;

        enrollmentModel.removeAllEnrollmentsBySectionId(sectionId).then(function () {
          return  sectionModel
              .deleteSection(sectionId)
        }).then(function (section){
          res.send('deleted successfully')
        })

    }

};