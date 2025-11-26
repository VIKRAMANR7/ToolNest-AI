declare module "pdf-parse/lib/pdf-parse.js" {
  interface PDFData {
    text: string;
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    version: string;
  }

  function pdf(buffer: Buffer): Promise<PDFData>;

  export = pdf;
}
