import { ApiCommunication } from "../../infra/protocols";

export class LocalStorageCommunicationAdapter implements ApiCommunication {
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
