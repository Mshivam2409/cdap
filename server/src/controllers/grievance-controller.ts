import { Request, NextFunction, Response } from "express";
import { grievanceFormData, grievance } from "types";
import { v4 } from "uuid";
import { grievancesdb, studentsdb } from "data/database";

const newGrievance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: grievanceFormData = req.body
        const id = v4()
        const newGrievance: grievance = {
            name: data.name,
            rollno: data.rollno,
            phoneno: data.phoneno,
            email: data.email,
            date: Date.now(),
            resolved: "Not Resolved",
            mode: data.mode,
            audio: req.file ? req.file.originalname : "",
            text: data.text || ""
        }
        console.log(newGrievance)
        grievancesdb.set(id, newGrievance).write()
        res.status(201).send({ message: `Grievance added with id ${id}` })
    }
    catch (error) {
        console.log(console.error())
        res.status(500).send({ message: "Sorry , An error occured in the server we could not process your request. Please try again later." })
    }
}

const validateStudentCredentials = async (req: Request, res: Response, next: NextFunction) => {
    const data: {
        email: string,
        rollno: string
    } = req.body
    try {
        if ((studentsdb.get(data.rollno.trim()).value()) === data.email.trim()) {
            res.status(200).send({ message: "Vailid Cridentials" })
        }
        else {
            res.status(422).send({ message: "Invalid Cridentials" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Invalid Cridentials" })
    }
}

export { newGrievance, validateStudentCredentials }