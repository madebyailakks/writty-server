import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../user/user.schema';
import { Profile } from '../../../profile/profile.schema';

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
})
export class Follow {
  @Prop({ default: Date.now() })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;
}

export const FollowSchema = SchemaFactory.createForClass(Follow).index(
  { user: 1, profile: 1 },
  { unique: true },
);
