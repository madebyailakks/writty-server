import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreatePostDto } from './create-post.dto';
import { PostService } from './post.service';

@Controller('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async post(@Body() createPostDto: CreatePostDto, @Res() response) {
    return response.status(HttpStatus.OK).json({
      message: 'Successfully posted',
      data: await this.postService.create(createPostDto),
    });
  }
}
