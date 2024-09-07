import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async signup(signupData: SignUpDto) {
    const { email, name, passkey } = signupData;

    //check if email in use
    const emailInUse = await this.UserModel.findOne({
      email,
    });

    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    //hash the password
    const hashedPasskey = await bcrypt.hash(passkey, 10);

    //create user docs and save in mongodb
    await this.UserModel.create({
      name,
      email,
      passkey: hashedPasskey,
    });
  }
}
