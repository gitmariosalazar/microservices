import { UserRequest } from '../../domain/schema/dto/request/user.request';

export class UserMapper {
  static userRequestToUserModel(userRequest: UserRequest) {
    return {
      first_name: userRequest.first_name,
      last_name: userRequest.last_name,
      email: userRequest.email,
      address: userRequest.address,
      phone: userRequest.phone,
      identification: userRequest.identification,
      password: userRequest.password,
    };
  }
}
