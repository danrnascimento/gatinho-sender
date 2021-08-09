import { GatinhoSenderController } from "../presentation/controllers/GatinhoSenderController";
import { LocalStorageProvider } from "../providers";
import { ValidateImageFile, ValidateUrlString } from "../validators";

const urlValidator = new ValidateUrlString();
const fileValidator = new ValidateImageFile();
const provider = new LocalStorageProvider();

export const makeLocalStorageController = () =>
  new GatinhoSenderController(provider, fileValidator, urlValidator);
