import { Router } from "./shared/Router/Router"
import { Page404 } from "./pages/404/404"
import { Page500 } from "./pages/500/500"

export const router = new Router("root")

router.use("/404", Page404)
  .use("/500", Page500)
  .use("/chats", ChatPage)
  .fallback("/404", Page404)
  .start()
