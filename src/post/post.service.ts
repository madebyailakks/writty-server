import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<Post>) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    return await new this.postModel(createPostDto).save();
  }
}
