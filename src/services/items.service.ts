import { Items } from '../models/items.interface';
import { Item, BaseItem } from '../models/item.interface';
import * as fs from 'fs';
import * as path from 'path';

export class ItemsService {

    items: Items;
    filename: string = 'items_sample1.json';

    constructor() {
        // const content = fs.readFileSync(`${__dirname}/../../data/${this.filename}`, 'utf8');
        const content = fs.readFileSync(path.join(__dirname, '../../data', this.filename), 'utf8');
        // console.log(`content is ${content}`);
        this.items = JSON.parse(content);
        // console.log(`this.items is ${JSON.stringify(this.items)}`);
    }

    async findAll(): Promise<Item[]> {
        return Object.values(this.items);
    }

    async find(id: number): Promise<Item> {
        return this.items[id];
    }

    async create(newItem: BaseItem): Promise<Item> {
        const id = new Date().valueOf();
        this.items[id] = { id, ...newItem };
        return this.items[id];
    }

    async update(id: number, newItem: BaseItem): Promise<Item | null> {
        const item = await this.find(id);
        
        if (!item) {
            return null;
        }

        this.items[id] = { id, ...newItem };
        return this.items[id];
    }

    async delete(id: number): Promise<Item | null> {
        const item: Item = await this.find(id);

        if (!item) {
            return null;
        }

        delete this.items[id]; // if return this it will give a boolean value

        return item;
    }
}