declare module "pdf-parse/lib/pdf-parse.js" {
  interface PDFData {
    text: string;
    numpages: number;
  }

  export default function (buffer: Buffer): Promise<PDFData>;
}
