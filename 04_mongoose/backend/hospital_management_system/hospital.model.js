const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    doctors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
        }
    ],
    patients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
        }
    ],
    medicalRecords: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MedicalRecord',
        }
    ],
    specializations: [
        {
            type: String,
            required: true,
        }
    ]
}, {timestamps: true});

export const Hospital = mongoose.model('Hospital', hospitalSchema);