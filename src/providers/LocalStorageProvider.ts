import { Provider } from "../protocols";

export class LocalStorageProvider implements Provider {
  async save({ url, file, nsfw }: Provider.Params) {
    try {
      let dataAsString = "";

      if (file) {
        const fileAs64 = await this.fileToBase64(file);
        dataAsString = JSON.stringify({ nsfw, file: fileAs64 });
      } else {
        dataAsString = JSON.stringify({ nsfw, url });
      }

      window.localStorage.setItem("__image", dataAsString);
      return { data: dataAsString };
    } catch (e) {
      let error: Error = new Error("Erro ao salvar imagem");
      if (e instanceof Error) error = e;

      return { data: undefined, error };
    }
  }

  private fileToBase64 = (file: File) =>
    new Promise<string | undefined>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString());
      reader.onerror = (error) => reject(error);
    });
}
