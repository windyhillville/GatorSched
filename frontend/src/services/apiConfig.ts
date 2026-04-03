import { Platform } from 'react-native';

const HOST = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
export const API_BASE = `http://${HOST}:8000/api/v1`;
