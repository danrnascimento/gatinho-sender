import { SendImageUsingFile, SendImageUsingUrl } from "../useCases";

export interface Controller extends SendImageUsingFile, SendImageUsingUrl {}
