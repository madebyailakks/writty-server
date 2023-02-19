import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { PostService } from '../post/post.service';
import { ProfileService } from './profile.service';
import { CreatePostDto } from '../post/create-post.dto';
import { ProfilePostsDto } from './profile-posts.dto';

@Controller('Profile')
export class ProfileController {
  constructor(
    private readonly postService: PostService,
    private readonly profileService: ProfileService,
  ) {}

  @Post()
  async post(@Body() createPostDto: CreatePostDto, @Res() response) {
    return response.status(HttpStatus.OK).json({
      message: 'Successfully retrieved',
      data: await this.postService.create(createPostDto),
    });
  }

  @Get('posts')
  async getPosts(@Query() profilePostsDto: ProfilePostsDto) {
    return await this.profileService.getPosts(profilePostsDto);
  }
}
