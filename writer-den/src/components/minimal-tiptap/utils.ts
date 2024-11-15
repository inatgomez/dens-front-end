import type { Editor } from "@tiptap/react";
import type { MinimalTiptapProps } from "./minimal-tiptap";

export type FileError = {
  url: string;
  reason: "invalidUrl";
};

export const isClient = (): boolean => typeof window !== "undefined";
export const isMacOS = (): boolean =>
  isClient() && window.navigator.platform === "MacIntel";

const shortcutKeyMap: Record<string, { symbol: string; readable: string }> = {
  mod: isMacOS()
    ? { symbol: "⌘", readable: "Command" }
    : { symbol: "Ctrl", readable: "Control" },
  alt: isMacOS()
    ? { symbol: "⌥", readable: "Option" }
    : { symbol: "Alt", readable: "Alt" },
  shift: { symbol: "⇧", readable: "Shift" },
};

export const getShortcutKey = (key: string) =>
  shortcutKeyMap[key.toLowerCase()] || { symbol: key, readable: key };

export const getShortcutKeys = (keys: string[]) => keys.map(getShortcutKey);

export const getOutput = (
  editor: Editor,
  format: MinimalTiptapProps["output"]
): object | string => {
  switch (format) {
    case "json":
      return editor.getJSON();
    case "html":
      return editor.getText() ? editor.getHTML() : "";
    default:
      return editor.getText();
  }
};

/**
 * @param url The URL to sanitize.
 */
export const sanitizeUrl = (
  url: string | null | undefined
): string | undefined => {
  if (!url) return undefined;

  try {
    const parsedUrl = new URL(url);
    const blockedProtocols = ["javascript:", "vbscript:", "file:"];

    if (blockedProtocols.includes(parsedUrl.protocol)) return undefined;
    return url;
  } catch {
    if (/^(\/|#|mailto:|tel:)/.test(url)) return url;
    return undefined;
  }
};

/**
 * @param urls The list of strings to check.
 * @returns A tuple with valid URLs and errors.
 */
export const filterUrls = (urls: string[]): [string[], FileError[]] => {
  const validUrls: string[] = [];
  const errors: FileError[] = [];

  urls.forEach((url) => {
    const sanitizedUrl = sanitizeUrl(url);
    if (sanitizedUrl) {
      validUrls.push(sanitizedUrl);
    } else {
      errors.push({ url, reason: "invalidUrl" });
    }
  });

  return [validUrls, errors];
};
