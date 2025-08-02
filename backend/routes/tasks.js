const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// GET a single task by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Task not found' });
      }
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error.message);
    res.status(500).json({ error: 'Error fetching task' });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const { title, status = 'pending' } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, status }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ error: 'Error creating task' });
  }
});

// PUT (update) a task by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  if (!title && !status) {
    return res.status(400).json({ error: 'At least one field (title or status) is required' });
  }

  try {
    // Build update object with only provided fields
    const updateData = {};
    if (title) updateData.title = title;
    if (status) updateData.status = status;

    const { data, error } = await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    console.error(`Error updating task ${id}:`, error.message);
    res.status(500).json({ error: 'Error updating task' });
  }
});

// DELETE a task by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error.message);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

module.exports = router;