import { NextResponse } from 'next/server';
import pool from '../../../lib/db';


export async function GET() {
  const startTime = Date.now();

  try {
    // Consulta ineficiente con producto cartesiano y ordenamiento costoso
    const query = `
      SELECT t1.id, t1.componente, t2.id 
      FROM logs_estres t1
      CROSS JOIN (SELECT id FROM logs_estres LIMIT 200) t2
      WHERE t1.data_pesada LIKE '%abc%'
      ORDER BY md5(t1.data_pesada) DESC
      LIMIT 50;
    `;
    
    const result = await pool.query(query);
    const duration = Date.now() - startTime;

    return NextResponse.json({ 
      status: 'success', 
      rows_evaluated: result.rowCount,
      duration_ms: duration 
    });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
  }
}
