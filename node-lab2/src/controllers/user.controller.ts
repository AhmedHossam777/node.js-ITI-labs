import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export class UserController {
	getAllUsers = async (req: Request, res: Response) => {
		const users = await userService.getAll();
		res.status(200).json({
			success: true,
			count: users.length,
			data: users,
		});
	};

	getUserById = async (req: Request, res: Response) => {
		const user = await userService.getById(req.params.id);
		res.status(200).json({
			success: true,
			data: user,
		});
	};

	createUser = async (req: Request, res: Response) => {
		const user = await userService.create(req.body);
		res.status(201).json({
			success: true,
			message: 'User created successfully',
			data: user,
		});
	};

	updateUser = async (req: Request, res: Response) => {
		const user = await userService.update(req.params.id, req.body);
		res.status(200).json({
			success: true,
			message: 'User updated successfully',
			data: user,
		});
	};

	deleteUser = async (req: Request, res: Response) => {
		await userService.delete(req.params.id);
		res.status(200).json({
			success: true,
			message: 'User deleted successfully',
		});
	};
}

export const userController = new UserController();
