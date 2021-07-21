import { ApiHandler } from "../protocols";

export class LocalStorageAdapter implements ApiHandler {
  save = async (data: object) => {
    try {
      const dataAsString = JSON.stringify({ data });
      window.localStorage.setItem("__image", dataAsString);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}
