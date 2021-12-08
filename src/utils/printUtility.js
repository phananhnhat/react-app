const isIPad = () => false;

const printBlob = (blob, fileName, fileCode = 1) => {
  if (isIPad() && fileCode === 2) {
    return;
  }
  if (window.navigator.msSaveBlob) {
    return window.navigator.msSaveOrOpenBlob(blob, fileName);
  }

  const reader = new FileReader();
  reader.onload = () => {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = reader.result;
    link.click();
    return;
  };
  reader.readAsDataURL(blob);
};

// const printOrOpenBlob = async (
//   getBlob,
//   fileName,
//   fileCode = FILE_CODE.EXCEL,
//   isReportMessage = true
// ) => {
//   // iPadの場合は直接ダウンロードして表示できないので別タブで表示する
//   if (isIPad()) {
//     // 非同期メソッド完了後にwindow.openするとポップアップブロックの対象になるため先にopenしておく
//     let newTab = isReportMessage
//       ? window.open('/LayoutPrint', '_blank')
//       : window.open('/FileOutput', '_blank');
//     const blob = await getBlob();
//     if (!blob) {
//       newTab.close();
//       newTab = null;
//       return;
//     }
//     const url = URL.createObjectURL(blob);
//     newTab.location = url;
//     newTab = null;
//     setTimeout(function() {
//       URL.revokeObjectURL(url);
//     }, 10000);
//   } else {
//     const blob = await getBlob();
//     if (!blob) {
//       return;
//     }
//     printBlob(blob, fileName, fileCode);
//   }
// };

// const convertBase64ToBlob = (base64Data, contentType) => {
//   const bin = atob(base64Data.replace(/\s/g, ''));
//   const arrBuffer = new Uint8Array(bin.length);
//   for (let i = 0; i < bin.length; i++) {
//     arrBuffer[i] = bin.charCodeAt(i);
//   }
//   return new Blob([arrBuffer.buffer], { type: contentType });
// };

const PrintUtility = {
  printBlob,
  // convertBase64ToBlob,
  // printOrOpenBlob,
};

export default PrintUtility;
