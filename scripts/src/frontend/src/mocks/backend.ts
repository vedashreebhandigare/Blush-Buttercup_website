import { type backendInterface, type MenuItem, type Inquiry } from "../backend";

const MOCK_MENU_ITEMS: MenuItem[] = [
    {
        name: "Strawberry Dream Cake",
        category: "Cakes",
        description: "A fluffy strawberry sponge with fresh berries.",
        price: BigInt(94900), // In cents
    },
    {
        name: "Belgian Chocolate Truffle",
        category: "Cakes",
        description: "Rich dark chocolate with a silky smooth ganache.",
        price: BigInt(114900),
    },
    {
        name: "Vanilla Bean Classic",
        category: "Cakes",
        description: "Madagascar vanilla bean with buttercream frosting.",
        price: BigInt(84900),
    },
    {
        name: "Raspberry Rose Macarons",
        category: "Pastries",
        description: "Delicate Parisian macarons with floral cream.",
        price: BigInt(12000),
    },
];

const MOCK_INQUIRIES: Inquiry[] = [];

export const mockBackend: backendInterface = {
    async addMenuItem(name: string, category: string, description: string, price: bigint): Promise<void> {
        console.log("Mock: Adding menu item", { name, category, description, price });
        MOCK_MENU_ITEMS.push({ name, category, description, price });
    },
    async getAllInquiries(): Promise<Array<Inquiry>> {
        console.log("Mock: Getting all inquiries");
        return MOCK_INQUIRIES;
    },
    async getAllMenuItems(): Promise<Array<MenuItem>> {
        console.log("Mock: Getting all menu items");
        return MOCK_MENU_ITEMS;
    },
    async getMenuItem(name: string): Promise<MenuItem> {
        console.log("Mock: Getting menu item", name);
        const item = MOCK_MENU_ITEMS.find(i => i.name === name);
        if (!item) throw new Error("Item not found");
        return item;
    },
    async getMenuItemsByCategory(category: string): Promise<Array<MenuItem>> {
        console.log("Mock: Getting menu items by category", category);
        return MOCK_MENU_ITEMS.filter(i => i.category === category);
    },
    async submitInquiry(name: string, email: string, message: string): Promise<void> {
        console.log("Mock: Submitting inquiry", { name, email, message });
        MOCK_INQUIRIES.push({ name, email, message });
    }
};
