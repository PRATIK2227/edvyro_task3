import { Router } from 'express';
import {
  createInternship, deleteInternship, getInternship, listInternships, updateInternship,
} from '../controllers/internshipController.js';
import { validate } from '../middleware/validate.js';
import {
  createInternshipSchema, idSchema, listInternshipsSchema, updateInternshipSchema,
} from '../validators/internshipSchemas.js';

const router = Router();

router.route('/')
  .post(validate(createInternshipSchema), createInternship)
  .get(validate(listInternshipsSchema), listInternships);

router.route('/:id')
  .get(validate(idSchema), getInternship)
  .patch(validate(updateInternshipSchema), updateInternship)
  .put(validate(createInternshipSchema.extend({ params: idSchema.shape.params })), updateInternship)
  .delete(validate(idSchema), deleteInternship);

export default router;
