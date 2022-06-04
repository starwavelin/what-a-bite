import { Items } from './items.interface';
import { Item, BaseItem } from './item.interface';


export class ItemsService {

    items: Items;

    constructor() {
        this.items = {
            1: {
                id: 1,
                name: "Burger",
                price: 599,
                description: "Tasty",
                image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
            },
            2: {
                id: 2,
                name: "Pizza",
                price: 299,
                description: "Cheesy",
                image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
            },
            3: {
                id: 3,
                name: "Tea",
                price: 199,
                description: "Informative",
                image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
            }
        };
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

    async delete(id: number): Promise<null | void> {
        const item = await this.find(id);

        if (!item) {
            return null;
        }

        delete this.items[id]; // if return this it will give a boolean value
    }
}