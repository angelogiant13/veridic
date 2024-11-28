import type { NextApiRequest, NextApiResponse } from 'next'
import { listFiles } from '../../lib/s3'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const files = await listFiles()
    res.status(200).json(files)
  } catch (error) {
    res.status(500).json({ message: 'Failed to list files' })
  }
}
