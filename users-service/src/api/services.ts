
export default class UserService {
  constructor() { }

  async registerUser({ email, password, role }: { email: string, password: string, role: string }) {
    if (!email) {
      throw "invalid user details"
    }
  }

  async findUserByUniqueEmail(email: string) {

  }

  async findUserByUniqueId(id: number) {

  }
}





