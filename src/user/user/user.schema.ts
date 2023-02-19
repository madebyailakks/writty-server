import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
})
export class User {
  @Prop({ default: Date.now() })
  date: Date;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
