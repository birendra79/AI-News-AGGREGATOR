const express = require('express');
const router = express.Router();
const newsService = require('../services/newsService');
const aiService = require('../services/aiService');

// Get top headlines
router.get('/headlines', async (req, res) => {
  try {
    const { category, q, country, language } = req.query;
    const articles = await newsService.getHeadlines(category, q, country, language);
    res.json({ articles });
  } catch (error) {
    console.error('Error in /headlines:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Generate summary for an article
router.post('/summarize', async (req, res) => {
  try {
    const { title, content, description, language } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required for summarization' });
    }

    const textToSummarize = `Title: ${title}\n\nDescription: ${description || ''}\n\nContent: ${content || ''}`;
    const summary = await aiService.generateSummary(textToSummarize, language);
    
    res.json({ summary });
  } catch (error) {
    console.error('Error in /summarize:', error.message);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

module.exports = router;
