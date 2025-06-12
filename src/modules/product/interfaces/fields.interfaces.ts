import { Product } from '@prisma/client'

export declare interface ProductRequired extends Required<Product> {}

export declare interface ProductOptional extends Partial<Product> {}
