"use strict";

const chai = require("chai");
const expect = require("chai").expect;

chai.use(require("chai-http"));

const app = require("../app.js"); // Our app
let token = "";

describe("User APIs", function() {
  //this.timeout(5000); // How long to wait for a response (ms)

  before(function() {});

  after(function() {});

  // GET - List all colors
  it("should return token", function() {
    return chai
      .request(app)
      .post("/auth/signin")
      .send({
        email: "vatsalshah2210@gmail.com",
        password: "12345678"
      })
      .then(function(res) {
        token = res.body.token;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
      });
  });

  // GET
  it("should return User", function() {
    return chai
      .request(app)
      .get("/user/profile")
      .set({ Authorization: "Bearer " + token })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
      });
  });

  //   // POST - Add new color
  //   it('should add new color', function() {
  //     return chai.request(app)
  //       .post('/colors')
  //       .send({
  //         color: 'YELLOW'
  //       })
  //       .then(function(res) {
  //         expect(res).to.have.status(201);
  //         expect(res).to.be.json;
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.results).to.be.an('array').that.includes(
  //           'YELLOW');
  //       });
  //   });

  //   // POST - Bad Request
  //   it('should return Bad Request', function() {
  //     return chai.request(app)
  //       .post('/colors')
  //       .type('form')
  //       .send({
  //         color: 'YELLOW'
  //       })
  //       .then(function(res) {
  //         throw new Error('Invalid content type!');
  //       })
  //       .catch(function(err) {
  //         expect(err).to.have.status(400);
  //       });
  //   });
});
