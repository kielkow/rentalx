import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;

      this.createSpecificationUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }
}

export { CreateSpecificationController };
