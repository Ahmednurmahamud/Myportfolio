const db = require('../db/initDB');
const bcrypt = require('bcrypt');

function applyRoutes(app) {
    // Home route
    /*$2b$12$Zi7OfjvG9KIuNPW7OSB5..1FnLjWuGO.0wsormZQ8RSAJC2a7Qh.m  (3)
    $2b$12$NQlcS72kpQxzpBwn4w0dFu88XCYlP9GCC5R1/W3eIZODvJMX0KShK (2)
    $2b$12$X4CIfFBdyWgvc.NZFRVBnOaSB/11Fs0ND0h8.yYHfCTdp4tt12B/y   (1) */
    app.get('/', (req, res) => {
        /*saltRounds = 12
        bcrypt.hash("totoro", saltRounds, function(err, hash) {
            if (err) {
                console.log("ERROR encrypting the password: ", err)

            } else {
                console.log("Hashed password (GENERATE ONLY ONCE): ", hash)
            }

        });*/
        const model = {
            isLoggedIn: req.session.isLoggedIn,
            name: req.session.name,
            isAdmin: req.session.isAdmin
        }
        res.render('home', model);
    });


    app.get('/about', (req, res) => {
        db.all("SELECT * FROM experience", [], (error, experiences) => {
            if (error) {
                const model = {
                    dbError: true,
                    theError: error,
                    experiences: [],
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                }
                res.render('about', model);
            } else {
                const model = {
                    dbError: false,
                    theError: "",
                    experiences: experiences,
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                }
                res.render('about', model);
            }
        });
    });

    app.get('/skills', (req, res) => {
        db.all("SELECT * FROM skills", [], (error, skills) => {
            if (error) {
                const model = {
                    dbError: true,
                    theError: error,
                    skills: [],
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                }
                res.render('skills', model);
            } else {
                const model = {
                    dbError: false,
                    theError: "",
                    skills: skills,
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                }
                res.render('skills', model);
            }

        });
    });

    app.get('/contact', (req, res) => {
        const model = {
            isLoggedIn: req.session.isLoggedIn,
            name: req.session.name,
            isAdmin: req.session.isAdmin
        }
        res.render('contact', model);
    });

    app.get('/resume', (req, res) => {
        const model = {
            isLoggedIn: req.session.isLoggedIn,
            name: req.session.name,
            isAdmin: req.session.isAdmin
        }
        res.render('resume', model);
    });
    // Projects page
    app.get('/projects', (req, res) => {
        db.all("SELECT * FROM projects", function(error, theprojects) {
            if (error) {
                const model = {
                        dbError: true,
                        theError: error,
                        projects: [],
                        isLoggedIn: req.session.isLoggedIn,
                        name: req.session.name,
                        isAdmin: req.session.isAdmin
                    }
                    // Render the Handlebars template with the combined data
                res.render('projects', model);
            } else {
                const model = {
                        dbError: false,
                        theError: "",
                        projects: theprojects,
                        isLoggedIn: req.session.isLoggedIn,
                        name: req.session.name,
                        isAdmin: req.session.isAdmin
                    }
                    // Render the Handlebars template with the combined data
                res.render('projects', model);
            }
        })
    });

    app.get('/project/:id', (req, res) => {
        db.get("SELECT * FROM projects WHERE id=? LIMIT 1", req.params.id, function(error, project) {
            if (error) {
                const errorModel = {
                        errorMesage: "An error has occured"
                    }
                    // Render the Handlebars template with the combined data
                res.status(500).render("404", errorModel);
            } else if (!project) {
                const notFound = {
                    errorMesage: "project nor found"
                }
                res.status(404).render("404", notFound);


            } else {
                // Render the Handlebars template with the combined data
                res.render('project', { project });
            }
        })
    });

    // Login route
    app.get('/login', (req, res) => {
        const model = {}
        res.render('login', model);
    });

    /* app.post('/login', (req, res) => {
         const un = req.body.un;
         const pw = req.body.pw;

         // Simple login check  
         if (un === "Ahmednur" && pw === "12345") {
             console.log("Ahmednur is logged in!");
             req.session.isAdmin = true;
             req.session.isLoggedIn = true;
             req.session.name = "Ahmednur";
             res.redirect('/');
         } else {
             console.log("wrong username or password");
             req.session.isAdmin = false;
             req.session.isLoggedIn = false;
             req.session.name = "";
             res.redirect('/login');
         }
     });*/

    app.post('/login', (req, res) => {
        const un = req.body.un
        const pw = req.body.pw

        if (un == "Ahmednur") {
            bcrypt.compare(pw, "$2b$12$X4CIfFBdyWgvc.NZFRVBnOaSB/11Fs0ND0h8.yYHfCTdp4tt12B/y", function(err) {
                if (err) {
                    console.log("Try again!")
                    req.session.isAdmin = false
                    req.session.isLoggedIn = false
                    req.session.name = ""
                    res.redirect('/login')
                } else {
                    console.log("Ahmednur is logged in!")
                    req.session.isAdmin = true
                    req.session.isLoggedIn = true
                    req.session.name = "Ahmednur"
                    res.redirect('/')
                }
            })
        }
    });

    // Logout route
    app.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.error("Error destroying session:", err);
                res.redirect('/');
            } else {
                console.log("logged out.");
                res.redirect('/');
            }
        });
    });
    //...Detele from projects
    app.get('/projects/delete/:id', (req, res) => {
        console.log("DELETING...")
        const id = req.params.id;
        if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
            db.run("DELETE FROM projects WHERE id=?", [id], function(error) {
                if (error) {
                    console.log("ERROR deleting... ", error)
                    const model = {
                        dbError: true,
                        theError: error,
                        isLoggedIn: req.session.isLoggedIn,
                        name: req.session.name,
                        isAdmin: req.session.isAdmin,
                    }
                    res.render('home', model);
                } else {
                    /* const model = {
                             dbError: false,
                             theError: "",
                             isLoggedIn: req.session.isLoggedIn,
                             name: req.session.name,
                             isAdmin: req.session.isAdmin,
                         }*/
                    // res.render('home', model);
                    res.redirect('/projects');
                }
            })
        } else {
            res.redirect('/login');
        }
    });

    //sends the form for a new project
    app.get('/projects/new', (req, res) => {
        if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
            const model = {
                isLoggedIn: req.session.isLoggedIn,
                name: req.session.name,
                isAdmin: req.session.isAdmin,
            }
            res.render('newproject.handlebars', model);
        } else {
            res.redirect('/login');
        }
    });


    // Sends the form to modify the project 
    app.get('/projects/update/:id', (req, res) => {
        const id = req.params.id;
        console.log("THE ID: ", id)
        db.get("SELECT * FROM projects WHERE id=?", [id], (error, project) => {
            if (error) {
                console.error("ERROR", error);
                const model = {
                    dbError: true,
                    theError: error,
                    project: {},
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                }
                res.render('modifyproject', model);
            } else {
                const model = {
                    dbError: false,
                    theError: "",
                    project: project,
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    helpers: {
                        theTypeT(value) { return value = "Tech"; },
                        theTypeE(value) { return value = "Education"; },
                        theTypeO(value) { return value = "Other"; }
                    }

                }
                console.log("RENDERING modify")
                res.render('modifyproject', model);
            }
        });
    });

    //modifies an existing project
    app.post('/projects/update/:id', (req, res) => {
        console.log("modifying project")
        const updatedProject = req.params.id;
        const newp = [
            req.body.projname,
            req.body.projimg,
            req.body.projyear,
            req.body.projdesc,
            req.body.projtype,
            updatedProject
        ];
        if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
            db.run("UPDATE projects SET name=?, imgUrl=?, year=?, description=?, type=? WHERE id=?", newp, (error) => {
                if (error) {
                    console.log("ERROR: ", error);
                } else {
                    console.log("Project updated!");
                }
                res.redirect('/projects');
            });
        } else {
            res.redirect('/login');
        }
    });

    //creates a new project
    app.post('/projects/new', (req, res) => {
        const newp = [
            req.body.projname,
            req.body.projimg,
            req.body.year,
            req.body.description,
            req.body.type
        ];
        if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
            db.run("INSERT INTO projects (name, imgUrl, year, description, type) VALUES (?, ?, ?, ?, ?)", newp, (error) => {
                if (error) {
                    console.log("ERROR: ", error);
                } else {
                    console.log("Line added into project table!");
                }
                res.redirect('/projects');
            })
        } else {
            res.redirect('/login');
        }
    });


    // Projects page
    app.get('/education', (req, res) => {
        db.all("SELECT * FROM education", function(error, educations) {
            if (error) {
                const model = {
                        dbError: true,
                        theError: error,
                        education: [],
                        isLoggedIn: req.session.isLoggedIn,
                        name: req.session.name,
                        isAdmin: req.session.isAdmin
                    }
                    // Render the Handlebars template with the combined data
                res.render('projects', model);
            } else {
                const model = {
                        dbError: false,
                        theError: "",
                        education: educations,
                        isLoggedIn: req.session.isLoggedIn,
                        name: req.session.name,
                        isAdmin: req.session.isAdmin
                    }
                    // Render the Handlebars template with the combined data
                res.render('education', model);
            }
        })
    });


    //deleting from education
    app.get('/education/delete/:id', (req, res) => {
        console.log("DELETING...")
        const id = req.params.id;
        if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
            db.run("DELETE FROM education WHERE id=?", [id], function(error) {
                if (error) {
                    console.log("ERROR deleting... ", error)
                    const model = {
                        dbError: true,
                        theError: error,
                        isLoggedIn: req.session.isLoggedIn,
                        name: req.session.name,
                        isAdmin: req.session.isAdmin,
                    }
                    res.render('home', model);
                } else {
                    /* const model = {
                             dbError: false,
                             theError: "",
                             isLoggedIn: req.session.isLoggedIn,
                             name: req.session.name,
                             isAdmin: req.session.isAdmin,
                         }*/
                    // res.render('home', model);
                    res.redirect('/education');
                }
            })
        } else {
            res.redirect('/login');
        }
    });

    //sends the form for a new education
    app.get('/education/new', (req, res) => {
        if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
            const model = {
                isLoggedIn: req.session.isLoggedIn,
                name: req.session.name,
                isAdmin: req.session.isAdmin,
            }
            res.render('neweducation', model);
        } else {
            res.redirect('/login');
        }
    });

    // Sends the form to modify the education 
    app.get('/education/update/:id', (req, res) => {
        const id = req.params.id;
        console.log("THE ID: ", id)
        db.get("SELECT * FROM education WHERE id=?", [id], (error, educations) => {
            if (error) {
                console.error("ERROR", error);
                const model = {
                    dbError: true,
                    theError: error,
                    education: {},
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                }
                res.render('modifyeducation', model);
            } else {
                const model = {
                    dbError: false,
                    theError: "",
                    education: educations,
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    helpers: {
                        theTypeM(value) { return value = "Middle School"; },
                        theTypeH(value) { return value = "High school"; },
                        theTypeU(value) { return value = "University"; }
                    }

                }
                console.log("RENDERING modify")
                res.render('modifyeducation', model);
            }
        });
    });

    //modifies an existing education
    app.post('/education/update/:id', (req, res) => {
        console.log("modifying education")
        const updatedEducation = req.params.id;
        const newE = [
            req.body.eduname,
            req.body.eduimg,
            req.body.eduyear,
            req.body.edudesc,
            req.body.edutype,
            updatedEducation
        ];
        if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
            db.run("UPDATE education SET name=?, imgUrl=?, year=?, description=?, type=? WHERE id=?", newE, (error) => {
                if (error) {
                    console.log("ERROR: ", error);
                } else {
                    console.log("Education updated!");
                }
                res.redirect('/education');
            });
        } else {
            res.redirect('/login');
        }
    });

    //creates a new education
    app.post('/education/new', (req, res) => {
        const newE = [
            req.body.eduname,
            req.body.eduimg,
            req.body.eduyear,
            req.body.edudesc,
            req.body.edutype
        ];
        if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
            db.run("INSERT INTO education (name, imgUrl, year, description, type) VALUES (?, ?, ?, ?, ?)", newE, (error) => {
                if (error) {
                    console.log("ERROR: ", error);
                } else {
                    console.log("Line added into education table!");
                }
                res.redirect('/education');
            })
        } else {
            res.redirect('/login');
        }
    });

    // 404 Not Found handler
    app.use((req, res) => {
        res.status(404).render('404');
    });



}

module.exports = applyRoutes;