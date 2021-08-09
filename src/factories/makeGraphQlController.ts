import { GatinhoSenderController } from "../presentation/controllers/GatinhoSenderController";
import { GraphqlProvider } from "../providers";
import { ValidateImageFile, ValidateUrlString } from "../validators";

const urlValidator = new ValidateUrlString();
const fileValidator = new ValidateImageFile();
const provider = new GraphqlProvider();

export const makeGraphQlController = () =>
  new GatinhoSenderController(provider, fileValidator, urlValidator);
