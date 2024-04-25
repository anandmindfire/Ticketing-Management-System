// backend/controllers/ticket.controller.js

import Ticket from '../models/ticket.model.js'; // Import the Ticket model

// Get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get tickets', error: error.message });
  }
};

// Create a new ticket
export const createTicket = async (req, res) => {
    const { title, description, priority, dueDate, status } = req.body;
    const createdBy = req.user._id; // Assuming the logged-in user's ID is in req.user
  
    try {
      const newTicket = new Ticket({
        title,
        description,
        priority,
        dueDate,
        status,
        createdBy // Set the createdBy field to the user's ID
      });
  
      await newTicket.save();
      res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create ticket', error: error.message });
    }
  };
  
// Get ticket by ID
export const getTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get ticket', error: error.message });
  }
};

// Update ticket by ID
export const updateTicketById = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, status } = req.body;

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { title, description, priority, dueDate, status },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket updated successfully', ticket: updatedTicket });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ticket', error: error.message });
  }
};

// Delete ticket by ID
export const deleteTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket deleted successfully', ticket: deletedTicket });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete ticket', error: error.message });
  }
};
