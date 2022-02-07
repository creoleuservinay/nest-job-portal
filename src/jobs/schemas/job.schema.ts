import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { JobStatus } from '../dto/job-status.dto';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop()
  title: string;

  @Prop()
  quantity: number;

  @Prop()
  experience: number;

  @Prop({ default: JobStatus.OPEN })
  status: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
