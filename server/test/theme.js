var chai = require('chai');
var should = chai.should();
var Theme = require('../models/Theme');
var config = require('../config/config');
var request = require('supertest');

describe('Theme Settings Model', function() {
    it('should create(POST) a new setting', function(done) {
        var theme = new Theme({
            user_id: "test", //company or user id
            form_color: "default",
            background_img: "default",
            displayPhone: false,
            displayClock: false,
            displaySignature: false,
            additionalComments: false
        });
        theme.save(function(err) {
            if (err) return done(err);
            done();
        });
    });

    it('should GET theme setting', function(done) {
        Theme.findOne({
            user_id: "test"
        }, function(err, theme) {
            if (err) return done(err);
            theme.background_img.should.equal('default');
            theme.form_color.should.equal('default');
            theme.displayClock.should.equal(false);
            theme.displayPhone.should.equal(false);
            theme.displaySignature.should.equal(false);
            theme.additionalComments.should.equal(false);
            done();
        });
    });

    it('should update(PUT) theme setting', function(done) {
        Theme.findOne({
            user_id: "test"
        }, function(err, theme) {
            theme.user_id = "test"; //company or user id
            theme.form_color = "default";
            theme.background_img = "default";
            theme.displayPhone = false;
            theme.displayClock = true;
            theme.displaySignature = false;
            theme.additionalComments = true;
            theme.save(function(err) {
                if (err) return done(err);
                theme.background_img.should.equal('default');
                theme.form_color.should.equal('default');
                theme.displayClock.should.equal(true);
                theme.displayPhone.should.equal(false);
                theme.displaySignature.should.equal(false);
                theme.additionalComments.should.equal(true);
                done();
            });
        });
    });

    it('should remove(DELETE) theme setting', function(done) {
        Theme.remove({
            user_id: "test"
        }, function(err, theme) {
            if (err) return done(err);
            theme.should.equal(1);
            done();
        });
    });

});


describe('GET /api/:user_id/theme', function() {
    it('should respond with theme info for respective user_id', function(done) {
        var url = "localhost:" + config.port;
        var user_id = '1';
        request(url)
            .get('/api/' + user_id + '/theme')
            .end(function(err, res) {
                res.body.should.have.property('_id');
                res.body.should.have.property('additionalComments');
                res.body.should.have.property('user_id');
                res.body.should.have.property('form_color');
                res.body.should.have.property('background_img');
                res.body.should.have.property('displayPhone');
                res.body.should.have.property('displayClock');
                res.body.should.have.property('displaySignature');

                done();
            });
    });
});

describe('POST /api/:user_id/theme', function() {
    it('should respond with theme info for respective user_id settings that were created for first time user', function(done) {
        var url = "localhost:" + config.port;
        var _user_id = '1';
        var _form_color = 'default';
        var _background_img = 'default';
        var _displayPhone = false;
        var _displayClock = false;
        var _displaySignature = false;
        var _additionalComments = false;
        request(url)
            .post('/api/' + _user_id + '/theme')
            .send({
                form_color: _form_color,
                background_img: _background_img,
                displayPhone: _displayPhone,
                displayClock: _displayClock,
                displaySignature: _displaySignature,
                additionalComments: _additionalComments
            })
            .end(function(err, res) {
                console.log(res.body);
                res.body.should.have.property('user_id');
                res.body.should.have.property('form_color');
                res.body.should.have.property('background_img');
                res.body.should.have.property('displayPhone');
                res.body.should.have.property('displayClock');
                res.body.should.have.property('displaySignature');
                res.body.should.have.property('additionalComments');

                res.body.user_id.should.equal(_user_id);
                res.body.form_color.should.equal(_form_color);
                res.body.background_img.should.equal(_background_img);
                res.body.displayPhone.should.equal(_displayPhone);
                res.body.displayClock.should.equal(_displayClock);
                res.body.displaySignature.should.equal(_displaySignature);
                res.body.additionalComments.should.equal(_additionalComments);

                done();
            });
    });
});

describe('PUT /api/:user_id/theme', function() {
    it('should respond with theme info for respective user_id settings that were updated', function(done) {
        var url = "localhost:" + config.port;
        var _user_id = '1';
        var _form_color = "1";
        var _background_img = "1";
        var _displayPhone = false;
        var _displayClock = false;
        var _displaySignature = false;
        var _additionalComments = false;
        request(url)
            .put('/api/' + _user_id + '/theme')
            .send({
                form_color: _form_color,
                background_img: _background_img,
                displayPhone: _displayPhone,
                displayClock: _displayClock,
                displaySignature: _displaySignature,
                additionalComments: _additionalComments
            })
            .end(function(err, res) {
                res.body.should.have.property('user_id');
                res.body.should.have.property('form_color');
                res.body.should.have.property('background_img');
                res.body.should.have.property('displayPhone');
                res.body.should.have.property('displayClock');
                res.body.should.have.property('displaySignature');
                res.body.should.have.property('additionalComments');

                res.body.user_id.should.equal(_user_id);
                res.body.form_color.should.equal(_form_color);
                res.body.background_img.should.equal(_background_img);
                res.body.displayPhone.should.equal(_displayPhone);
                res.body.displayClock.should.equal(_displayClock);
                res.body.displaySignature.should.equal(_displaySignature);
                res.body.additionalComments.should.equal(_additionalComments);

                done();
            });
    });
});

describe('DELETE /api/:user_id/theme', function() {
    it('should respond with successful delete', function(done) {
        var url = "localhost:" + config.port;
        var user_id = '1';
        request(url)
            .delete('/api/' + user_id + '/theme')
            .end(function(err, res) {
                console.log(res.body);
                res.body.should.equal(1);
                done();
            });
    });
});