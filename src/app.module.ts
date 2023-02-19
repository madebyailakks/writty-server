import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SearchController} from "./search/search.controller";
import {SearchService} from "./search/search.service";
import {ProfileSchema} from "./profile/profile.schema";
import {MongooseModule} from '@nestjs/mongoose';
import {ProfileService} from "./profile/profile.service";
import * as dotenv from "dotenv";
import {FollowSchema} from "./user/data/follow/follow.schema";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {SearchResolver} from "./search/search.resolver";
import {UserSchema} from "./user/user/user.schema";
import {PostSchema} from "./post/post.schema";
import {PostService} from "./post/post.service";
import {PostController} from "./post/post.controller";
import {ProfileController} from "./profile/profile.controller";

dotenv.config();

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: process.cwd() + 'src/schema.gql',
            debug: false,
            playground: false,
        }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        MongooseModule.forFeature(
            [
                {name: 'Profile', schema: ProfileSchema},
                {name: 'Follow', schema: FollowSchema},
                {name: 'User', schema: UserSchema},
                {name: 'Post', schema: PostSchema},
            ])
    ],
    controllers: [AppController, SearchController, ProfileController, PostController],
    providers: [AppService, SearchService, ProfileService, PostService, SearchResolver],
})
export class AppModule {
}