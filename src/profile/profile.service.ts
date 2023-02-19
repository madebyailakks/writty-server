import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './profile.schema';
import { Post } from '../post/post.schema';
import { ProfilePostsDto } from './profile-posts.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile') private profileModel: Model<Profile>,
    @InjectModel('Post') private postModel: Model<Post>,
  ) {}

  async getProfile(result) {
    const profile = await this.profileModel
      .findOne({ link: result.link })
      .populate('followersCount');

    if (profile) {
      return profile;
    }

    await this.profileModel.create({ link: result.link });
  }

  async getPosts(profilePostsDto: ProfilePostsDto): Promise<Post[]> {
    const res = await this.postModel
      .find({ profile: profilePostsDto.profile })
      .populate('user')
      .populate('quoted');

    return res;
  }
}
