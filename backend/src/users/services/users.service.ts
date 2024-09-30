import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { User } from '../domain/user';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createProfileDto: CreateUserDto) {
    const clonedPayload = {
      ...createProfileDto,
    };

    if (clonedPayload.password) {
      const salt = await bcrypt.genSalt();
      clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);
    }

    if (clonedPayload.email) {
      const userObject = await this.usersRepository.findOneBy({
        email: clonedPayload.email,
      });
      if (userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailAlreadyExists',
          },
        });
      }
    }

    return this.usersRepository.create(clonedPayload);
  }

  findById(id: User['id']) {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: User['email']) {
    return this.usersRepository.findOneBy({ email });
  }
}
