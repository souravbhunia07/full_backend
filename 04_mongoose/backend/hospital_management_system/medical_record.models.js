const { times } = require('lodash');
const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({}, {timestamps: true});

export const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);