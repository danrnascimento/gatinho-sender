import { ApolloClient, InMemoryCache, gql, from } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { GatinhoSenderProvider } from "../protocols";

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

export class GraphqlProvider implements GatinhoSenderProvider {
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

  async save({ file, url, nsfw }: GatinhoSenderProvider.Params) {
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
        await saveFile();
      } else {
        await saveUrl();
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
