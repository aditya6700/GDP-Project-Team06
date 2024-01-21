const DonorRequestHistory = require("../models/donorRequestModel");
const PatientRequestHistory = require("../models/patientRequestModel");
const Users = require("../models/userModel");

// user status update route
module.exports.statusUpdate = async (req,res) => {
    const { status, id } = req.params;
    try {
        const updatedUser = await Users.findOneAndUpdate({ _id: id }, { status });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        res.status(200).json({
            success: true,
            message: `User status updated to ${status}`
        })
    }
    catch (error) {
        res.status(422).json({
            success: false,
            message: 'Failed to update user status',
            error: error.message
        });
    }
}

module.exports.getDonors = async (req,res) => {
    try {
        const donors = await Users.find({ userType: 'donor' },
            {
                _id: 1,
                name: 1,
                email: 1,
                status: 1,
                registerDate: 1
            }
        );
        res.status(200).json({
            message: 'Donors list fetched succesfully',
            success: true,
            donors
        });
    }
    catch (error) {
        res.status(422).json({
            message: 'Failed to fetch donors list',
            success: false,
            error: error.message
        });
    }
}

module.exports.getPatients = async (req,res) => {
    try {
        const patients = await Users.find({ userType: 'patient' },
            {
                _id: 1,
                name: 1,
                email: 1,
                status: 1,
                registerDate: 1
            }
        );
        res.status(200).json({
            message: 'Patients list fetched succesfully',
            success: true,
            patients
        });
    }
    catch (error) {
        res.status(422).json({
            message: 'Failed to fetch patients list',
            success: false,
            error: error.message
        });
    }
}

module.exports.getDonationsList = async (req,res) => {
    try {
        const donationsList = await DonorRequestHistory.find({ type: 'donate' },
            {
                _id: 1,
                bloodGroup: 1,
                quantity: 1,
                status: 1,
                donor: 1
            }
        ).populate({
            path: 'donor',
            select: 'name', 
        });
        
        const fomattedDonationsList = donationsList.map((donation) => ({
            _id: donation._id,
            donor: donation.donor.name,
            bloodGroup: donation.bloodGroup,
            quantity: donation.quantity,
            status: donation.status,
        }));
  
        res.status(200).json({
            message: 'Donations list fetched succesfully',
            success: true,
            fomattedDonationsList
        });
    }
    catch (error) {
        res.status(422).json({
            message: 'Failed to fetch donations list',
            success: false,
            error: error.message
        });
    }
}

module.exports.getRequestsList = async (req, res) => {
    let requestsList = [];
    try {
        let donorRequestList = await DonorRequestHistory.find({ type: 'request' },
            {
                _id: 1,
                bloodGroup: 1,
                quantity: 1,
                status: 1,
                donor: 1
            }
        ).populate({
            path: 'donor',
            select: 'name', 
        });

        const formattedDonorRequestList = donorRequestList.map((request) => ({
            _id: request._id,
            donor: request.donor.name,
            bloodGroup: request.bloodGroup,
            quantity: request.quantity,
            status: request.status,
        }));

        let patientRequestList = await PatientRequestHistory.find({},
            {
                _id: 1,
                bloodGroup: 1,
                quantity: 1,
                status: 1,
                patient: 1
            }
        ).populate({
            path: 'patient',
            select: 'name', 
        });
        
        
        const formattedPatientRequestList = patientRequestList.map((request) => ({
            _id: request._id,
            patient: request.patient.name,
            bloodGroup: request.bloodGroup,
            quantity: request.quantity,
            status: request.status,
        }));

        requestsList = [...formattedDonorRequestList, ...formattedPatientRequestList];
  
        res.status(200).json({
            message: 'Requests list fetched succesfully',
            success: true,
            requestsList
        });
    }
    catch (error) {
        res.status(422).json({
            message: 'Failed to fetch requests list',
            success: false,
            error: error.message
        });
    }
}