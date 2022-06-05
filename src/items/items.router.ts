import express, { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../common/httpStatusCodes.enum';
import { Item } from './item.interface';
import { ItemsService } from './items.service';

export const itemsRoter = express.Router();

const url = '/menu/v1/items';
const itemsService = new ItemsService();

// GET items
itemsRoter.get(`${url}/`, async(req: Request, res: Response, next: NextFunction) => {
    try {
        const items: Item[] = await itemsService.findAll();
        res.status(HttpStatus.OK).send(items);
    } catch (e) {
        res.status(HttpStatus.InternalError).send(e);
    }
});


// GET item
itemsRoter.get(`${url}/:id`, async(req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const item: Item = await itemsService.find(id);

        if (!item) {
            res.status(HttpStatus.NotFound).send(`Item is not found with ID ${id}`);
        }

        return res.status(HttpStatus.OK).send(item);        
    } catch (e) {
        res.status(HttpStatus.InternalError).send(e);
    }
});

// POST an item
itemsRoter.post(`${url}/`, async(req: Request, res: Response, next: NextFunction) => {
    try {
        const item: Item = req.body as Item;
        const newItem: Item = await itemsService.create(item);
        return res.status(HttpStatus.Created).send(newItem);
    } catch (e) {
        res.status(HttpStatus.InternalError).send(e);
    }
});

// PUT an item
itemsRoter.put(`${url}/:id`, async(req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        const itemToUpdate = req.body as Item;
        const existingItem = await itemsService.find(id);

        if (existingItem) {
            const updatedItem = await itemsService.update(id, itemToUpdate);
            return res.status(HttpStatus.OK).send(updatedItem);
        }

        // If there is no item existed for the given id, we allow this method to add a new item
        const newItem = await itemsService.create(itemToUpdate);
        return res.status(HttpStatus.Created).send(newItem);
    } catch (e) {
        res.status(HttpStatus.InternalError).send(e);
    }
});

// DELETE an item
itemsRoter.delete(`${url}/:id`, async(req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    
    try {
        const itemToDel = await itemsService.delete(id);
        if (!itemToDel) {
            return res.status(HttpStatus.NotFound).send(`There is no item to delete associated with Id ${id}`);
        }
        return res.status(HttpStatus.NoContent);
    } catch (e) {
        res.status(HttpStatus.InternalError).send(e);
    }
});