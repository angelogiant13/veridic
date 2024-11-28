import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteFile } from '../../lib/s3'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const filename = req.query.filename as string
  if (!filename) {
    return res.status(400).json({ message: 'Filename is required' })
  }

  try {
    await deleteFile(filename)
    res.status(200).json({ message: 'File deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete file' })
  }
}
