const express = require("express")
const router = express.Router()
const Person = require('./../models/person')

router.post("/", async(req, res) => {
    // const data = req.body //Assuming the req.body contain the person data

    // const newPerson = new Person(data)
    // newPerson.save((error, person) => {
    //     if (error) {
    //         console.log("error");
    //         res.status(500).json({ error: 'Internal server error' })
    //     } else {
    //         console.log("Data savw successfully");
    //         res.status(200).json(person)
    //     }
    // })


    try {
        const data = req.body;
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();
        console.log("data saved.");
        res.status(200).json(savedPerson)
    } catch (error) {
        console.log(res.status(500).json({ error: "internal servr error." }));
    }
})

router.get("/", async(req, res) => {
    try {
        const fetchedData = await Person.find()
        console.log("data fetched");
        res.status(200).json(fetchedData)
    } catch (error) {
        console.log(res.status(500).json({ error: "internal servr error." }));
    }
});
router.get("/:workType", async(req, res) => {
    try {
        const workType = req.params.workType
        if (workType == 'chef' || workType == 'owner' || workType == 'waiter') {
            const response = await Person.find({ work: workType })
            console.log("response fetched.");
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: "invalid work type." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error, "internal server error work type.")
    }
});
router.put("/:id", async(req, res) => {
    try {
        const personId = req.params.id //Extract the id from the URL parameter
        const updatedPersonData = req.body // updated data from person
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //return the updated document
            runValidators: true, //Run mongoose validators
        });
        console.log("data updated.");
        res.status(200).json(response);
        if (!response) {
            return res.status(404).json({ error: "Person not found." })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error, "internal server error work type.")
    }
})
router.delete("/:id", async(req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person not found." })
        };
        console.log("data deleted.");
        res.status(200).json(response);
    } catch (error) {

    }


})
module.exports = router;