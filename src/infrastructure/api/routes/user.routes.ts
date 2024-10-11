import express, {Response, Request} from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware, authAdminMiddleware } from '../middleware/authMiddleware';
import { registerValidator } from '../validators/userValidator';

const router = express.Router();
const userController = new UserController();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNo:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user has been successfully registered
 *       400:
 *         description: The request body is invalid
 */
router.post('/register', registerValidator, (req: Request, res: Response) => userController.register(req, res));

/**
 * @swagger
 * /api/users/confirmation/{token}:
 *   get:
 *     summary: Confirm email
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email confirmed successfully
 *       400:
 *         description: Invalid or expired token
 */
router.get('/confirmation/:token', (req, res) => userController.confirmEmail(req, res));

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */
router.post('/login', (req, res) => userController.login(req, res));

/**
 * @swagger
 * /api/users/change-password:
 *   post:
 *     summary: Reset password
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                  type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent to email
 *       400:
 *         description: Invalid email
 */
router.post('/change-password', authMiddleware, (req, res) => userController.changePassword(req, res));

// Use the authMiddleware for routes that require authentication
/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', authMiddleware, (req, res) => userController.getProfile(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', (req, res) => userController.getUser(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authAdminMiddleware, (req, res) => userController.deleteUser(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *     put:
 *      summary: Update user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               phoneNo:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                  type:string
 *               status:
 *                  type:string
 *     responses:
 *       200:
 *         description: User details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error       
 */
router.put('/:id', authAdminMiddleware, (req, res) => userController.updateUser(req, res));

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/', (req, res) => userController.getUsers(req, res));

/**
 * @swagger
 * /api/users/:
 *   put:
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/credit', authAdminMiddleware, (req, res) => userController.updateCredit(req, res));

/**
 * @swagger
 * /api/users/home/my-messages:
 *   get:
 *     summary: Get all messages
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Messages
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/home/my-messages', authMiddleware, (req, res)=> userController.getMessages(req, res));

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent to email
 *       400:
 *         description: Invalid email
 */
router.post('/forgot-password', (req, res) => userController.forgotPassword(req, res));

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Reset password
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent to email
 *       400:
 *         description: Invalid email
 */
router.post('/reset-password', (req, res) => userController.resetPassword(req, res));

/**
 * @swagger
 * /api/users/home/dashboard:
 *   get:
 *     summary: Get user dashboard
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User dashboard
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/home/dashboard', authMiddleware, (req, res) => userController.dashboard(req, res));
export default router;