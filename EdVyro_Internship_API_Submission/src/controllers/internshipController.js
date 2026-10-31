import { asyncHandler } from '../utils/asyncHandler.js';
import { InternshipService } from '../services/internshipService.js';

const service = new InternshipService();

export const createInternship = asyncHandler(async (req, res) => {
  const data = await service.create(req.validated.body);
  res.status(201).json({ success: true, message: 'Internship created successfully', data, requestId: req.id });
});

export const listInternships = asyncHandler(async (req, res) => {
  const result = await service.list(req.validated.query);
  res.json({ success: true, message: 'Internships retrieved successfully', ...result, requestId: req.id });
});

export const getInternship = asyncHandler(async (req, res) => {
  const data = await service.get(req.validated.params.id);
  res.json({ success: true, message: 'Internship retrieved successfully', data, requestId: req.id });
});

export const updateInternship = asyncHandler(async (req, res) => {
  const data = await service.update(req.validated.params.id, req.validated.body);
  res.json({ success: true, message: 'Internship updated successfully', data, requestId: req.id });
});

export const deleteInternship = asyncHandler(async (req, res) => {
  await service.delete(req.validated.params.id);
  res.json({ success: true, message: 'Internship deleted successfully', requestId: req.id });
});
