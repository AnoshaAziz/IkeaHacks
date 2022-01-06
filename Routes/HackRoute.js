router = require('express').Router();
const { Hacks, Validation } = require('../Model/HackModel');
const returnFunction = require('../MiddleWare/ReturnFunction');
const authenticate = require('../MiddleWare/Authentication');
const _ = require('lodash');


router.get('/', authenticate, returnFunction(async (req, res) => {

    const hacks = await Hacks.find();
    if (!hacks) {
        res.status(404).send({ message: "Not Found" });
        return;
    }
    res.status(200).send(hacks)

}));

router.get('/:id', authenticate, returnFunction(async (req, res) => {

    const hack = await Hacks.findById(req.params.id);
    if (!hack) {
        res.status(404).send({ message: "Not Found" });
        return;
    }
    res.status(200).send(_.pick(hack, ['_id', 'Category', 'title', 'Tags', 'ImageUrl', 'Description']));

}));

router.post('/', authenticate, returnFunction(async (req, res) => {

    const { error } = Validation(req.body);
    if (error) {

        res.status(400).send({ message: error.details[0].message });
        return;
    }

    const hack = new Hacks({

        Title: req.body.Title,
        Category: req.body.Category,
        Tags: req.body.Tags,
        ImageUrl: req.body.ImageUrl,
        Description: req.body.Description

    })

    await hack.save();
    res.status(201).send(_.pick(hack, ['_id', 'Category', 'title', 'Tags', 'ImageUrl', 'Description']));

}));

router.put('/:id', authenticate, returnFunction(async (req, res) => {
    const hack = await Hacks.findByIdAndUpdate(req.params.id, {
        $set: {
            Title: req.body.Title,
            Category: req.body.Category,
            Tags: req.body.Tags,
            ImageUrl: req.body.ImageUrl,
            Description: req.body.Description
        }
    }, { new: true })
    res.status(200).send(_.pick(hack, ['_id', 'Category', 'Title', 'Tags', 'ImageUrl', , 'Description']));
}));

router.delete('/:id', authenticate, returnFunction(async (req, res) => {

    const hack = await Hacks.findByIdAndRemove(req.params.id);
    res.status(200).send({ message: "Successfully deleted" });
}))
module.exports = router;