import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
})
@ObjectType()
export class Profile {
  @Prop({ default: Date.now() })
  @Field()
  date: Date;

  @Prop()
  @Field()
  query: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field()
  link: string;

  @Prop()
  @Field()
  type: string;

  followersCount: number;
}

const ProfileSchema = SchemaFactory.createForClass(Profile);

ProfileSchema.virtual('followersCount', {
  ref: 'Follow',
  localField: '_id',
  foreignField: 'user',
  count: true,
});

export { ProfileSchema };
