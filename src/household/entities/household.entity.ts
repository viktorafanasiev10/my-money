import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Currency } from 'src/currency/entities/currency.entity';
import { User } from 'src/user/entities/user.entity';

export type HouseholdDocument = HydratedDocument<Household>;

@Schema()
export class Household {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Currency' }] })
  favoriteCurrencies: Currency[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: User;
}

export const HouseholdSchema = SchemaFactory.createForClass(Household);
