const User = require("../repository/user");
const UnauthorizedError  =  require("../errors/UnauthorizedError");
const constants = require("../constants");

class AuthService {

    async signUp(userData) {

        const user = await User.create(userData);

        if(user) {

            UserRole.create(user.id, constants.userRoleNum);

        }
    }

    async login(email, password, next) {

        const user = await User.findUserByEmail(email);

        if (!user || !user.validatePassword(password)) {

            return next(new UnauthorizedError("Wrong email or password"), false);

        }

        user.role = await UserRole.getRoleId(user.dataValues.id);

        if (!user.role) {

            return next(new Error(), false);

        }

        return next(null, user);

    }
}

module.exports = new AuthService();
