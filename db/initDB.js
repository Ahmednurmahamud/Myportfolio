const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/myprojects.db');

db.serialize(() => {
    // All your database initialization code here...
});
db.run("CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, name TEXT, imgUrl TEXT, year INTEGER, description TEXT, type TEXT)", err => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log("Successfully created the 'projects' table!");

    const projects = [
        { name: "Weather app", imgUrl: "/img/weather.jpeg", year: 2022, description: "A simple weather app.", type: "Web Application" },
        { name: "Recipe finder", imgUrl: "/img/recipe.png", year: 2021, description: "Find recipes online.", type: "Web Application" },
        { name: "Budget app", imgUrl: "/img/budget.jpeg", year: 2022, description: "Track and manage your finances.", type: "Mobile Application" }
    ];

    projects.forEach(project => {
        db.get("SELECT * FROM projects WHERE name=?", [project.name], (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (!row) {
                db.run("INSERT INTO projects (name, imgUrl, year, description, type) VALUES (?, ?, ?, ?, ?)", [project.name, project.imgUrl, project.year, project.description, project.type], function(err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log(`Inserted project with ID: ${this.lastID}`);
                    }
                });
            }
        });
    });
});

db.run("CREATE TABLE IF NOT EXISTS education (id INTEGER PRIMARY KEY, name TEXT, imgUrl TEXT, year INTEGER, description TEXT, type TEXT)", err => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log("Successfully created the 'education' table!");

    const educationList = [
        { name: "Computer Science", imgUrl: "/img/comsci.jpeg", year: 2020, description: "Computer Science.", type: "Bachelor's Degree" },
        { name: "Web Development", imgUrl: "/img/webdev.webp", year: 2021, description: "web development course.", type: "Certificate" },
        { name: "Economics", imgUrl: "/img/eco.webp", year: 2019, description: "Introduction to economics.", type: "Bachelor's Degree" },
        { name: "Digital Marketing", imgUrl: "/img/dig.jpeg", year: 2021, description: "Digital marketing.", type: "Diploma" },
        { name: "Business", imgUrl: "/img/bussiness.jpeg", year: 2021, description: "managing a business.", type: "Bachelor's Degree" }
    ];

    educationList.forEach(education => {
        db.get("SELECT * FROM education WHERE name=?", [education.name], (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (!row) {
                db.run("INSERT INTO education (name, imgUrl, year, description, type) VALUES (?, ?, ?, ?, ?)", [education.name, education.imgUrl, education.year, education.description, education.type], function(err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log(`Inserted education entry with ID: ${this.lastID}`);
                    }
                });
            }
        });
    });
});

db.run("CREATE TABLE IF NOT EXISTS skills (id INTEGER PRIMARY KEY, name TEXT, proficiency TEXT, category TEXT, yearsOfExperience INTEGER, description TEXT)", err => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log("Successfully created the 'skills' table!");

    const skills = [
        { name: "JavaScript", proficiency: "Advanced", category: "Programming Languages", yearsOfExperience: 5, description: "Frontend and Backend scripting language." },
        { name: "HTML/CSS", proficiency: "Intermediate", category: "Web Development", yearsOfExperience: 4, description: "Webpage structure and design." },
        { name: "Python", proficiency: "Intermediate", category: "Programming Languages", yearsOfExperience: 3, description: "General purpose language, often used for AI and Web." },
        { name: "React", proficiency: "Advanced", category: "Web Frameworks", yearsOfExperience: 2, description: "JavaScript library for building user interfaces." },
        { name: "SQL", proficiency: "Intermediate", category: "Databases", yearsOfExperience: 3, description: "Language for managing relational databases." }
    ];

    skills.forEach(skill => {
        db.get("SELECT * FROM skills WHERE name=?", [skill.name], (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (!row) {
                db.run("INSERT INTO skills (name, proficiency, category, yearsOfExperience, description) VALUES (?, ?, ?, ?, ?)", [skill.name, skill.proficiency, skill.category, skill.yearsOfExperience, skill.description], function(err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log(`Inserted skill with ID: ${this.lastID}`);
                    }
                });
            }
        });
    });
});

db.run("CREATE TABLE IF NOT EXISTS experience (id INTEGER PRIMARY KEY, position TEXT, company TEXT, duration TEXT, location TEXT, description TEXT)", err => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log("Successfully created the 'experience' table!");

    const experiences = [
        { position: "Software Developer", company: "TechCorp", duration: "3 years", location: "New York, USA", description: "Developed and maintained web applications using JavaScript and React." },
        { position: "Database Administrator", company: "DataFirm", duration: "2 years", location: "London, UK", description: "Managed SQL databases, ensured backups and handled migrations." },
        { position: "Frontend Designer", company: "DesignMasters", duration: "1.5 years", location: "Sydney, Australia", description: "Created responsive and intuitive UIs for diverse clients." }
        // ... Add more experiences as required
    ];

    experiences.forEach(experience => {
        db.get("SELECT * FROM experience WHERE company=?", [experience.company], (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (!row) {
                db.run("INSERT INTO experience (position, company, duration, location, description) VALUES (?, ?, ?, ?, ?)", [experience.position, experience.company, experience.duration, experience.location, experience.description], function(err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log(`Inserted experience with ID: ${this.lastID}`);
                    }
                });
            }
        });
    });
});

module.exports = db;

module.exports = db;