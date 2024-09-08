import { Request, Response } from "express";
import { comparePasswords, hashPassword } from "../services/password.service";
import prisma from '../models/user'
import { generateToken } from "../services/auth.services";


export const register  = async (req: Request, res: Response): Promise<void> =>{

    

    const {email, password} = req.body

    try {

        if(!password) {
            res.status(400).json({ message: "All fields are necesssary"})
            return
        }
        if(!email) {
            res.status(400).json({ message: "All fields are necesssary"})
            return
        }

        const hashedPassword = await hashPassword(password)

        const user = await prisma.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        const token = generateToken(user)
        res.status(201).json({ token })

    } catch (error: any) {

       if(error?.code === 'P2002' && error?.meta?.target?.includes(email)){
            res.status(400).json({message:"Email already exists"})
       }
        console.log(error);
        res.status(500).json({error: 'There was an error'})
        
    }
}

export const login = async (req:Request, res:Response): Promise<void> => {
    
    const {email, password} = req.body

    try {
        if(!password) {
            res.status(400).json({ message: "All fields are necesssary"})
            return
        }
        if(!email) {
            res.status(400).json({ message: "All fields are necesssary"})
            return
        }
        const user = await prisma.findUnique({ where : {email} })
        if(!user){
            res.status(400).json({ error: "User or password not found"})
            return
        }

        const passwordMatch = await comparePasswords(password, user.password)
        if(!passwordMatch){
            res.status(401).json({ error: "User or password don't match"})
        }

        const token = generateToken(user)
        res.status(200).json({ token })
    } catch (error: any) {
      console.log({error : error});
        
    }

}