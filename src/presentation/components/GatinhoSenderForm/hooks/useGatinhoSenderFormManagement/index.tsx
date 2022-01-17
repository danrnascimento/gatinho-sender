import { useEffect, useState } from "react";
import { GatinhoSenderFormState } from "../../types";

export const useGatinhoSenderFormManagement = () => {
  const [values, setValues] = useState<GatinhoSenderFormState>({
    file: undefined,
    url: undefined,
    nsfw: false,
  });

  const [hasValue, setHasValue] = useState(false);

  const validate = (values: Pick<GatinhoSenderFormState, "file" | "url">) => {
    return !!values.file || !!values.url;
  };

  const updateImageUrl = (newUrl: string) => {
    setValues((currentState) => ({
      ...currentState,
      file: undefined,
      url: newUrl,
    }));
  };

  const updateImageFile = (newFile: File) => {
    setValues((currentState) => ({
      ...currentState,
      url: undefined,
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
    setHasValue(validate(values));
  }, [values]);

  return { updateImageUrl, updateImageFile, updateNsfw, values, hasValue };
};
