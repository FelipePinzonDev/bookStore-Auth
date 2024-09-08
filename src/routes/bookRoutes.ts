import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({error: "No Authorized"})
    }

    jwt.verify(token, JWT_SECRET, (err, decoded)=>{
        if(err){
            console.error("Error in auth: ", err);
            return res.status(403).json({error: "Don't have correct access or role for this"})
        }
        next()
    })
}

router.post('/', authenticateToken, () => {} )
router.get('/', authenticateToken, () => {} )
router.get('/:id', authenticateToken, () => {} )
router.put('/:id', authenticateToken, () => {} )
router.delete('/:id', authenticateToken, () => {} )

export default router