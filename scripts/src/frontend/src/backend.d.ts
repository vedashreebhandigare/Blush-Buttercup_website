import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    name: string;
    description: string;
    category: string;
    price: bigint;
}
export interface Inquiry {
    name: string;
    email: string;
    message: string;
}
export interface backendInterface {
    addMenuItem(name: string, category: string, description: string, price: bigint): Promise<void>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllMenuItems(): Promise<Array<MenuItem>>;
    getMenuItem(name: string): Promise<MenuItem>;
    getMenuItemsByCategory(category: string): Promise<Array<MenuItem>>;
    submitInquiry(name: string, email: string, message: string): Promise<void>;
}
