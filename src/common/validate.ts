import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export default class Validate extends ValidationPipe {
  //  constructor
  protected flattenValidationErrors(
    validationErrors: ValidationError[],
  ): string[] {
    const errors = {};
    console.log('*----------');

    console.log(validationErrors);

    validationErrors.forEach((error) => {
      errors[error.property] = Object.values(error.constraints)[0];
    });
    throw new HttpException(
      {
        code: 422,
        message: errors,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
