import { useEffect, useState } from "react";

export type GatinhoSenderFormState = {
  url: string | null;
  file: File | null;
  nsfw: boolean;
};

export const useGatinhoSenderFormManagement = () => {
  const [values, setValues] = useState<GatinhoSenderFormState>({
    file: null,
    url: null,
    nsfw: false,
  });

  const [valid, setValid] = useState(false);

  const validate = (values: Pick<GatinhoSenderFormState, "file" | "url">) => {
    return !values.file && !values.url;
  };

  const updateImageUrl = (newUrl: string) => {
    setValues((currentState) => ({
      ...currentState,
      file: null,
      url: newUrl,
    }));
  };

  const updateImageFile = (newFile: File) => {
    setValues((currentState) => ({
      ...currentState,
      url: null,
      file: newFile,
    }));
  };

  const updateNsfw = (newNsfw: boolean) => {
    setValues((currentState) => ({
      ...currentState,
      nsfw: newNsfw,
    }));
  };

  useEffect(() => {
    setValid(validate(values));
  }, [values]);

  return { updateImageUrl, updateImageFile, updateNsfw, values, valid };
};
