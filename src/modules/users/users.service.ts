import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { HashingService } from 'src/providers/hashing.service';
import { RolesEnum } from './enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRep: Repository<User>,
    private readonly hashSer: HashingService,
  ) {}

  async onModuleInit() {
    const usersCount = await this.usersRep.count();

    if (!usersCount) {
      const users: DeepPartial<User[]> = [
        {
          name: 'Admin',
          lastname: 'Admin',
          email: 'Admin',
          password: await this.hashSer.hash('admin123'),
          role: RolesEnum.ADMIN,
        },
        {
          name: 'User',
          lastname: 'User',
          email: 'User',
          password: await this.hashSer.hash('user123'),
        },
      ];

      const newUsers = this.usersRep.create(users);

      await this.usersRep.save(newUsers);
    }
  }

  async create(createUserDto: CreateUserDto) {
    if (this.emailExists(createUserDto.email))
      throw new BadRequestException('Email is already in use');

    createUserDto.password = await this.hashSer.hash(createUserDto.password);

    const newUser = this.usersRep.create(createUserDto);

    const { password, ...user } = await this.usersRep.save(newUser);

    return {
      ok: true,
      user,
    };
  }

  findOneByEmail(email: string) {
    return this.usersRep.findOne({ where: { email } });
  }

  private async emailExists(email): Promise<boolean> {
    return !!(await this.findOneByEmail(email));
  }

  async findAll() {
    const users = await this.usersRep.find();

    return {
      ok: true,
      users,
    };
  }

  async findOne(
    id: string,
    withPassword: boolean = false,
    relations: string[] = [],
  ) {
    const user = await this.usersRep.findOne({
      where: { id },
      relations,
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        password: withPassword,
        role: true,
        refresh_token: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return {
      ok: true,
      user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.email && this.emailExists(updateUserDto.email))
      throw new BadRequestException('Email is already in user');

    if (updateUserDto.refresh_token)
      updateUserDto.refresh_token = this.hashSer.hashToken(
        updateUserDto.refresh_token,
      );

    await this.usersRep.update(id, updateUserDto);

    return {
      ok: true,
      message: 'User updated successfully',
    };
  }

  async remove(id: string) {
    const { user } = await this.findOne(id, false, []);

    await this.usersRep.softRemove(user);

    return {
      ok: true,
      message: 'User deleted successfully',
    };
  }
}
