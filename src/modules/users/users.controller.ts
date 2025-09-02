import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { IdParamDto } from 'src/global/dto/id-param.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: IdParamDto) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: IdParamDto, @Body() updateRoleDto: UpdateRoleDto) {
    return this.usersService.update(id, updateRoleDto);
  }
}
