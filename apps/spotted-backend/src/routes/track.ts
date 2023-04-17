import express from 'express';
import { createBullBoard } from '@bull-board/api';
import { Queue } from 'bullmq';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import performTracking from '../helper/perform-tracking';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.post('/preview', async (req, res) => {
  const { url, tracked_action, user_actions } = req.body;

  try {
    const content = await performTracking(url, tracked_action, user_actions);
    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching content' });
  }
});

// Create the tracking queue
const trackingQueue = new Queue('tracking');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(trackingQueue)],
  serverAdapter: serverAdapter,
});

// Add the /track route
router.post('/track', authenticateUser, async (req, res) => {
  const { url, tracked_action, user_actions, user_id } = req.body;

  // Add the job to the tracking queue
  await trackingQueue.add(
    'tracking',
    { url, tracked_action, user_actions },
    {
      jobId: user_id,
      repeat: { pattern: '0 */1 * * *' }, // Run every hour
      removeOnComplete: true,
    }
  );

  res.status(200).send('Tracking job scheduled');
});

// Add the Bull dashboard
router.use('/admin/queues', serverAdapter.getRouter());

export default router;
