import loginTemplate from './pages/sign-in.pug';
import signinTemplate from './pages/sign-in.pug';
import chatsTemplate from './pages/chat/chat.pug';
import profileTemplate from './pages/profile.pug';
import profileEditTemplate from './pages/edit-password.pug';
import passwordEditTemplate from './pages/edit-profile.pug.pug';
import error404Template from './pages/404.pug';
import error500Template from './pages/500.pug';

const TEMPLATES = {
  login: loginTemplate,
  signin: signinTemplate,
  chats: chatsTemplate,
  profile: profileTemplate,
  profileEdit: profileEditTemplate,
  passwordEdit: passwordEditTemplate,
  error404: error404Template,
  error500: error500Template
};

export function renderTemplate(name: any, locals: object = {}, parent: HTMLElement = document.body) {
  // @ts-ignore
  const template = TEMPLATES[name];
  parent.innerHTML = template(locals);
}

window.renderTemplate = renderTemplate