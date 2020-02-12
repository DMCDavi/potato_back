"use strict";

const User = use("App/Models/User");
const PushToken = use("App/Models/PushToken");

class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.all();

    try {
    const token = await auth.attempt(email, password)

    return token
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Não foi possível efetuar o login, trouxa demais" });
    }
  }

  async decreaseScore({ request, params, response }) {
    const { new_score } = request.only(["new_score"]);

    const user = await User.findOrFail(params.id);

    user.score = new_score;

    await user.save();
    return response.status(202).json({ message: "Atualizou, Davi é gado" });
  }

  async pushtoken({ request, auth }) {
    const { token, username } = request.only(["token", "username"]);
    const token_f = await PushToken.create([token, username]);
    return token_f;
  }

  async index({ response }) {
    const users = await User.all();
    return users;
  }
}

module.exports = SessionController;
