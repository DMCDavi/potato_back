"use strict";

const User = use("App/Models/User");
const Database = use("Database");

class RegisterController {
  async store({ request, response }) {
    const data = request.all();

    const same_email = await Database.table("users")
      .where("email", data.email)
      .first();
    if (same_email != undefined) {
      return response
        .status(400)
        .json({ error: "Email sendo usado, seu macacx" });
    }

    const user = await User.create({
      ...data,
      score: 33
    });

    response.status(201);
    return user;
  }
}

module.exports = RegisterController;
