import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CurrencyDocument = HydratedDocument<Currency>;

@Schema()
export class Currency {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ required: true, unique: true, index: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, index: true, trim: true })
  code: string;

  @Prop({ trim: true })
  symbol: string;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
