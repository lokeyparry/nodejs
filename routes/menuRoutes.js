const express = require('express')

const router = express.Router()
const Menu = require('./../models/menu')
router.post("/", async(req, res) => {
    try {
        const data = req.body
        const newMenu = new Menu(data);
        const saveMenu = await newMenu.save()
        console.log("Data is saved")
        res.status(200).json(saveMenu)
    } catch (error) {
        console.log(res.status(500).json({ error: "internal servr error." }));
    }

})
router.get("/", async(req, res) => {
    try {
        const fetchdata = await Menu.find()
        console.log("data is fetched");
        res.status(200).json(fetchdata)
    } catch (error) {
        console.log(res.status(500).json({ error: "internal servr error." }));
    }
})
router.get("/:tasteType", async(req, res) => {
    try {
        const tasteType = req.params.tasteType
        if (tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'namkeen') {
            const r = await Menu.find({ taste: tasteType })
            console.log("response fetched.");
            res.status(200).json(r)
        } else {
            res.status(404).json({ error: "invalid work type." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error, "internal server error work type.")
    }
})
router.put("/:id", async(req, res) => {
    try {
        const menuId = req.params.id
        const menuData = req.body;
        const updateMenuData = await Menu.findByIdAndUpdate(menuId, menuData, {
            new: true, //return the updated document
            runValidators: true, //Run mongoose validators
        })
        console.log("data updated.");
        res.status(200).json(updateMenuData)
        if (!updateMenuData) {
            return res.status(404).json({ error: "Menu  not found." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error, "internal server error work type.")
    }
})
router.delete("/:id", async(req, res) => {
    try {
        const menuId = req.params.id
        const response = await Menu.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: "Id  not found." })
        }
        console.log("Data deletd.");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json(error, "internal server error work type.")
    }


})

module.exports = router