import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  const startTime = Date.now();
  
  // 500 iteraciones de criptografía pesada síncrona para bloquear un hilo de CPU
  for (let i = 0; i < 500; i++) {
    crypto.pbkdf2Sync('password_secreto_de_estres', 'salt_aleatorio_del_sistema', 10000, 64, 'sha512');
  }

  const duration = Date.now() - startTime;
  return NextResponse.json({ 
    status: 'success', 
    message: 'CPU estresada exitosamente', 
    duration_ms: duration 
  });
}
