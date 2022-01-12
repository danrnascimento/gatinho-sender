import { GatinhoSenderController } from "../presentation/controllers";
import {
  GraphqlProvider,
  LocalStorageProvider,
  RestProvider,
} from "../providers";
import { ValidateImageFile, ValidateUrlString } from "../validators";

const urlValidator = new ValidateUrlString();
const fileValidator = new ValidateImageFile();
const localStorageProvider = new LocalStorageProvider();
const graphQlProvider = new GraphqlProvider();
const restProvider = new RestProvider();

export enum ControllerType {
  REST = "rest",
  GRAPHQL = "gql",
  LOCAL_STORAGE = "ls",
}

export const makeController = (controllerType: ControllerType) => {
  const provider = {
    [ControllerType.GRAPHQL]: graphQlProvider,
    [ControllerType.REST]: restProvider,
    [ControllerType.LOCAL_STORAGE]: localStorageProvider,
  }[controllerType];

  return new GatinhoSenderController(provider, fileValidator, urlValidator);
};
