import { GatinhoSenderController } from "../presentation/controllers";
import { RestProvider } from "../providers";
import { ValidateImageFile, ValidateUrlString } from "../validators";

const urlValidator = new ValidateUrlString();
const fileValidator = new ValidateImageFile();
const provider = new RestProvider();

export const makeRestController = () =>
  new GatinhoSenderController(provider, fileValidator, urlValidator);
