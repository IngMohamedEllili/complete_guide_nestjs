'use strict';

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AbstractDto {
    @Expose()
    id!: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}