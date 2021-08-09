import { GatinhoSenderProvider } from "../protocols";

const UPLOAD_ENDPOINT = "http://localhost:3333/upload";
const SAVE_URL_ENDPOINT = "http://localhost:3333/url";

export class RestProvider implements GatinhoSenderProvider {
  async save({ nsfw, file, url }: GatinhoSenderProvider.Params) {
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
