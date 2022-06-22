import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class JwtService {
  private readonly jwt: Jwt;

  constructor(jwt: Jwt, @InjectModel(User.name) private authModel: Model<User>) {
    this.jwt = jwt;
  }

  /**
   * Decodes a JWT token
   * @param token The token to be decoded
   * @returns a decoded token
   */
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  /**
   * Get an User from its _id and validate it
   * @param decoded A decoded JWT token
   * @returns A valid User
   */
  public async validateUser(decoded: User): Promise<User> {
    return this.authModel.findById(decoded.id);
  }

  /**
   * Generates a JWT token from an User
   * @param auth The User to be encoded
   * @returns An encoded JWT representing the User
   */
  public generateToken(auth: User): string {
    return this.jwt.sign({ id: auth._id, email: auth.email });
  }

  /**
   * Validates a password against an User's password
   * @param password The password to be validated
   * @param userPassword The User's password
   * @returns The password validity state
   */
  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  /**
   * Encodes an User's password
   * @param password The password to be encrypted
   * @returns The encrypted password
   */
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  /**
   * Validates an JWT Token
   * @param token The token to be validated
   * @returns The token decoded User
   */
  public async verify(token: string): Promise<User> {
    try {
      return this.jwt.verify(token);
    } catch (err) {
      throw new ForbiddenException('AUTHENTICATION_ERROR_MESSAGES_KEYS.INVALID_TOKEN');
    }
  }
}
