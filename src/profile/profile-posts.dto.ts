import { IsMongoId } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Profile } from './profile.schema';

@InputType()
export class ProfilePostsDto {
  @IsMongoId({ message: 'invalid profile' })
  @Field()
  readonly profile: Profile;
}
