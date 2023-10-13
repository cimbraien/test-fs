import { ObjectId } from "bson";

export interface IRepository<T> {
	create(data: T): Promise<void>;
	
	findAll(): Promise<T[]>;

	find(id: string): Promise<T | null>;
}