import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

export const generateQR = async (data: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(data);
  } catch (error) {
    throw new Error('Ошибка при генерации QR-кода');
  }
};

export const generateOrderHash = (): string => {
  return uuidv4();
}; 