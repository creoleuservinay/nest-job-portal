import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop()
  title: string;

  @Prop()
  userid: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
