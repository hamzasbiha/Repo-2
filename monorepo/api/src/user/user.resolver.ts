import { Args, Resolver, Query, Mutation, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Resolver('users')
export class UserResovler {
  constructor(private userService: UserService) {}

  @Query(() => [UserDto])
  async getUsers() {
    return this.userService.getAll();
  }

  @Query(() => [UserDto])
  async getUser() {
    return this.userService.getUser();
  }
}
