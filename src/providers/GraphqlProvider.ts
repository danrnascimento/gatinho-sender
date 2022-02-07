import { ApolloClient, InMemoryCache, gql, from } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { Provider } from "../protocols";

const UPLOAD_MUTATION = gql`
  mutation ($singleUploadFile: Upload!, $nsfw: Boolean!) {
    singleUpload(file: $singleUploadFile, nsfw: $nsfw)
  }
`;

const SAVE_URL_MUTATION = gql`
  mutation ($urlFile: String!, $nsfw: Boolean!) {
    saveUrl(url: $urlFile, nsfw: $nsfw)
  }
`;

export class GraphqlProvider implements Provider {
  private client: ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: from([
        createUploadLink({
          uri: "http://localhost:4444/graphql",
        }),
      ]),
    });
  }

  async save({ file, url, nsfw }: Provider.Params) {
    const saveFile = async () =>
      await this.client.mutate({
        mutation: UPLOAD_MUTATION,
        variables: {
          singleUploadFile: file,
          nsfw,
        },
      });

    const saveUrl = async () =>
      await this.client.mutate({
        mutation: SAVE_URL_MUTATION,
        variables: {
          urlFile: url,
          nsfw,
        },
      });

    try {
      if (file) {
        const { data, errors } = await saveFile();
        return { data, error: new Error(errors?.[0].message) };
      }

      const { data, errors } = await saveUrl();
      return { data, error: new Error(errors?.[0].message) };
    } catch (e) {
      let error: Error = new Error("Erro ao salvar imagem");
      if (e instanceof Error) error = e;

      return { data: undefined, error };
    }
  }
}
