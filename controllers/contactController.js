const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

const getContacts = asyncHandler(async (req, res, next) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const createContacts = asyncHandler(async (req, res) => {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const newContact = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(newContact);
});

const updateContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
});

const deleteContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `Contact deleted successfully` });
});

module.exports = { getContacts, getAllContacts, updateContacts, deleteContacts, createContacts };
