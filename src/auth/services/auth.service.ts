import { Inject, Injectable } from '@nestjs/common';

import * as EXCEPTIONS from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';

import { Model, FilterQuery } from 'mongoose';

import { Status } from 'src/common/enums/status.enum';
import { JwtService } from 'src/auth/services/jwt.service';
import * as DTO from 'src/auth/dto/auth.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private authModel: Model<User>,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  // Private Methods

  /**
   * Get an user by id
   * @param id The User's id
   * @returns The response User object
   */
  private async _getUserById(id: string): Promise<User> {
    return this.authModel.findOne({ _id: id, status: { $ne: Status.DELETED } });
  }

  /**
   * Get an user by email
   * @param email The User's email
   * @returns The response User object
   */
  private async _getUserByEmail(email: string): Promise<User> {
    return this.authModel.findOne({ email, status: { $ne: Status.DELETED } });
  }

  /**
   * Get an active user by id
   * @param id The User's id
   * @returns The response User object
   */
  private async _getActiveUserById(id: string): Promise<User> {
    return this.authModel.findOne({ _id: id, status: Status.ACTIVE });
  }

  /**
   * Get an active user by email
   * @param email The User's email
   * @returns The response User object
   */
  private async _getActiveUserByEmail(email: string): Promise<User> {
    return this.authModel.findOne({ email, status: Status.ACTIVE });
  }

  /**
   * Get all users
   * @returns An array of Skill objects
   */
  private async _getAllUsers(filter: FilterQuery<User> = {}): Promise<User[]> {
    return this.authModel.find({ status: { $ne: Status.DELETED }, ...filter });
  }

  // Public Methods

  /**
   * Registers a new User
   * @param param.email The User's email
   * @param param.password The User's passsword
   * @returns The response status and possible errors
   */
  public async register({ email, password }: DTO.RegisterRequestDto): Promise<User> {
    const user = await this._getUserByEmail(email);

    if (user) throw new EXCEPTIONS.ConflictException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_ALREADY_EXISTS');

    const newUser = await this.authModel.create({
      email,
      password: this.jwtService.encodePassword(password),
    });

    await newUser.save();

    return newUser;
  }

  /**
   * Logs in an User
   * @param param.email The User's email
   * @param param.password The User's passsword
   * @returns The response status, possible errors and the authetication token
   */
  public async login({ email, password }: DTO.LoginRequestDto): Promise<string> {
    const user = await this._getUserByEmail(email);

    if (!user) throw new EXCEPTIONS.NotFoundException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_NOT_FOUND');

    if (user.status !== Status.ACTIVE)
      throw new EXCEPTIONS.NotFoundException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_NOT_ACTIVE');

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new EXCEPTIONS.ForbiddenException('AUTHENTICATION_ERROR_MESSAGES_KEYS.INVALID_PASSWORD');
    }

    const token: string = this.jwtService.generateToken(user);

    await user.updateLastLogin();

    return token;
  }

  /**
   * Validates a logged in User
   * @param param.token The authorization token
   * @returns The response status, possible errors and the user id
   */
  public async validate({ token }: DTO.ValidateRequestDto): Promise<User> {
    const decoded = await this.jwtService.verify(token);

    if (!decoded) throw new EXCEPTIONS.ForbiddenException('AUTHENTICATION_ERROR_MESSAGES_KEYS.INVALID_TOKEN');

    const user = await this.jwtService.validateUser(decoded);

    // Since we're using jwtService's validateUser method here, we're not validating user status, hence the validations below.
    if (!user || user.status === Status.DELETED)
      throw new EXCEPTIONS.NotFoundException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_NOT_FOUND');

    if (user.status !== Status.ACTIVE)
      throw new EXCEPTIONS.ForbiddenException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_NOT_ACTIVE');

    return user;
  }

  /**
   * Finds a user by its id
   * @param param.id The user id
   * @returns The user document object
   */
  public async findUserById({ id }: DTO.FindUserByIdRequestDto): Promise<User> {
    const user = await this._getUserById(id);

    if (!user) throw new EXCEPTIONS.NotFoundException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_NOT_FOUND');

    return user;
  }

  /**
   * Finds a user by its email
   * @param param.email The user's email
   * @returns The user document object
   */
  public async findUserByEmail({ email }: DTO.FindUserByEmailRequestDto): Promise<User> {
    const user = await this._getUserByEmail(email);

    if (!user) throw new EXCEPTIONS.NotFoundException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_NOT_FOUND');

    return user;
  }

  /**
   * Finds all users
   * @returns An array of user document objects
   */
  public async findAllUsers(_: DTO.FindAllUsersRequestDto): Promise<User[]> {
    return await this._getAllUsers();
  }

  /**
   * Finds all users for given roles
   * @param param.roles The roles to search for
   * @returns An array of user document objects
   */
  public async findAllUsersForRoles({ roles }: DTO.FindAllUsersForRolesRequestDto): Promise<User[]> {
    return await this._getAllUsers({ roles: { $in: roles } });
  }

  /**
   * Activates a user by its id
   * @param param.id The user id
   */
  public async activateUserById({ id }: DTO.ActivateUserByIdRequestDto): Promise<void> {
    const user = await this._getUserById(id);

    if (!user) throw new EXCEPTIONS.NotFoundException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_NOT_FOUND');

    user.status = Status.ACTIVE;

    await user.save();
  }

  /**
   * Deactivates a user by its id
   * @param param.id The user id
   */
  public async deactivateUserById({ id }: DTO.DeactivateUserByIdRequestDto): Promise<void> {
    const user = await this._getUserById(id);

    if (!user) throw new EXCEPTIONS.NotFoundException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_NOT_FOUND');

    user.status = Status.INACTIVE;

    await user.save();
  }

  /**
   * Removes a user by its id
   * @param param.id The user id
   */
  public async removeUserById({ id }: DTO.RemoveUserByIdRequestDto): Promise<void> {
    const user = await this._getUserById(id);

    if (!user) throw new EXCEPTIONS.NotFoundException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_NOT_FOUND');

    user.status = Status.DELETED;

    await user.save();
  }

  /**
   * Adds a given role to the user
   * @param param.id The user id
   * @param param.role The role to be added
   */
  public async addRoleToUser({ id, role }: DTO.AddRoleToUserRequestDto): Promise<void> {
    const user = await this._getUserById(id);

    if (!user) throw new EXCEPTIONS.NotFoundException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_NOT_FOUND');

    if (!user.roles.includes(role)) {
      user.roles.push(role);
      await user.save();
    }
  }

  /**
   * Removes a given role from the user
   * @param param.id The user id
   * @param param.role The role to be removed
   */
  public async removeRoleFromUser({ id, role }: DTO.RemoveRoleFromUserRequestDto): Promise<void> {
    const user = await this._getUserById(id);

    if (!user) throw new EXCEPTIONS.NotFoundException('AUTHENTICATION_ERROR_MESSAGES_KEYS.USER_NOT_FOUND');

    if (user.roles.length == 1)
      throw new EXCEPTIONS.UnprocessableEntityException('AUTHENTICATION_ERROR_MESSAGES_KEYS.AT_LEAST_ONE_ROLE');

    if (user.roles.includes(role)) {
      user.roles.splice(user.roles.indexOf(role), 1);
      await user.save();
    }
  }
}
