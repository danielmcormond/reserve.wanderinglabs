export const FLASH_MESSAGE = 'FLASH_MESSAGE';

export function setFlashMessage(message, style) {
  return {
    type: FLASH_MESSAGE,
    payload: {
      message,
      style
    }
  }
};
