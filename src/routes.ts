import { UserController } from "./controller/UserController";
import { AccountController } from "./controller/AccountController";
import { PhoneNumberController } from "./controller/PhoneNumberController";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
  {
    method: "get",
    route: "/accounts",
    controller: AccountController,
    action: "all",
  },
  {
    method: "get",
    route: "/phoneNumbers",
    controller: PhoneNumberController,
    action: "all",
  },
  {
    method: "post",
    route: "/accounts/login",
    controller: AccountController,
    action: "login",
  },
];
