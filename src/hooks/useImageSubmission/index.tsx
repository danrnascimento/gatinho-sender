import { Controller } from "../../controllers";
import { SendImageUsingFile, SendImageUsingUrl } from "../../useCases";

export type SubmissionParams = SendImageUsingFile.Params &
  SendImageUsingUrl.Params;

export type UseImageSubmission = (controller: Controller) => {
  handleSubmit: (params: SubmissionParams) => Promise<void>;
};

const useImageSubmission: UseImageSubmission = (controller) => {
  const handleSubmit = async ({ file, nsfw, url }: SubmissionParams) => {
    if (!file && !url) {
      return alert("é necessário adicionar um arquivo ou uma url");
    }

    if (url) {
      const saved = await controller.sendImageUsingUrl({ url, nsfw });
      return alert(saved ? "sucesso ao salvar url" : "erro ao salvar url");
    }

    if (file) {
      const saved = await controller.sendImageUsingFile({ file, nsfw });
      return alert(
        saved ? "sucesso ao salvar imagem" : "erro ao salvar imagem"
      );
    }
  };

  return { handleSubmit };
};

export default useImageSubmission;
