import { GatinhoSenderController } from "../controllers";
import {
  GraphqlProvider,
  LocalStorageProvider,
  RestProvider,
} from "../providers";
import { ValidateImageFile, ValidateUrlString } from "../validators";

const urlValidator = new ValidateUrlString();
const fileValidator = new ValidateImageFile();

export enum ControllerType {
  REST = "rest",
  GRAPHQL = "gql",
  LOCAL_STORAGE = "ls",
}

export const makeController = (controllerType: ControllerType) => {
  const provider = {
    [ControllerType.GRAPHQL]: new GraphqlProvider(),
    [ControllerType.REST]: new RestProvider(),
    [ControllerType.LOCAL_STORAGE]: new LocalStorageProvider(),
  }[controllerType];

  return new GatinhoSenderController(provider, fileValidator, urlValidator);
};
