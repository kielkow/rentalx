import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase,
      );

      await createSpecificationUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }
}

export { CreateSpecificationController };
