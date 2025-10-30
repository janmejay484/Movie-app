import { Request, Response } from "express";
import * as EntryService from "./entry.service";

export const create = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, userId: (req as any).userId };
    const entry = await EntryService.createEntry(data);
    res.status(201).json(entry);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const list = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const entries = await EntryService.getEntries((req as any).userId, page, limit);
  res.json(entries);
};

export const update = async (req: Request, res: Response) => {
  try {
    const entry = await EntryService.updateEntry(Number(req.params.id), req.body);
    res.json(entry);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  await EntryService.deleteEntry(Number(req.params.id));
  res.json({ success: true });
};
