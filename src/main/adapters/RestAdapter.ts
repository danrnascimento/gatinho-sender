import { ApiCommunication } from "../../infra";
import { GatinhoSenderFormState } from "../../presentation/ui/components/GatinhoSenderForm/hooks";

const UPLOAD_ENDPOINT = "http://localhost:3333/upload";
const SAVE_URL_ENDPOINT = "http://localhost:3333/url";

export class RestAdapter implements ApiCommunication<GatinhoSenderFormState> {
  async save({ nsfw, file, url }: GatinhoSenderFormState) {
    try {
      const formData = new FormData();
      formData.append("nsfw", nsfw.toString());
      let endpoint = "";

      if (file) {
        formData.append("image", file);
        endpoint = UPLOAD_ENDPOINT;
      } else if (url) {
        formData.append("url", url);
        endpoint = SAVE_URL_ENDPOINT;
      }

      console.log({ file, url, endpoint });

      const result = await fetch(endpoint, {
        method: "POST",
        body: formData,
      }).then((response) => response.json());

      if (result.error) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }
}
