// Example usage of ticket controller in Express routes
import express from 'express';
import {
  getAllTickets,
  createTicket,
  getTicketById,
  updateTicketById,
  deleteTicketById
} from '../controllers/ticket.controller.js';

const router = express.Router();

// Routes for ticket CRUD operations
router.get('/', getAllTickets);
router.post('/', createTicket);
router.get('/:id', getTicketById);
router.patch('/:id', updateTicketById);
router.delete('/:id', deleteTicketById);

export default router;
