import { ChatPageProps } from "./interfaces";

export const chatState: ChatPageProps = {
  currentChat: null,
  time: null,
  chatsList: {
    chats: []
  },
  avatar: {
    imgSrc: null,
    size: '36px',
  },
  searchPanel: {
    id: 'searchPanel',
    name: 'searchPanel',
    placeholder: 'Search for contacts',
    label: 'Search',
    value: ''
  },
  topPanel: {
    chatName: '',
    currentChat: null,
  },
  error: {
    additionalClass: '',
    errorText: ''
  },
  sendMessage: {
    id: 'sendMessage',
    name: 'sendMessage',
    placeholder: 'Write a message...'
  },
  addUserPopup: {
    inputs: [{
      id: 'login',
      label: 'Login',
      placeholder: 'Type user\'s login',
      required: true,
      name: 'login',
      type: 'text',
    }],
    title: 'Add user',
    method: 'POST',
    submitButtonLabel: 'Add user',
    isOpened: false,
    foundChats: {
      users: []
    }
  },
  usersMenu: {
    isOpened: false
  },
  createChatPopup: {
    inputs: [{
      id: 'chat',
      label: 'Chat name',
      placeholder: 'Create new chat',
      required: true,
      name: 'chat',
      type: 'text',
    }],
    title: 'Add user',
    method: 'POST',
    submitButtonLabel: 'Create new chat',
    isOpened: false,
  },
  deleteUserPopup: {
    inputs: [{
      id: 'delete',
      label: 'Login',
      placeholder: 'Type user\'s login',
      required: true,
      name: 'delete',
      type: 'text',
    }],
    title: 'Delete user',
    method: 'DELETE',
    submitButtonLabel: 'Delete user',
    isOpened: false,
    foundChats: {
      users: []
    }
  },
};
