import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async run() {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('123Fred', salt);
    await this.repository.save(
      this.repository.create({
        name: 'Fred',
        email: 'fredx@sisloc.com.br',
        password,
      }),
    );
  }
}
