import { UserResponse } from '../../domain/schema/dto/response/user.response';
import { UserModel } from '../../domain/schema/model/user.model';

export class UserAdapter {
  static userModelToUserResponse(userModel: UserModel): UserResponse {
    return {
      id_user: userModel.id_user,
      first_name: userModel.first_name,
      last_name: userModel.last_name,
      email: userModel.email,
      address: userModel.address,
      phone: userModel.phone,
      identification: userModel.identification,
      password: userModel.password,
    };
  }
}
