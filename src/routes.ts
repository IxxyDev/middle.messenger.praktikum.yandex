import { Router } from "./shared/Router/Router";
import { Page404 } from "./pages/404/404";
import { Page500 } from "./pages/500/500";
import { ChatPage } from "./pages/chat/chatPage";
import { SettingsPage } from "./pages/settings/settings";
import { SignIn } from "./pages/signin/signin";
import { SignUp } from "./pages/signup/signup";

export const router = new Router("root");

router
  .use("/", SignIn)
  .use("/sign-up", SignUp)
  .use("/settings", SettingsPage)
  .use("/chats", ChatPage)
  .use("/500", Page500)
  .fallback("/404", Page404)
  .start();
