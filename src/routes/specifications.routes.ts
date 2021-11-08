import { Router } from "express";

import { 
    SpecificationsRepository 
} from "../modules/cars/repositories/SpecificationsRepository";

import { 
    ListSpecificationService 
} from "../modules/cars/services/ListSpecificationService";
import { 
    CreateSpecificationService 
} from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.get("/", (request, response) => {
    const listSpecificationService = new ListSpecificationService(
        specificationsRepository
    );

    const specifications = listSpecificationService.execute();

    return response.json(specifications);
});

specificationsRoutes.post("/", (request, response) => {
    try {
        const { name, description } = request.body;

        const createSpecificationService = new CreateSpecificationService(
            specificationsRepository
        );
    
        createSpecificationService.execute({ name, description });
    
        return response.status(201).send();
    } catch (error) {
        return response.status(error.status).json({ message: error.message });
    }
});

export { specificationsRoutes };
