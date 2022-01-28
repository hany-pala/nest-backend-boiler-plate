import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// export interface ArgumentMetadata {
//   type: 'body' | 'query' | 'param' | 'custom';
//   metatype?: Type<unknown>;
//   data?: string;
// }

// custom pipe
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !ValidationPipe.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    console.log('object: ', value, object, metatype);
    const errors = await validate(object);
    console.log(errors);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  private static toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
