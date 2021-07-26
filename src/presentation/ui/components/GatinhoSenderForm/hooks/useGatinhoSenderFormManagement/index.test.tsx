import { renderHook, act } from "@testing-library/react-hooks";
import { useGatinhoSenderFormManagement } from ".";

const TEST_FILE = new File(["(⌐□_□)"], "file.png", {
  type: "image/png",
});

describe("Hooks: useGatinhoSenderFormManagement", () => {
  describe("values", () => {
    it("should start with file and url as null and nsfw as false", () => {
      const { result } = renderHook(useGatinhoSenderFormManagement);

      expect(result.current.values).toEqual({
        file: null,
        url: null,
        nsfw: false,
      });
    });

    it("should update the file value if call updateImageFile", () => {
      const { result } = renderHook(useGatinhoSenderFormManagement);

      expect(result.current.values.file).toBeNull();

      act(() => result.current.updateImageFile(TEST_FILE));

      expect(result.current.values.file).toEqual(TEST_FILE);
    });

    it("should update the url value if call updateImageUrl", () => {
      const { result } = renderHook(useGatinhoSenderFormManagement);

      expect(result.current.values.url).toBeNull();

      act(() => result.current.updateImageUrl("http://testing.com"));

      expect(result.current.values.url).toEqual("http://testing.com");
    });

    it("should update the nsfw value if call updateNsfw", () => {
      const { result } = renderHook(useGatinhoSenderFormManagement);

      expect(result.current.values.nsfw).toBe(false);

      act(() => result.current.updateNsfw(true));

      expect(result.current.values.nsfw).toEqual(true);
    });
  });

  describe("hasValue", () => {
    it("should start hasValue with false", async () => {
      const { result } = renderHook(useGatinhoSenderFormManagement);
      expect(result.current.hasValue).toBe(false);
    });

    it("should change hasValue to true if image exists", async () => {
      const { result } = renderHook(useGatinhoSenderFormManagement);

      act(() => result.current.updateImageFile(TEST_FILE));
      expect(result.current.hasValue).toBe(true);
    });

    it("should change hasValue to true if url exists", async () => {
      const { result } = renderHook(useGatinhoSenderFormManagement);

      act(() => result.current.updateImageUrl("http://testing.com"));
      expect(result.current.hasValue).toBe(true);
    });

    it("should not change hasValue to true if change just nsfw", async () => {
      const { result } = renderHook(useGatinhoSenderFormManagement);

      act(() => result.current.updateNsfw(true));
      expect(result.current.hasValue).toBe(false);
    });
  });
});
