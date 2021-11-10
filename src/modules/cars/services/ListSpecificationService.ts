import { Specification } from '../model/Specification';
import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';

class ListSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute(): Specification[] {
    const specifications = this.specificationsRepository.list();

    return specifications;
  }
}

export { ListSpecificationService };
