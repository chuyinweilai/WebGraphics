// 解析本地文件路径
export const getAssetUrl = (localUrl: string, metaUrl: string): string => {
  console.log('url', metaUrl);
  
  const urlObj: URL = new URL(localUrl, metaUrl);
  return urlObj.href;
}