import express, {Response, Request} from 'express';
import { FamilyMemberController } from '../controllers/FamilyMemberController';
import { authMiddleware, authAdminMiddleware } from '../middleware/authMiddleware';
import { registerValidator } from '../validators/userValidator';

const router = express.Router();
const familyMemberController = new FamilyMemberController();

// GET /familyMember
/**
 * @swagger
 * /api/familyMember:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - FamilyMember
 *     summary: Get all FamilyMember
 *     description: Get all FamilyMember
 *     responses:
 *       '200':
 *         description: A list of FamilyMember
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */
router.get('/', authMiddleware, (req: Request, res: Response) => familyMemberController.list(req, res));

// POST /familyMember
/**
 * @swagger
 * /api/familyMember:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - FamilyMember
 *     summary: Create a new message
 *     description: Create a new message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 email:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal server error
 */
router.post('/', authMiddleware, (req: Request, res: Response) => familyMemberController.create(req, res));

// GET /familyMember/user/{id}
/**
 * @swagger
 * /api/familyMember/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - FamilyMember
 *     summary: Get FamilyMember by user id
 *     description: Get FamilyMember by user id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A list of FamilyMember
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */
router.get('/user/:id', authMiddleware, (req: Request, res: Response) => familyMemberController.findByUserId(req, res));
export default router;