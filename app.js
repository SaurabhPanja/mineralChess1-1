var express  = require("express"),
  app        = express(),
  bodyParser = require("body-parser"),
  mongoose   = require("mongoose"),
  flash      = require('connect-flash'),
  Register   = require("./models/register"),
  Subscribe  = require("./models/subscribe");

mongoose.connect("mongodb://localhost/MineralRegister");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

//deafult path
//Tournamnet details
app.get("/", function(req, res) {
  res.render("index");
});
// app.get("/tournament",function (req,res) {
//
//   res.render("tournament");
// });
//Index path----- registration
app.get("/registerVadodara", function(req, res) {
  var date = "25/03/2018",
    venue = "Vadodara";
  res.render("register", {
    date: date,
    venue: venue
  });
});
app.get("/registerNadiad", function(req, res) {
  var date = "13/04/2018",
    venue = "Nadiad";
  res.render("register", {
    date: date,
    venue: venue
  });
});
app.get("/registerSurat", function(req, res) {
  var date = "06/06/2018",
    venue = "Surat";
  res.render("register", {
    date: date,
    venue: venue
  });
});
//saving input in database primary key email_id if found update else create
app.post("/register", function(req, res) {
  Register.findOneAndUpdate({
      email: req.body.Register.email
    }, {
      $push: {
        dateVenueId: req.body.Register.dateVenueId
      },
      $set: {
        name: req.body.Register.name,
        contactNumber: req.body.Register.contactNumber,
        venue: req.body.Register.venue,
        date: req.body.Register.date
      }
    }, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    },
    function(err, data) {
      if (!err) {
        if (!data) {
          data = new Register();
        }
        data.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
        res.render("success",{text:"You have registered successfully!"});
      } else {
        console.log(err);
        res.render("success",{text:"Sorrry we could not register, call us to fix the issue"});
      }
    });
});

app.post("/subscribe",function (req,res) {
  Subscribe.create({email:req.body.email},function (err,data) {
    if (err) {
      console.log(err);
    }else {
      console.log(data);
    }
        res.render("success",{text:"You have subscribed successfully!"});
  });
});

app.get("*",function (req,res) {
  res.render("success",{text:"You seems lost or should I say Error 404!"});
});
app.listen(8080, function() {
  console.log("listening on port 8080");
});
