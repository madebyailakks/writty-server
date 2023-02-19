import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { User } from '../user/user/user.schema';

@InputType()
export class CreatePostDto {
  @IsString()
  @Field()
  readonly content: string;

  @IsMongoId({ message: 'invalid id' })
  @IsOptional()
  @Field()
  readonly profile: string;

  readonly user: User;
}
