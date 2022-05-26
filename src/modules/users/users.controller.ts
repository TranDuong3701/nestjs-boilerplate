import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/common/constants/global.const';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/database/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Auth(Role.Admin)
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userRepository: UsersRepository) {}

  @Get()
  @ApiOkResponse({
    type: [User],
  })
  getList() {
    return this.userRepository.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.userRepository.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    type: User,
  })
  store(@Body() createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }
}
