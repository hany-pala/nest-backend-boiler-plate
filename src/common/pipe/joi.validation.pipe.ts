import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata): any {
    console.log('joi value: ', value, metadata);

    const { error } = this.schema.validate(value);
    console.log('error: ', error);
    if (error) {
      throw new BadRequestException('validation failed');
    }
    return value;
  }
}
