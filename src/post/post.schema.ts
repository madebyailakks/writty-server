import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { Profile } from '../profile/profile.schema';

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
export class Post {
  @Prop({ default: Date.now() })
  @Field()
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;

  @Prop()
  @Field()
  content: string;
}

const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.virtual('likeCount', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post',
  count: true,
});

export { PostSchema };
