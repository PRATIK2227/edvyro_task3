import { InternshipRepository } from '../repositories/internshipRepository.js';
import { HttpError } from '../utils/httpError.js';

export class InternshipService {
  constructor(repository = new InternshipRepository()) {
    this.repository = repository;
  }

  create(data) {
    return this.repository.create(data);
  }

  async list(filters) {
    const { rows, total } = await this.repository.findAll(filters);
    return {
      data: rows,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(total / filters.limit),
        hasNextPage: filters.page * filters.limit < total,
        hasPreviousPage: filters.page > 1,
      },
    };
  }

  async get(id) {
    const internship = await this.repository.findById(id);
    if (!internship) throw new HttpError(404, 'Internship not found', 'INTERNSHIP_NOT_FOUND');
    return internship;
  }

  async update(id, data) {
    const internship = await this.repository.update(id, data);
    if (!internship) throw new HttpError(404, 'Internship not found', 'INTERNSHIP_NOT_FOUND');
    return internship;
  }

  async delete(id) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new HttpError(404, 'Internship not found', 'INTERNSHIP_NOT_FOUND');
  }
}
