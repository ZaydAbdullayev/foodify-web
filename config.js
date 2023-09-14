import { BrowserMultiFormatReader } from "@zxing/library";

const codeReader = new BrowserMultiFormatReader();

codeReader
  .decodeFromInputVideoDevice(undefined, "video")
  .then((result) => {
    // Tarandığında bu işlev çağrılır ve result değişkeni taranan verileri içerir.
    console.log("Taranan QR Kod Verileri:", result.text);
    alert(result.text);

    // İşlenen QR kod verilerini kullanarak istediğiniz işlemleri yapabilirsiniz.
  })
  .catch((err) => {
    console.error("QR Kod Tarayıcı Hatası:", err);
  });
